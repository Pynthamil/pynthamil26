import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center px-5 sm:px-8 md:px-12 pt-16 sm:pt-24 pb-12 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      <main className="w-full relative z-10 flex flex-col items-center justify-center max-w-[490px] text-center space-y-6 my-auto">
        <div className="font-mono text-5xl sm:text-6xl font-bold text-[#095F76] dark:text-[#74B1C3] tracking-wider">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-medium text-[#0F172A] dark:text-[#F2F2F2]">
            page not found
          </h1>
          <p className="font-mono text-sm text-[#64748B] dark:text-[#8E95B8]">
            // you seem to have wandered off the map
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 border border-dashed border-[#4C173A] dark:border-[#F5D6E7] font-mono text-sm text-[#4C173A] dark:text-[#F5D6E7] hover:text-[#095F76] dark:hover:text-[#74B1C3] hover:border-[#095F76] dark:hover:border-[#74B1C3] transition-colors"
          >
            <span>&larr;</span>
            <span>return home</span>
          </Link>
        </div>
      </main>

      <footer className="w-full max-w-[490px] pt-8 border-t border-neutral-200/70 dark:border-[#EBB8D5]/20 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-[#64748B] dark:text-[#8E95B8]">
        <div>coding is an art and im an artist</div>
        <div>made w love &bull; &copy; 2026</div>
      </footer>
    </div>
  );
}
