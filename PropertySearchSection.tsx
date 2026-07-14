import { Card, CardContent } from "../../../../components/ui/card";

const headerLines = [
  {
    alt: "Line",
    src: "/line-1.svg",
    className: "h-px w-[170px]",
  },
  {
    alt: "Line",
    src: "/line-1.svg",
    className: "h-px w-[170px]",
  },
];

export const AppHeaderSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#070e26]">
      <Card className="w-full rounded-none border-0 bg-transparent shadow-none">
        <CardContent className="flex min-h-[161px] w-full items-start gap-3 px-4 py-0 sm:px-6 lg:px-8">
          <div className="flex h-[161px] shrink-0 items-start">
            <img
              className="h-[161px] w-[171px] object-cover"
              alt="Screenshot"
              src="/screenshot-2026-06-25-164338-removebg-preview-1.png"
            />
          </div>
          <header className="flex min-h-[161px] flex-1 flex-col justify-start py-2 sm:py-3">
            <h1 className="[font-family:'Inter',Helvetica] text-[32px] font-bold leading-none tracking-[0] text-white sm:text-5xl lg:text-6xl">
              SMARTKEJA
            </h1>
            <div className="mt-3 flex items-center gap-3">
              {headerLines.map((line, index) => (
                <img
                  key={`header-line-${index}`}
                  className={line.className}
                  alt={line.alt}
                  src={line.src}
                />
              ))}
              <img
                className="h-[19px] w-[13px]"
                alt="Ellipse"
                src="/ellipse-1.svg"
              />
            </div>
            <p className="mt-2 max-w-[573px] [font-family:'Inter',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-white sm:text-lg lg:text-[22px]">
              Find Verified Student Accommodation Near Campus
            </p>
            <p className="[font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0] text-white sm:text-base lg:text-xl">
              Connect with landlords and find the perfect place to stay
            </p>
          </header>
        </CardContent>
      </Card>
    </section>
  );
};
