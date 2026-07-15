import type { Vehicle } from '../types/chat';

const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL as string;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const VEHICLES_TOKEN = /\[\[vehicles:([0-9a-fA-F,-]+)\]\]/;

export function getSessionId(): string {
  const key = 'suda-ai-session-id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export async function fetchVehiclesByIds(ids: string[]): Promise<Vehicle[]> {
  if (ids.length === 0) return [];
  const url = `${SUPABASE_URL}/rest/v1/vehicles?id=in.(${ids.join(',')})&select=id,name,year,make,model,price,mileage,body_style,image_urls`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) return [];
  const vehicles: Vehicle[] = await res.json();
  const byId = new Map(vehicles.map((v) => [v.id, v]));
  return ids.map((id) => byId.get(id)).filter((v): v is Vehicle => Boolean(v));
}

export async function sendChatMessage(sessionId: string, chatInput: string): Promise<{ text: string; vehicles: Vehicle[] }> {
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'sendMessage', sessionId, chatInput }),
  });

  if (!res.ok) {
    return { text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.", vehicles: [] };
  }

  const data = await res.json();
  const raw: string = data.output ?? data.text ?? data.message ?? '';

  const match = raw.match(VEHICLES_TOKEN);
  const ids = match ? match[1].split(',').map((s) => s.trim()) : [];
  const text = raw.replace(VEHICLES_TOKEN, '').trim();
  const vehicles = await fetchVehiclesByIds(ids);

  return { text, vehicles };
}
