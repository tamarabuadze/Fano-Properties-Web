import { Check } from "lucide-react";

export function PropertyAmenities({ amenities }: { amenities: string[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1a1410] mb-6">Amenities & Features</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-border"
          >
            <div className="h-6 w-6 rounded-lg bg-black/5 flex items-center justify-center shrink-0">
              <Check className="h-3.5 w-3.5 text-[#1a1410]" />
            </div>
            <span className="text-sm text-zinc-700 capitalize">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
