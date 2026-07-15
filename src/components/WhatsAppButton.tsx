export default function WhatsAppButton({
  className = '',
  variant = 'outline',
}: {
  className?: string;
  variant?: 'outline' | 'solid';
}) {
  const isSolid = variant === 'solid';
  const stroke = isSolid ? '#101114' : '#E5C06A';

  return (
    <a
      href="https://wa.me/94771234567"
      target="_blank"
      rel="noopener noreferrer"
      className={
        (isSolid
          ? 'inline-flex items-center gap-2 bg-[#E5C06A] text-[#101114] font-bold rounded-full px-5.5 py-3 text-[13px] cursor-pointer hover:bg-[#F0D08A] transition-colors'
          : 'inline-flex items-center gap-2 border border-[#E5C06A] rounded-[14px] px-4 py-2 text-[13px] font-semibold text-[#E5C06A] cursor-pointer hover:bg-[#E5C06A1a] transition-colors') +
        ' ' +
        className
      }
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      WhatsApp Us
    </a>
  );
}
