import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Completed() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        <div className="relative flex place-items-center ">
          <h1>That’s all, thanks for playing!</h1>
        </div>
        <Footer />
      </main>
    </>
  );
}
