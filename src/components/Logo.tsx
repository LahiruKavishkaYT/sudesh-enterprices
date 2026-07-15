export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 12l8 10 8-10L12 2z" stroke="#E5C06A" strokeWidth="1.6" />
        <path d="M12 6l-4 6 4 6 4-6-4-6z" stroke="#E5C06A" strokeWidth="1.2" />
      </svg>
      <div>
        <div className="font-extrabold text-[16px] tracking-wide leading-none">SUDESH</div>
        <div className="text-[8px] tracking-[3px] text-gray-400 leading-none mt-0.5">ENTERPRISES</div>
      </div>
    </div>
  );
}
