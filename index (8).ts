import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const stats = [
  { value: "18", label: "Total Properties", muted: false },
  { value: "7", label: "Vacant Units", muted: false },
  { value: "12", label: "Occupied Units", muted: true },
  { value: "12", label: "Tenants", muted: false },
];

const activities = [
  {
    title: ["Rent payment", "recorded - KWTU", "Bedsitter 2A"],
    time: "2 hours ago",
    image: "/image-removebg-preview--15--1.png",
    alt: "Rent payment recorded",
    imageClassName: "w-[77px] h-[74px]",
  },
  {
    title: ["Tenant added -", "JR Appartments", "5B"],
    time: "1 day ago",
    image: "/profile-icon-2.png",
    alt: "Tenant added",
    imageClassName: "w-[74px] h-[74px] object-cover",
  },
  {
    title: ["Property updated -", "ADADA Flats 1C"],
    time: "2 days ago",
    image: "/1085838-1.png",
    alt: "Property updated",
    imageClassName: "w-[74px] h-[74px] object-cover",
  },
  {
    title: ["Rent payment", "recorded - Campus", "View 3A"],
    time: "3 days ago",
    image: "/image-removebg-preview--15--2.png",
    alt: "Rent payment recorded",
    imageClassName: "w-[77px] h-[74px]",
  },
];

export const LandlordDashboardOverviewSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-[410px] rounded-[10px] border-[10px] border-black bg-white overflow-hidden">
        <header className="relative bg-[#1eee6e] px-3 pt-2 pb-3">
          <div className="mb-1 flex items-center justify-between">
            <p className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-none text-black">
              9:40
            </p>
            <div className="flex items-center gap-[3px]">
              <img
                className="h-[30px] w-[30px] object-cover"
                alt="Network bars photo"
                src="/network-bars-photo-5-1.png"
              />
              <img
                className="h-[25px] w-[25px] object-cover"
                alt="Wifi photo"
                src="/wifi-photo-6-1.png"
              />
              <img
                className="h-[25px] w-[25px] object-cover"
                alt="Phone battery photo"
                src="/phone-battery-photo-5-1.png"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <img
              className="h-[41px] w-14 shrink-0"
              alt="Frame"
              src="/frame-6.svg"
            />
            <h1 className="[font-family:'Inter',Helvetica] text-center text-[22px] font-extrabold leading-none text-black">
              SMARTKEJA
            </h1>
            <div className="relative h-[58px] w-[116px] shrink-0">
              <img
                className="absolute left-0 top-[-4px] h-[76px] w-[76px] object-cover"
                alt="Notification bell"
                src="/notification-bell-3.png"
              />
              <img
                className="absolute right-0 top-0 h-[60px] w-[60px] object-cover"
                alt="Image removebg"
                src="/image-removebg-preview--14--2.png"
              />
            </div>
          </div>
        </header>
        <main className="px-[13px] pb-[18px] pt-3">
          <section className="mb-4">
            <h2 className="[font-family:'Inter',Helvetica] text-[22px] font-extrabold leading-[normal] text-black">
              Welcome back, Betty Rachel
            </h2>
            <p className="[font-family:'Inter',Helvetica] text-base font-normal leading-[normal] text-black">
              Here&apos;s what&apos;s happening with your properties
            </p>
          </section>
          <section className="mb-3 grid grid-cols-2 gap-x-[17px] gap-y-[11px]">
            {stats.map((stat, index) => (
              <Card
                key={`${stat.label}-${index}`}
                className={`rounded-[10px] border border-black shadow-none ${
                  stat.muted ? "bg-white opacity-55" : "bg-white"
                }`}
              >
                <CardContent className="flex h-[90px] flex-col items-center justify-center p-3">
                  <p className="[font-family:'Inter',Helvetica] text-center text-[40px] font-extrabold leading-none text-black">
                    {stat.value}
                  </p>
                  <p className="[font-family:'Inter',Helvetica] whitespace-nowrap text-center text-base font-normal leading-[normal] text-black">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>
          <section className="mb-5">
            <h3 className="[font-family:'Inter',Helvetica] mb-2 text-[22px] font-extrabold leading-[normal] text-black">
              Recent Activities
            </h3>
            <div className="space-y-0">
              {activities.map((activity, index) => (
                <Card
                  key={`${activity.time}-${index}`}
                  className={`rounded-[10px] border border-black bg-white shadow-none ${
                    index !== activities.length - 1 ? "mb-[9px]" : ""
                  }`}
                >
                  <CardContent className="flex min-h-[77px] items-center gap-[7px] p-0 pr-[14px]">
                    <div className="flex h-[77px] w-[84px] items-center justify-center pl-[6px]">
                      <img
                        className={activity.imageClassName}
                        alt={activity.alt}
                        src={activity.image}
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                      <div className="[font-family:'Inter',Helvetica] text-base font-normal leading-[normal] text-black">
                        {activity.title.map((line, lineIndex) => (
                          <div key={`${line}-${lineIndex}`}>{line}</div>
                        ))}
                      </div>
                      <p className="[font-family:'Inter',Helvetica] shrink-0 whitespace-nowrap text-right text-base font-normal leading-[normal] text-black">
                        {activity.time}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          <Button className="h-auto w-full rounded-[5px] border border-black bg-[#1eee6e] py-[7px] [font-family:'Inter',Helvetica] text-[22px] font-extrabold leading-[normal] text-white hover:bg-[#1eee6e]/90">
            Add New Property
          </Button>
        </main>
      </div>
    </section>
  );
};
