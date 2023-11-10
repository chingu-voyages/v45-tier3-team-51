"use client";

import { HeaderAction } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Buttons } from "@/components/Buttons";
import { CopyLink } from "@/components/CopyLink";
import { Display } from "@/components/Display";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { getBaseUrl } from "@/lib/server/getBaseUrl";

export default function Home() {
  const router = useRouter();
  const path = usePathname();
  const roomId = path.split("/")[2];
  const [questionText, setQuestionText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    fetch(`/api/room/${roomId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionText(data.current_question_text);
        setCurrentQuestion(data.current_question);
        setIsLoading(false); // Set isLoading to false when the question is fetched
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // subcribe to the proper channel
    pusherClient.subscribe(`${roomId}`);

    type returns = {
      question_text: string;
      question_num: string;
    };

    // question text coming from the server
    const questionTextHandler = (returns: returns) => {
      setQuestionText(() => returns.question_text);
      const qn = parseInt(returns.question_num);
      setCurrentQuestion(qn);
      setIsLoading(false);
    };

    const loadThis = () => {
      setIsLoading(true);
    };

    const finishThis = () => {
      setComplete(true);
      setIsLoading(false);
    };

    pusherClient.bind("finish", finishThis);
    pusherClient.bind("setupLoading", loadThis);
    pusherClient.bind("next-question", questionTextHandler);

    if (currentQuestion > 5) {
      setComplete(true);
    }
    return () => {
      pusherClient.unsubscribe(`${roomId}`);
      pusherClient.unbind("next-question", questionTextHandler);
    };
  }, [roomId, questionText]);

  const nextQuestionText = async () => {
    await fetch(`/api/room/${roomId}`, {
      method: "PATCH",
      body: JSON.stringify({ current_question: currentQuestion }),
    });
  };
  console.log("current question: ", currentQuestion, "is loading: ", isLoading);

  return (
    <main className="flex flex-col min-h-screen p-4">
      <HeaderAction />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="mb-6 text-center">
          {complete ? (
            <Display text={"Thanks for playing!"} />
          ) : isLoading && currentQuestion > 0 ? (
            <div>Loading...</div>
          ) : !isLoading && currentQuestion == 0 ? (
            <div className="flex flex-col gap-3">
              <Display text={"Share the link below with other participants"} />
              <div className="mb-6 text-center">
                <CopyLink hostName={getBaseUrl()} />
              </div>
              <Buttons text="Start Game" size="lg" onClick={nextQuestionText} />
            </div>
          ) : !isLoading && currentQuestion < 5 ? (
            <>
              <Display text={questionText} />
              <Buttons
                text="Next question"
                size="lg"
                onClick={nextQuestionText}
              />
            </>
          ) : (
            !isLoading && (
              <>
                <Display text={questionText} />
                <Buttons text="finish" size="lg" onClick={nextQuestionText} />
              </>
            )
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
