import { SUDA_CHAT_OPEN_EVENT } from './ChatWidget';

export function openSudaChat() {
  window.dispatchEvent(new CustomEvent(SUDA_CHAT_OPEN_EVENT));
}

export default function SudaAiButton({ label = '✦ Chat with Suda AI', className = '' }: { label?: string; className?: string }) {
  return (
    <button
      onClick={openSudaChat}
      className={`flex items-center gap-2 bg-[#E5C06A] text-[#101114] font-bold text-[13px] rounded-[14px] px-6 py-3 cursor-pointer hover:bg-[#F0D08A] transition-colors ${className}`}
    >
      {label}
    </button>
  );
}
