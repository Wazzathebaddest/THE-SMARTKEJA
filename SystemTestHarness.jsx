import React, { useState } from "react";
import { Heart, MapPin } from "lucide-react";

export function PropertyCard({ property }) {
  const [isSaved, setIsSaved] = useState(false);

  // Get the first image URL or use a high-quality real estate placeholder
  const imageUrl =
    property.property_images && property.property_images.length > 0
      ? property.property_images[0].url
      : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Property Image container */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // fallback if URL is broken
            e.currentTarget.src = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Save/Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:text-red-500"
          aria-label="Save property"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isSaved ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Status Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-[#0600ba] px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
          {property.status}
        </span>
      </div>

      {/* Details container */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-bold text-gray-900 text-base md:text-lg group-hover:text-[#0600ba] transition-colors">
            {property.title}
          </h3>
        </div>

        {/* Address / Location */}
        <div className="mb-3 flex items-center gap-1 text-xs md:text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="line-clamp-1">{property.address || "South B, Nairobi"}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-lg font-extrabold text-gray-900">
            Ksh {Number(property.price).toLocaleString()}
          </span>
          <span className="text-xs text-gray-500 font-medium"> / month</span>
        </div>

        {/* Amenities pills */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
            {property.amenities.map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] md:text-xs font-semibold text-gray-600 border border-gray-200"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
