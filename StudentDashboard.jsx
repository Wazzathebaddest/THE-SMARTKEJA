import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { supabase } from "../../../../lib/supabase";

const filters = [
  {
    label: "Filter",
    icon: "/image-removebg-preview--1--1.png",
    iconAlt: "Image removebg",
    active: true,
  },
  {
    label: "Price",
    icon: "/1123247-200-4.png",
    iconAlt: "Element",
    active: false,
  },
  {
    label: "Bedrooms",
    icon: "/1123247-200-4.png",
    iconAlt: "Element",
    active: false,
  },
  {
    label: "Amenities",
    icon: "/1123247-200-4.png",
    iconAlt: "Element",
    active: false,
  },
];

type PropertyCardModel = {
  name: string;
  location: string;
  price: string;
  image: string;
  imageAlt: string;
  amenities: string[];
};

const formatPrice = (value: unknown) => {
  if (typeof value === "number") return `Ksh ${value.toLocaleString()}/month`;
  if (typeof value === "string") return value;
  return "";
};

const CAMPUS_SEARCH_FALLBACK = "Nairobi";

export const PropertySearchSection = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [properties, setProperties] = useState<PropertyCardModel[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    let cancelled = false;
    const handle = window.setTimeout(async () => {
      setLoading(true);

      try {
        let q = supabase
          .from("properties")
          .select(
            `
            id,
            name,
            location,
            price,
            property_images ( url ),
            amenities
          `
          )
          .order("created_at", { ascending: false })
          .limit(50);

        const search = debouncedQuery.length ? debouncedQuery : CAMPUS_SEARCH_FALLBACK;
        q = q.or(`name.ilike.%${search}%,location.ilike.%${search}%`);

        if (priceMin !== null) q = q.gte("price", priceMin);
        if (priceMax !== null) q = q.lte("price", priceMax);

        if (amenities.length) {
          // If amenities is a string[] column, use contains; otherwise this will just no-op via RLS/table schema.
          q = q.contains("amenities", amenities);
        }

        const { data, error } = await q;
        if (error) throw error;
        if (cancelled) return;

        const mapped: PropertyCardModel[] =
          (data as any[] | null | undefined)?.map((p) => {
            const imgUrl =
              p?.property_images?.[0]?.url ??
              p?.property_images?.[0]?.image_url ??
              "";
            return {
              name: p?.name ?? "",
              location: p?.location ?? "",
              price: formatPrice(p?.price),
              image: imgUrl,
              imageAlt: "Image",
              amenities: (p?.amenities ?? []) as string[],
            };
          }) ?? [];

        setProperties(mapped.filter((x) => x.name));
      } catch {
        if (!cancelled) setProperties([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [debouncedQuery, priceMin, priceMax, amenities]);

  return (
    <section className="relative w-full bg-white">
      <Card className="mx-auto w-full max-w-[410px] overflow-hidden rounded-[10px] border-[10px] border-solid border-black bg-white shadow-none">
        <CardContent className="p-0">
          <header className="flex items-center justify-between px-[19px] pt-[11px]">
            <div className="[font-family:'Inter',Helvetica] text-center text-lg font-extrabold leading-[normal] tracking-[0] text-black">
              9:40
            </div>
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
          </header>
          <div className="px-[18px] pb-[18px] pt-[20px]">
            <div className="flex items-center justify-between">
              <button type="button" aria-label="Go back" className="shrink-0">
                <img
                  className="h-[15px] w-[23px]"
                  alt="Arrow"
                  src="/arrow-2.svg"
                />
              </button>
              <h1 className="[font-family:'Inter',Helvetica] text-center text-xl font-extrabold leading-[normal] tracking-[0] text-black">
                Search Properties
              </h1>
              <div className="w-[23px]" aria-hidden="true" />
            </div>
            <div className="mt-[38px]">
              <div className="relative">
                <Input
                  defaultValue={query}
                  aria-label="Search properties"
                  placeholder="Search location, property name..."
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-[41px] rounded-[10px] border border-solid border-black bg-white pl-[38px] pr-[48px] text-xs font-light text-black placeholder:[font-family:'Inter',Helvetica] placeholder:text-xs placeholder:font-light placeholder:text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <img
                  className="pointer-events-none absolute left-0 top-1/2 h-[29px] w-[35px] -translate-y-1/2 object-cover"
                  alt="Search icon"
                  src="/search-icon-5.png"
                />
                <img
                  className="pointer-events-none absolute right-[-9px] top-1/2 h-[46px] w-[55px] -translate-y-1/2 object-cover"
                  alt="Search icon"
                  src="/search-icon-5.png"
                />
              </div>
            </div>
            <nav aria-label="Property filters" className="mt-[37px]">
              <div className="grid grid-cols-4 gap-[9px]">
                {filters.map((filter) => (
                  <Button
                    key={filter.label}
                    type="button"
                    variant="outline"
                    className={`h-auto min-h-[39px] rounded-[10px] border border-solid border-black bg-white px-[8px] py-[7px] shadow-none hover:bg-white ${
                      filter.active ? "text-[#0600ba]" : "text-black"
                    }`}
                  >
                    <span className="flex items-center gap-[2px]">
                      <img
                        className={`${
                          filter.active ? "h-[30px] w-[30px]" : "h-5 w-5"
                        } object-cover`}
                        alt={filter.iconAlt}
                        src={filter.icon}
                      />
                      <span className="[font-family:'Inter',Helvetica] text-center text-sm font-medium leading-[normal] tracking-[0]">
                        {filter.label}
                      </span>
                    </span>
                  </Button>
                ))}
              </div>
            </nav>

            <main className="mt-[21px]">
              <div className="space-y-0">
                {loading
                  ? null
                  : properties.map((property, index) => (
                      <article key={property.name} className="relative">
                        <div className="grid grid-cols-[162px_minmax(0,1fr)] gap-[15px] py-[12px]">
                          <div className="overflow-hidden rounded-[10px] border border-solid border-black bg-white">
                            <img
                              className="h-[157px] w-full object-cover"
                              alt={property.imageAlt}
                              src={property.image}
                            />
                          </div>
                          <div className="min-w-0 pt-[6px]">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h2 className="[font-family:'Inter',Helvetica] text-[15px] font-bold leading-[normal] tracking-[0] text-black">
                                  {property.name}
                                </h2>
                              </div>
                              <button
                                type="button"
                                aria-label={`Save ${property.name}`}
                                className="shrink-0"
                              >
                                <img
                                  className="h-[30px] w-[30px] object-cover"
                                  alt="Heart icon"
                                  src="/heart-icon-5.png"
                                />
                              </button>
                            </div>
                            <p className="mt-[10px] [font-family:'Inter',Helvetica] text-[15px] font-medium leading-[normal] tracking-[0] text-black">
                              {property.location}
                            </p>
                            <p className="mt-[10px] [font-family:'Inter',Helvetica] text-[15px] font-medium leading-[normal] tracking-[0] text-black">
                              {property.price}
                            </p>
                            <div className="mt-[11px] grid grid-cols-3 gap-[8px]">
                              {property.amenities.map((amenity) => (
                                <div
                                  key={`${property.name}-${amenity}`}
                                  className="flex min-h-[38px] items-center justify-center rounded-[5px] border border-solid border-black bg-white px-[4px] text-center"
                                >
                                  <span
                                    className={`[font-family:'Inter',Helvetica] font-medium leading-[normal] tracking-[0] text-black ${
                                      amenity === "Security"
                                        ? "text-[13px]"
                                        : amenity === "Furnished"
                                          ? "text-[11px]"
                                          : "text-[15px]"
                                    }`}
                                  >
                                    {amenity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {index < properties.length - 1 && (
                          <img
                            className="mx-auto h-px w-[350px]"
                            alt="Line"
                            src="/line-13.svg"
                          />
                        )}
                      </article>
                    ))}
              </div>
            </main>
          </div>
          <footer className="mt-[5px]">
            <img className="h-px w-full" alt="Line" src="/line-12.svg" />
          </footer>
        </CardContent>
      </Card>
    </section>
  );
};
