import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Button } from "@/components/core/Button";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const NotFound = () => {
  return (
    <main className="flex flex-1 flex-col min-h-screen items-center justify-center bg-white px-6 py-20">
      <div className="relative flex flex-col items-center">
        {/* Top left decorative line */}
        <div className="absolute -top-8 left-[-40px] h-[1px] w-20 bg-black/60 md:w-32 md:-top-12 md:left-[-80px]" />

        <div className="relative mb-8">
          {/* Pink Badge */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 md:-left-12">
            <span className="inline-flex items-center rounded-full bg-[#E95A8A] px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-white md:px-3 md:py-1">
              ERROR 404
            </span>
          </div>

          <h1
            className={`${playfair.className} text-[2.8rem] font-medium tracking-tight text-[#1A1A1A] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-none uppercase`}
          >
            Page Not Found
          </h1>

          {/* Bottom right decorative line */}
          <div className="absolute -bottom-6 right-[-20px] h-[1px] w-20 bg-black/60 md:w-32 md:-bottom-10 md:right-[-60px]" />
        </div>

        <div className="mt-12 max-w-xl text-center">
          <p
            className={`${playfair.className} text-[15px] font-normal leading-relaxed text-[#1A1A1A] md:text-lg italic opacity-90`}
          >
            The page you were looking for could not be found. It might{" "}
            <br className="hidden md:block" />
            have been removed, renamed, or did not exist in the first place.
          </p>

          <div className="mt-10 md:mt-16">
            <Button
              asChild
              className="h-auto rounded-none bg-black px-10 py-3.5 text-[11px] font-semibold tracking-[0.25em] text-white transition-colors hover:bg-black/90 md:px-14 md:py-4"
            >
              <Link href="/">GO TO HOME PAGE</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
