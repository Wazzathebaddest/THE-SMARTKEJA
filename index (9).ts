import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { useAuth } from "../../../../lib/auth-context";

const socialProviders = [
  {
    name: "Google",
    iconSrc: "/google-logo-1.png",
    iconAlt: "Google logo",
  },
  {
    name: "Facebook",
    iconSrc: "/image-1.png",
    iconAlt: "Image",
  },
];

const statusIcons = [
  {
    src: "/network-bars-photo-5-1.png",
    alt: "Network bars photo",
    className: "w-[30px] h-[30px] object-cover",
  },
  {
    src: "/wifi-photo-6-1.png",
    alt: "Wifi photo",
    className: "w-[25px] h-[25px] object-cover",
  },
  {
    src: "/phone-battery-photo-5-1.png",
    alt: "Phone battery photo",
    className: "w-[25px] h-[25px] object-cover",
  },
];

export const LoginFormSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();

  const intendedRole =
    (location.state as { intendedRole?: "student" | "landlord" } | null | undefined)
      ?.intendedRole ?? "student";

  return (
    <section className="relative w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[410px]">
        <Card className="overflow-hidden rounded-[10px] border-[10px] border-black bg-white shadow-none">
          <CardContent className="p-0">
            <div className="flex min-h-[844px] flex-col bg-white">
              <header className="flex items-center justify-between px-[9px] pt-[7px]">
                <time
                  dateTime="09:40"
                  className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-[normal] tracking-[0] text-black"
                >
                  9:40
                </time>
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
              <div className="flex flex-1 flex-col px-[11px] pt-[22px]">
                <div className="mb-[58px]">
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
                </div>
                <main className="flex flex-1 flex-col items-center">
                  <div className="w-full max-w-[341px]">
                    <header className="text-center">
                      <h1 className="[font-family:'Inter',Helvetica] text-[22px] font-bold leading-[normal] tracking-[0] text-black">
                        Welcome Back!
                      </h1>
                      <p className="mt-[18px] [font-family:'Inter',Helvetica] text-base font-medium leading-[normal] tracking-[0] text-black">
                        Login to your account
                      </p>
                    </header>
                    <form
                      className="mt-[58px] space-y-[43px]"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const emailInput = form.querySelector<HTMLInputElement>("#email");
                        const passwordInput =
                          form.querySelector<HTMLInputElement>("#password");
                        const email = emailInput?.value ?? "";
                        const password = passwordInput?.value ?? "";
                        await signIn(email, password);

                        navigate(intendedRole === "landlord" ? "/landlord" : "/student", {
                          replace: true,
                        });
                      }}
                    >
                      <div className="space-y-0">
                        <label
                          htmlFor="email"
                          className="mb-[8px] flex h-[50px] items-center rounded-[10px] border border-black bg-white pl-[10px] pr-4"
                        >
                          <img
                            className="h-10 w-10 object-cover"
                            alt="Envelope image"
                            src="/envelope-image-1.png"
                          />
                          <Input
                            id="email"
                            type="email"
                            defaultValue=""
                            placeholder="Email address"
                            className="h-auto border-0 bg-transparent px-[6px] py-0 shadow-none [font-family:'Inter',Helvetica] text-sm font-extralight leading-[normal] tracking-[0] text-black placeholder:text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </label>
                      </div>
                      <div className="space-y-0">
                        <label
                          htmlFor="password"
                          className="mb-[8px] flex h-[50px] items-center rounded-[10px] border border-black bg-white pl-[10px] pr-[12px]"
                        >
                          <img
                            className="h-10 w-10 object-cover"
                            alt="Padlock image"
                            src="/padlock-image-1.png"
                          />
                          <Input
                            id="password"
                            type="password"
                            defaultValue=""
                            placeholder="Password"
                            className="h-auto border-0 bg-transparent px-[6px] py-0 shadow-none [font-family:'Inter',Helvetica] text-sm font-extralight leading-[normal] tracking-[0] text-black placeholder:text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          <button
                            type="button"
                            aria-label="Show password"
                            className="inline-flex h-auto shrink-0 items-center justify-center"
                          >
                            <img
                              className="h-[30px] w-[30px] object-cover"
                              alt="Eye photo"
                              src="/eye-photo-1.png"
                            />
                          </button>
                        </label>
                      </div>
                      <div className="flex items-center justify-between gap-4 px-[11px]">
                        <label
                          htmlFor="remember-me"
                          className="flex cursor-pointer items-center gap-[8px]"
                        >
                          <Checkbox
                            id="remember-me"
                            className="h-5 w-5 rounded-[5px] border-black data-[state=checked]:border-black data-[state=checked]:bg-white data-[state=checked]:text-black"
                          />
                          <span className="[font-family:'Inter',Helvetica] text-[15px] font-medium leading-[normal] tracking-[0] text-black">
                            Remember me
                          </span>
                        </label>
                        <button
                          type="button"
                          className="[font-family:'Inter',Helvetica] text-[15px] font-extrabold leading-[normal] tracking-[0] text-[#4f68f6]"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <Button
                        type="submit"
                        className="h-[50px] w-full rounded-[10px] border border-black bg-[#0600ba] [font-family:'Inter',Helvetica] text-base font-bold leading-[normal] tracking-[0] text-white hover:bg-[#0600ba]"
                      >
                        Login
                      </Button>
                    </form>
                    <div className="mt-[34px] text-center">
                      <p className="[font-family:'Inter',Helvetica] text-base font-medium leading-[normal] tracking-[0] text-black">
                        or continue with
                      </p>
                      <div className="mt-[26px] grid grid-cols-2 gap-[44px]">
                        {socialProviders.map((provider) => (
                          <Button
                            key={provider.name}
                            type="button"
                            variant="outline"
                            className="h-[50px] rounded-[10px] border-black bg-white px-[6px] [font-family:'Inter',Helvetica] text-base font-medium leading-[normal] tracking-[0] text-black hover:bg-white"
                          >
                            <img
                              className="h-10 w-10 object-cover"
                              alt={provider.iconAlt}
                              src={provider.iconSrc}
                            />
                            <span>{provider.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </main>
                <footer className="pb-[30px] pt-[18px] text-center">
                  <p className="[font-family:'Inter',Helvetica] text-[15px] font-normal leading-[normal] tracking-[0] text-black">
                    <span className="font-medium text-black">
                      Don&apos;t have an account?{" "}
                    </span>
                    <button
                      type="button"
                      className="font-extrabold text-[#4f68f6]"
                      onClick={async (e) => {
                        e.preventDefault();
                        // Minimal wiring: use same inputs for signUp.
                        const form = document.querySelector<HTMLFormElement>(
                          "form.mt-[58px].space-y-[43px]"
                        );
                        const emailInput =
                          form?.querySelector<HTMLInputElement>("#email");
                        const passwordInput =
                          form?.querySelector<HTMLInputElement>("#password");
                        const email = emailInput?.value ?? "";
                        const password = passwordInput?.value ?? "";

                        await signUp(email, password, intendedRole);
                      }}
                    >
                      Register
                    </button>
                  </p>
                </footer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
