export function PlaceholderVehicleImage({ label }: { label: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1a1c20] to-[#101114] text-[#E5C06A]">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E5C06A" strokeWidth="1.5">
        <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
        <rect x="2" y="13" width="20" height="6" rx="2" />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </svg>
      <span className="text-[10px] text-gray-400 px-2 text-center">{label}</span>
    </div>
  );
}

export function PlaceholderAvatar() {
  return (
    <div className="w-full h-full rounded-full flex items-center justify-center bg-[#1a1c20] text-[#E5C06A] text-base">
      👤
    </div>
  );
}
