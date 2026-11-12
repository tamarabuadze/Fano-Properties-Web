export function PropertyAmenities({ amenities }: { amenities: string[] }) {
  return (
    <div>
      <p className="eyebrow mb-3">Amenities</p>
      <h2 className="mb-6 font-display text-[28px] font-normal leading-tight text-[#2B2520]">Amenities &amp; features</h2>
      <ul className="grid grid-cols-1 border-t border-[#C5BAAB]/40 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => (
          <li
            key={amenity}
            className="flex items-center gap-3 border-b border-[#C5BAAB]/40 py-3 text-[14px] capitalize text-[#2B2520]/80 sm:pr-6"
          >
            <span aria-hidden="true" className="h-px w-4 shrink-0 bg-[#E2A862]" />
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
}
