export function PropertyAmenities({ amenities }: { amenities: string[] }) {
  return (
    <div>
      <p className="lx-eyebrow mb-4">Amenities</p>
      <h2 className="mb-6 font-display text-[28px] font-normal leading-tight text-lx-text">Amenities &amp; features</h2>
      <ul className="grid grid-cols-1 border-t border-lx-line sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => (
          <li
            key={amenity}
            className="flex items-center gap-3 border-b border-lx-line py-3 text-[14px] capitalize text-lx-text/80 sm:pr-6"
          >
            <span aria-hidden="true" className="h-px w-4 shrink-0 bg-lx-gold" />
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
}
