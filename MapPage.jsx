import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const statusIcons = [
  {
    alt: "Network bars photo",
    src: "/network-bars-photo-5-1.png",
    className: "h-[30px] w-[30px] object-cover",
  },
  {
    alt: "Wifi photo",
    src: "/wifi-photo-6-1.png",
    className: "h-[25px] w-[25px] object-cover",
  },
  {
    alt: "Phone battery photo",
    src: "/phone-battery-photo-5-1.png",
    className: "h-[25px] w-[25px] object-cover",
  },
];

const galleryArrows = [
  {
    alt: "Previous image",
    src: "/arrow-2.svg",
    className: "h-[15px] w-[23px]",
  },
  {
    alt: "Next image",
    src: "/arrow-4.svg",
    className: "h-[15px] w-[23px]",
  },
];

const ratingStars = Array.from({ length: 5 }, (_, index) => ({
  id: `star-${index}`,
  alt: "Element",
  src: "/1289679474-5.png",
  className: "h-10 w-10 object-cover",
}));

const features = [
  {
    icon: "/image-removebg-preview--8--1.png",
    alt: "Bedsitter icon",
    iconClassName: "h-[34px] w-[60px] object-cover",
    label: "Bedsitter",
  },
  {
    icon: "/203943-1.png",
    alt: "Bath icon",
    iconClassName: "h-10 w-10 object-cover",
    label: "1 Bath",
  },
  {
    icon: "/wifi-photo-6-1.png",
    alt: "Wifi photo",
    iconClassName: "h-10 w-10 object-cover",
    label: "Wi-Fi",
  },
  {
    icon: "/image-removebg-preview--9--1.png",
    alt: "Security icon",
    iconClassName: "h-[50px] w-[50px] object-cover",
    label: "Security",
  },
];

export const PropertyDetailSection = (): JSX.Element => {
  return (
    <section className="relative w-full px-3">
      <div className="mx-auto w-full max-w-[410px]">
        <Card className="overflow-hidden rounded-[10px] border-[10px] border-black bg-white shadow-none">
          <CardContent className="p-0">
            <div className="flex min-h-[844px] flex-col bg-white">
              <header className="flex items-center justify-between px-[19px] pt-[11px]">
                <div className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-none text-black">
                  9:40
                </div>
                <div className="flex items-center gap-[3px]">
                  {statusIcons.map((icon) => (
                    <img
                      key={icon.alt}
                      className={icon.className}
                      alt={icon.alt}
                      src={icon.src}
                    />
                  ))}
                </div>
              </header>
              <div className="flex items-center justify-between px-3 pt-3">
                <button
                  type="button"
                  aria-label="Go back"
                  className="inline-flex h-auto items-center justify-center"
                >
                  <img
                    className="h-[15px] w-[23px]"
                    alt="Arrow"
                    src="/arrow-2.svg"
                  />
                </button>
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    aria-label="Add to favorites"
                    className="inline-flex h-auto items-center justify-center"
                  >
                    <img
                      className="h-[30px] w-[30px] object-cover"
                      alt="Heart icon"
                      src="/heart-icon-5.png"
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="Share property"
                    className="inline-flex h-auto items-center justify-center"
                  >
                    <img
                      className="h-[30px] w-[30px] object-cover"
                      alt="Image removebg"
                      src="/image-removebg-preview--2--1.png"
                    />
                  </button>
                </div>
              </div>
              <div className="relative mt-[5px]">
                <img
                  className="h-[260px] w-full border border-black object-cover"
                  alt="Rectangle"
                  src="/rectangle-51.png"
                />
                <div className="pointer-events-none absolute inset-x-[7px] top-1/2 flex -translate-y-1/2 items-center justify-between">
                  {galleryArrows.map((arrow) => (
                    <button
                      key={arrow.alt}
                      type="button"
                      aria-label={arrow.alt}
                      className="pointer-events-auto inline-flex h-auto items-center justify-center"
                    >
                      <img
                        className={arrow.className}
                        alt={arrow.alt}
                        src={arrow.src}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <main className="flex flex-1 flex-col px-2.5 pb-4 pt-[15px]">
                <section aria-label="Property summary">
                  <h1 className="[font-family:'Inter',Helvetica] text-[22px] font-extrabold leading-[normal] text-black">
                    KWTU Bedsitters
                  </h1>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <p className="[font-family:'Inter',Helvetica] text-base font-normal leading-[normal] text-black whitespace-nowrap">
                      South B, Nairobi
                    </p>
                    <p className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-[normal] text-black whitespace-nowrap">
                      Ksh 10,000 /month
                    </p>
                  </div>
                  <div className="mt-[9px] flex items-center">
                    {ratingStars.map((star) => (
                      <img
                        key={star.id}
                        className={star.className}
                        alt={star.alt}
                        src={star.src}
                      />
                    ))}
                    <img
                      className="ml-1 h-[38px] w-10 object-cover"
                      alt="Image removebg"
                      src="/image-removebg-preview--10--1.png"
                    />
                  </div>
                  <div className="mt-1 grid grid-cols-4 items-end gap-x-2">
                    {features.map((feature) => (
                      <div
                        key={feature.label}
                        className="flex flex-col items-center justify-start text-center"
                      >
                        <img
                          className={feature.iconClassName}
                          alt={feature.alt}
                          src={feature.icon}
                        />
                        <p className="mt-1 [font-family:'Inter',Helvetica] text-base font-normal leading-[normal] text-black whitespace-nowrap">
                          {feature.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
                <img
                  className="mt-[14px] h-0.5 w-full"
                  alt="Line"
                  src="/line-15.svg"
                />
                <section
                  className="pt-1"
                  aria-labelledby="about-property-heading"
                >
                  <h2
                    id="about-property-heading"
                    className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-[normal] text-black"
                  >
                    About this property
                  </h2>
                  <p className="mt-3 [font-family:'Inter',Helvetica] text-sm font-normal leading-[normal] text-black">
                    Spacious and neat bedsitter close to various campuses.
                    <br />
                    Constant watersupply, high speed Wi-Fi
                    <br />
                    and 24/7 security.
                  </p>
                </section>
                <img
                  className="mt-[17px] h-0.5 w-full"
                  alt="Line"
                  src="/line-15.svg"
                />
                <section
                  className="pt-[6px]"
                  aria-labelledby="landlord-heading"
                >
                  <h2
                    id="landlord-heading"
                    className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-[normal] text-black"
                  >
                    Landlord
                  </h2>
                  <div className="mt-[3px] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-[9px]">
                      <img
                        className="h-20 w-20 object-cover"
                        alt="Image removebg"
                        src="/image-removebg-preview--4--1.png"
                      />
                      <div className="flex flex-col">
                        <p className="[font-family:'Inter',Helvetica] text-base font-extrabold leading-[normal] text-black whitespace-nowrap">
                          Betty Rachel
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <p className="[font-family:'Inter',Helvetica] text-base font-normal leading-[normal] text-black whitespace-nowrap">
                            Verified Landlord
                          </p>
                          <img
                            className="h-5 w-5 object-cover"
                            alt="Image removebg"
                            src="/image-removebg-preview--5--1.png"
                          />
                        </div>
                      </div>
                    </div>
                    <img
                      className="h-[68px] w-[105px]"
                      alt="Image removebg"
                      src="/image-removebg-preview--6--1.png"
                    />
                  </div>
                </section>
                <div className="mt-[3px] grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-auto rounded-[10px] border border-[#1eee6e] bg-white py-3 text-[#1eee6e] hover:bg-white hover:text-[#1eee6e]"
                  >
                    <img
                      className="mr-[10px] h-[30px] w-[30px] object-cover"
                      alt="Image removebg"
                      src="/image-removebg-preview--3--1.png"
                    />
                    <span className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-[normal]">
                      Message
                    </span>
                  </Button>
                  <Button
                    type="button"
                    className="h-auto rounded-[10px] border border-transparent bg-[#1eee6e] py-3 text-white hover:bg-[#1eee6e]/90"
                  >
                    <img
                      className="mr-[10px] h-[25px] w-[25px] object-cover"
                      alt="Phone call white"
                      src="/phone-call-white-icon-1.png"
                    />
                    <span className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-[normal]">
                      Call
                    </span>
                  </Button>
                </div>
              </main>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
