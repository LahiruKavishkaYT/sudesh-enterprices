export type Vehicle = {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  price: number;
  mileage: number;
  body_style: string;
  image_urls: string[] | null;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  vehicles?: Vehicle[];
  pending?: boolean;
};
