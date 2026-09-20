export default function MakingTechFun() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-12 selection:bg-neutral-200">
      <div className="ambient-glow" />
      <main className="w-full relative z-10 flex flex-col max-w-[640px] items-center text-center">
        <h1 className="instrument-serif text-[38px] sm:text-[44px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] select-none leading-none mb-6">
          making tech fun
        </h1>
        <p className="font-sans text-[16px] text-[#64748B] dark:text-[#8E95B8] mb-12">
          Coming soon...
        </p>
        <a 
          href="/"
          className="text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2] hover:opacity-80 transition-opacity"
        >
          &larr; Back to home
        </a>
      </main>
    </div>
  );
}
