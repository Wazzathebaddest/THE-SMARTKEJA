import { Card, CardContent } from "../../../../components/ui/card";

export const AdminPanelSection = (): JSX.Element => {
  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-[410px]">
        <Card className="overflow-hidden rounded-[10px] border-[10px] border-black bg-white shadow-none">
          <CardContent className="p-0">
            <div className="flex min-h-[844px] flex-col bg-white p-[20px]">
              <h2 className="[font-family:'Inter',Helvetica] text-[20px] font-bold leading-[normal] tracking-[0] text-black">
                Admin Panel
              </h2>
              <p className="mt-[10px] [font-family:'Inter',Helvetica] text-sm font-medium leading-[normal] tracking-[0] text-black">
                Protected area for admin users.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
