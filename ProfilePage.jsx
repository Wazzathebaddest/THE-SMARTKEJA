import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { supabase } from "../../../../lib/supabase";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CAMPUS_COORDS = { lat: -1.2634, lng: 36.8663 };

const statusIcons = [
  {
    alt: "Network bars photo",
    src: "/network-bars-photo-5-1.png",
    className: "w-[30px] h-[30px] object-cover",
  },
  {
    alt: "Wifi photo",
    src: "/wifi-photo-6-1.png",
    className: "w-[25px] h-[25px] object-cover",
  },
  {
    alt: "Phone battery photo",
    src: "/phone-battery-photo-5-1.png",
    className: "w-[25px] h-[25px] object-cover",
  },
];

const mapControls = [
  {
    alt: "Plus",
    src: "/plus-104-1.png",
    wrapperClassName:
      "w-10 h-[39px] rounded-[5px] border border-black bg-white flex items-center justify-center",
    imageClassName: "w-9 h-9 object-cover",
  },
  {
    alt: "Free minus icon",
    src: "/free-minus-icon-3108-thumb-1.png",
    wrapperClassName:
      "w-10 h-[39px] rounded-[5px] border border-black bg-white flex items-center justify-center",
    imageClassName: "w-[26px] h-[26px] object-cover",
  },
  {
    alt: "Image removebg",
    src: "/image-removebg-preview--13--1.png",
    wrapperClassName:
      "w-10 h-[42px] rounded-[5px] border border-black bg-white flex items-center justify-center",
    imageClassName: "w-[51px] h-[51px] object-cover",
  },
];

type NearbyProperty = {
  id: string | number;
  title?: string | null;
  name?: string | null;
  price?: number | string | null;
  image_url?: string | null;
  property_images?: { url?: string | null }[] | null;
  lat?: number | null;
  lng?: number | null;
};

export const PropertyMapViewSection = (): JSX.Element => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState<NearbyProperty[]>([]);
  const [selected, setSelected] = useState<NearbyProperty | null>(null);

  const radiusKm = 3;

  const formatPrice = (value: NearbyProperty["price"]) => {
    if (typeof value === "number") return `Ksh ${value.toLocaleString()}/month`;
    if (typeof value === "string") return value;
    return "";
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { data, error } = await supabase.rpc("nearby_properties", {
        lat: CAMPUS_COORDS.lat,
        lng: CAMPUS_COORDS.lng,
        radius_km: radiusKm,
      });

      if (error) {
        if (!cancelled) setProperties([]);
        return;
      }

      if (cancelled) return;

      const list = (data ?? []) as NearbyProperty[];
      setProperties(list);
      setSelected(list?.[0] ?? null);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const mapMarkers = useMemo(() => {
    return properties.filter((p) => {
      const lat = typeof p.lat === "number" ? p.lat : null;
      const lng = typeof p.lng === "number" ? p.lng : null;
      return lat !== null && lng !== null;
    });
  }, [properties]);

  const selectedId = selected?.id;

  return (
    <section className="relative w-full flex justify-center">
      <Card className="relative w-full max-w-[410px] rounded-[10px] border-[10px] border-black bg-white p-0 shadow-none overflow-hidden">
        <CardContent className="relative h-[844px] p-0">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            alt="Map background"
            src="/image-15.png"
          />

          <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[19px] pt-[9px]">
            <div className="[font-family:'Inter',Helvetica] text-lg font-extrabold leading-[normal] tracking-[0] text-black">
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

          <div className="absolute left-[17px] right-[17px] top-14 z-10 flex items-center gap-5">
            <button
              type="button"
              className="flex h-[49px] flex-1 items-center rounded-[10px] border border-black bg-white pl-3 pr-4 text-left"
            >
              <img
                className="h-[33px] w-10 object-cover"
                alt="Search icon"
                src="/search-icon-5.png"
              />
              <span className="[font-family:'Inter',Helvetica] text-lg font-light leading-[normal] tracking-[0] text-black">
                Search this area
              </span>
            </button>

            <Button
              type="button"
              variant="ghost"
              className="h-[49px] w-[75px] rounded-[10px] border border-black bg-white p-0 hover:bg-white"
            >
              <img
                className="h-[40.06px] w-[42.02px] object-cover"
                alt="Image removebg"
                src="/image-removebg-preview--12--1.png"
              />
            </Button>
          </div>

          <main className="relative h-full w-full">
            <MapContainer
              center={[CAMPUS_COORDS.lat, CAMPUS_COORDS.lng]}
              zoom={14}
              style={{ height: "100%", width: "100%", position: "absolute", inset: 0, zIndex: 1 }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapMarkers.map((p) => {
                const lat = p.lat as number;
                const lng = p.lng as number;
                const title = (p.title ?? p.name ?? "").toString();
                const img =
                  p.image_url ?? p.property_images?.[0]?.url ?? "";
                return (
                  <Marker
                    key={String(p.id)}
                    position={[lat, lng]}
                    eventHandlers={{
                      click: () => {
                        setSelected(p);
                      },
                    }}
                  >
                    <Popup>
                      <div>
                        <div style={{ fontWeight: 700 }}>{title}</div>
                        <div>{formatPrice(p.price ?? null)}</div>
                        <div>{img ? <img alt="Property" src={img} style={{ width: 60 }} /> : null}</div>
                        <button
                          type="button"
                          onClick={() => navigate(`/property/${p.id}`)}
                        >
                          View
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>

            <img
              className="absolute top-60 left-[131px] h-[75px] w-[84px] z-0"
              alt="Free home location"
              src="/free-home-location-address-placeholder-green-icon-26034-thumb-1.png"
            />

            <aside className="absolute right-[7px] top-[495px] z-10 flex flex-col gap-0">
              {mapControls.map((control) => (
                <div key={control.alt} className={control.wrapperClassName}>
                  <img
                    className={control.imageClassName}
                    alt={control.alt}
                    src={control.src}
                  />
                </div>
              ))}
            </aside>

            <img
              className="absolute top-[582px] left-[269px] h-[37px] w-[37px] object-cover z-10"
              alt="Img"
              src="/img-icons8-2.png"
            />

            <Card className="absolute bottom-[71px] left-[13px] w-[305px] rounded-[10px] border border-black bg-white p-0 shadow-none z-20">
              <CardContent className="flex gap-[14px] p-[16px]">
                <div className="relative h-[120px] w-[141px] shrink-0 overflow-hidden rounded-[10px] border border-black bg-white">
                  <img
                    className="h-full w-full object-cover"
                    alt="Property image"
                    src={
                      (selected?.property_images?.[0]?.url as string | undefined) ??
                      selected?.image_url ??
                      "/image-16.png"
                    }
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col pt-[10px]">
                  <h2 className="[font-family:'Inter',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-black">
                    {String(selected?.title ?? selected?.name ?? "—")}
                  </h2>
                  <p className="mt-[14px] [font-family:'Inter',Helvetica] text-sm font-normal leading-[normal] tracking-[0] text-black">
                    {""}
                  </p>
                  <p className="mt-[14px] [font-family:'Inter',Helvetica] text-sm font-normal leading-[normal] tracking-[0] text-black">
                    {formatPrice(selected?.price ?? null)}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-[13px] h-[39px] w-28 rounded-[10px] border-[#00be29] bg-white px-0 [font-family:'Inter',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-[#0082e0] hover:bg-white hover:text-[#0082e0]"
                    onClick={() => {
                      if (selectedId != null) navigate(`/property/${selectedId}`);
                    }}
                    disabled={selectedId == null}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </CardContent>
      </Card>
    </section>
  );
};
