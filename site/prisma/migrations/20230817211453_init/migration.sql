-- CreateTable
CREATE TABLE "rooms" (
    "room_id" SERIAL NOT NULL,
    "current_question" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);
