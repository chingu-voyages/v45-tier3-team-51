import { HeaderAction } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Display } from "@/components/Display";

export default function Completed() {
  return (
    <main className="flex flex-col min-h-screen p-4">
      {/* Header */}
      <HeaderAction />

      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Display */}
        <div className="mb-6 text-center">
          <Display text="Thanks for playing!" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
