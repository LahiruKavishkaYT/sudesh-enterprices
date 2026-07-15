import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { getSessionId, sendChatMessage } from '../lib/chatApi';
import type { ChatMessage, Vehicle } from '../types/chat';

export const SUDA_CHAT_OPEN_EVENT = 'suda-ai:open';

const GREETING =
  "Hi! I'm Suda AI, your personal vehicle advisor. Ask me anything about our inventory, financing, or trade-ins.";

const SUGGESTIONS = ['I need an SUV under $25k', 'Looking for a fuel efficient car', 'Best family car with 7 seats'];

const fmtPrice = (n: number) => '$' + n.toLocaleString('en-US');
const fmtMileage = (n: number) => n.toLocaleString('en-US') + ' mi';

function VehicleCard({ vehicle, onAsk }: { vehicle: Vehicle; onAsk: (text: string) => void }) {
  const image = vehicle.image_urls?.[0];
  return (
    <div className="bg-[#131417] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex gap-3 p-2.5">
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#1a1c20]">
          {image ? (
            <img src={image} alt={vehicle.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#E5C06A]">
              <Bot width={22} height={22} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <div className="text-[13px] font-bold text-white truncate">{vehicle.name}</div>
          <div className="text-[11px] text-gray-400 mt-1">
            {fmtMileage(vehicle.mileage)} · {vehicle.body_style}
          </div>
          <div className="text-sm font-extrabold text-[#E5C06A] mt-1.5">{fmtPrice(vehicle.price)}</div>
        </div>
      </div>
      <div className="flex gap-2 px-2.5 pb-2.5">
        <button
          onClick={() => onAsk(`Tell me more about the ${vehicle.name}`)}
          className="flex-1 bg-[#E5C06A] text-[#101114] font-bold text-[11px] rounded-lg py-2.5 min-h-10 cursor-pointer hover:bg-[#F0D08A] transition-colors"
        >
          View Details
        </button>
        <button
          onClick={() => onAsk(`I'd like to book a test drive for the ${vehicle.name}`)}
          className="flex-1 border border-white/15 text-white font-semibold text-[11px] rounded-lg py-2.5 min-h-10 cursor-pointer hover:border-[#E5C06A]/50 transition-colors"
        >
          Test Drive
        </button>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'greeting', role: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(getSessionId());

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(SUDA_CHAT_OPEN_EVENT, handler);
    return () => window.removeEventListener(SUDA_CHAT_OPEN_EVENT, handler);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const { text: replyText, vehicles } = await sendChatMessage(sessionId.current, trimmed);
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'bot', text: replyText, vehicles }]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: 'bot', text: "Sorry, I couldn't reach the server. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open Suda AI chat'}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-[#E5C06A] text-[#101114] flex items-center justify-center shadow-[0_10px_30px_rgba(229,192,106,0.35)] hover:bg-[#F0D08A] transition-colors cursor-pointer"
      >
        {open ? <X width={24} height={24} /> : <MessageCircle width={24} height={24} />}
      </button>

      {open && (
        <div className="fixed inset-3 bottom-20 sm:inset-auto sm:bottom-24 sm:right-6 z-50 sm:w-[380px] sm:max-w-[calc(100vw-2rem)] sm:h-[600px] sm:max-h-[calc(100vh-8rem)] bg-[#08090b] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#101114] border-b border-white/8 px-4 sm:px-5 py-3.5 sm:py-4 flex items-center gap-3 shrink-0">
            <div className="relative w-10 h-10 rounded-full bg-[#E5C06A]/15 border border-[#E5C06A]/40 flex items-center justify-center text-[#E5C06A] shrink-0">
              <Bot width={20} height={20} />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#101114]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white">Suda AI</div>
              <div className="text-[11px] text-gray-400 truncate">Your personal vehicle advisor</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-11 h-11 -mr-2 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer shrink-0"
            >
              <X width={18} height={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.text && (
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] bg-[#E5C06A] text-[#101114] text-[13px] font-medium leading-relaxed rounded-2xl rounded-br-sm px-4 py-2.5'
                        : 'max-w-[85%] bg-[#131417] border border-white/8 text-gray-100 text-[13px] leading-relaxed rounded-2xl rounded-bl-sm px-4 py-2.5'
                    }
                  >
                    {m.text}
                  </div>
                )}
                {m.vehicles && m.vehicles.length > 0 && (
                  <div className="w-[92%] flex flex-col gap-2">
                    {m.vehicles.map((v) => (
                      <VehicleCard key={v.id} vehicle={v} onAsk={send} />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start">
                <div className="bg-[#131417] border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C06A] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C06A] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C06A] animate-bounce" />
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 items-start mt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="border border-white/12 rounded-full px-4 py-2 text-[12px] text-gray-300 cursor-pointer bg-[#131417]/60 hover:border-[#E5C06A]/50 hover:text-white transition-colors text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-white/8 bg-[#08090b] p-3 flex items-center gap-2 shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Suda AI..."
              disabled={loading}
              className="flex-1 min-w-0 bg-[#131417] border border-white/12 focus:border-[#E5C06A] rounded-xl px-4 py-2.5 min-h-11 text-sm text-white outline-none placeholder:text-gray-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="w-11 h-11 rounded-xl bg-[#E5C06A] text-[#101114] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#F0D08A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send width={16} height={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
