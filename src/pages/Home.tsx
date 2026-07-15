import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SudaAiButton, { openSudaChat } from '../components/SudaAiButton';
import WhatsAppButton from '../components/WhatsAppButton';
import { PlaceholderAvatar } from '../components/PlaceholderImage';
import {
  heroBadges,
  lifestyles,
  featuredVehicles,
  sudaSuggestions,
  tradeChecks,
  whyUs,
  testimonials,
} from '../data/site';
import heroSuv from '../assets/hero-suv.webp';
import sudaAiBg from '../assets/suda-ai.webp';
import tradeInBg from '../assets/trade-in.webp';
import sudeshBg from '../assets/sudesh.webp';

const MIN_PRICE = 500000;
const MAX_PRICE = 25000000;

export default function Home() {
  const [price, setPrice] = useState(5950000);
  const priceLabel = price.toLocaleString('en-US');
  const pricePct = Math.round(((price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100);

  return (
    <div className="bg-[#08090B] overflow-x-hidden">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroSuv} alt="Dark city street with black SUV" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg,rgba(8,9,11,.96) 0%,rgba(8,9,11,.9) 45%,rgba(8,9,11,.55) 75%,rgba(8,9,11,.6) 100%)',
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[80px] sm:h-[120px] pointer-events-none"
            style={{ background: 'linear-gradient(180deg,transparent,#08090B)' }}
          />
        </div>
        <div className="relative z-10">
          <Navbar transparent />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-10 lg:pb-12">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 border border-[#E5C06A]/45 rounded-full px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-[11px] tracking-[1.5px] font-semibold text-[#E5C06A] bg-[#08090b]/50">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#E5C06A" className="shrink-0">
                <circle cx="12" cy="12" r="4" />
              </svg>
              SRI LANKA'S TRUSTED CAR DEALER
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] lg:leading-[1.08] font-bold mt-5">
              Find Your
              <br />
              Perfect Vehicle.
              <br />
              <span className="text-[#E5C06A]">Powered by AI.</span>
            </h1>
            <p className="text-[#C7CBD1] text-sm sm:text-base leading-relaxed mt-4 sm:mt-5 max-w-[420px]">
              200+ quality new and used vehicles.
              <br />
              Best prices. Easy financing. Trusted since 2005.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 mt-6 sm:mt-7 items-stretch">
              <div className="flex items-center bg-[#131417]/90 border border-white/10 rounded-[18px] pl-4.5 pr-1.5 py-1.5 w-full sm:w-[400px]">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="shrink-0">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <input
                  placeholder="Search any vehicle..."
                  className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm px-3 py-2"
                />
                <button className="bg-[#E5C06A] text-[#101114] font-bold text-[13px] rounded-[13px] px-5 sm:px-6.5 py-2.5 min-h-11 cursor-pointer hover:bg-[#F0D08A] transition-colors shrink-0">
                  Search
                </button>
              </div>
              <button
                onClick={openSudaChat}
                className="flex items-center justify-center gap-2 bg-[#131417]/90 border border-white/12 rounded-[14px] px-5.5 py-2.5 min-h-11 text-[13px] font-semibold cursor-pointer hover:border-[#E5C06A]/50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E5C06A" strokeWidth="2">
                  <rect x="5" y="8" width="14" height="10" rx="3" />
                  <circle cx="9.5" cy="13" r="1" fill="#E5C06A" />
                  <circle cx="14.5" cy="13" r="1" fill="#E5C06A" />
                  <path d="M12 8V5" />
                  <circle cx="12" cy="4" r="1" />
                </svg>
                Ask Suda AI
              </button>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-5 gap-4 mt-11 max-w-[900px] justify-between">
            {heroBadges.map((b) => (
              <div key={b.title} className="flex items-center gap-2 min-w-0">
                <b.icon width={16} height={16} stroke="#E5C06A" strokeWidth={1.8} className="shrink-0" />
                <div className="min-w-0">
                  <div className="text-[13px] font-bold truncate">{b.title}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 truncate">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-x-4 gap-y-5 mt-8 sm:mt-11">
            {heroBadges.map((b) => (
              <div key={b.title} className="flex items-center gap-2.5 min-w-0">
                <b.icon width={18} height={18} stroke="#E5C06A" strokeWidth={1.8} className="shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] sm:text-[13px] font-bold truncate">{b.title}</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 truncate">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIFESTYLE */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-[110px]">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-[38px] font-bold">
          Explore by <span className="text-[#E5C06A]">Lifestyle</span>
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-[15px] mt-3">Tell us what fits your life. We'll find the perfect match.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-4.5 mt-8 sm:mt-11">
          {lifestyles.map((l) => (
            <div
              key={l.slot}
              className="relative border border-white/8 rounded-[20px] overflow-hidden cursor-pointer h-[180px] sm:h-[220px] lg:h-[260px] transition-all duration-250 hover:-translate-y-1 hover:border-[#E5C06A]/40"
            >
              <div className="absolute inset-0">
                <img src={l.src} alt={l.title} className="w-full h-full object-contain bg-[#0d0e11]" />
              </div>
              <div
                className="absolute left-0 right-0 bottom-0 h-[55%] pointer-events-none"
                style={{ background: 'linear-gradient(180deg,transparent,rgba(8,9,11,.92) 75%)' }}
              />
              <div className="absolute left-0 right-0 bottom-0 flex items-center gap-2 sm:gap-3 p-3 sm:p-4 pointer-events-none">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#131417]/85 border border-[#E5C06A]/35 flex items-center justify-center text-[#E5C06A] text-sm sm:text-base shrink-0">
                  {l.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] sm:text-sm font-bold truncate">{l.title}</div>
                  <div className="text-[10px] sm:text-[11px] text-[#C7CBD1] mt-0.5 truncate">{l.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED VEHICLES */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-[110px]">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold">Featured Vehicles</h2>
            <p className="text-gray-400 text-sm sm:text-[15px] mt-2.5">Handpicked quality vehicles, ready for you.</p>
          </div>
          <div className="inline-flex self-start sm:self-auto items-center gap-2 border border-[#E5C06A]/50 rounded-[14px] px-5 py-2.5 min-h-11 text-[13px] font-semibold text-[#E5C06A] cursor-pointer hover:bg-[#E5C06A1a] transition-colors">
            View All Inventory <span>→</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 mt-7 sm:mt-9">
          {featuredVehicles.map((v) => (
            <div
              key={v.slot}
              className="bg-[#131417] border border-white/8 rounded-[20px] overflow-hidden transition-all duration-250 hover:-translate-y-1 hover:border-[#E5C06A]/40"
            >
              <div className="relative h-[190px] sm:h-[170px] p-2.5">
                <div className="relative h-full rounded-xl overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-5 left-5 bg-[#E5C06A] text-[#101114] text-[10px] font-extrabold tracking-wider rounded-md px-2.5 py-1.5 pointer-events-none">
                  {v.badge}
                </div>
              </div>
              <div className="px-4.5 pb-5 pt-2">
                <div className="flex justify-between items-center gap-2">
                  <div className="text-[17px] font-bold truncate">{v.name}</div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" className="cursor-pointer hover:stroke-[#E5C06A] shrink-0">
                    <path d="M12 21s-7.5-4.8-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9z" />
                  </svg>
                </div>
                <div className="text-xs text-gray-400 mt-2">{v.specs}</div>
                <div className="text-[17px] font-extrabold mt-3.5">Rs. {v.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-7">
          <div className="w-5.5 h-1.5 rounded-full bg-[#E5C06A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#3a3d43]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#3a3d43]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#3a3d43]" />
        </div>
      </div>

      {/* MEET SUDA AI */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-[110px]">
        <div className="relative border border-white/8 rounded-[20px] overflow-hidden">
          <div
            className="absolute inset-0 bg-[#0d0e11]"
            style={{ background: `url(${sudaAiBg}) center / cover no-repeat #0d0e11` }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg,rgba(8,9,11,.55) 0%,rgba(8,9,11,.85) 55%,#08090b 100%), linear-gradient(90deg,rgba(8,9,11,.4) 0%,rgba(8,9,11,.75) 45%,rgba(8,9,11,.4) 100%)',
            }}
          />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 p-6 sm:p-10 lg:p-10 xl:p-12 xl:pl-[270px] min-h-[180px] pointer-events-none">
            <div className="flex-1 lg:min-w-[220px] pointer-events-auto">
              <h2 className="text-2xl sm:text-[32px] font-bold">Meet Suda AI</h2>
              <div className="text-[#E5C06A] text-sm sm:text-base font-semibold mt-2">Your Personal Vehicle Advisor</div>
              <p className="text-gray-300 lg:text-gray-400 text-sm leading-relaxed mt-3.5 max-w-[420px]">
                Get personalized recommendations, compare vehicles, check financing options and more — all with the power of AI.
              </p>
            </div>
            <div className="flex flex-col gap-3 items-stretch sm:items-start shrink-0 pointer-events-auto">
              {sudaSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={openSudaChat}
                  className="border border-white/12 rounded-full px-5 py-2.5 min-h-11 text-[13px] text-gray-300 cursor-pointer bg-[#131417]/60 hover:border-[#E5C06A]/50 hover:text-white transition-colors text-left"
                >
                  {s}
                </button>
              ))}
            </div>
            <SudaAiButton className="shrink-0 pointer-events-auto w-full sm:w-auto justify-center" />
          </div>
        </div>
      </div>

      {/* FINANCE + TRADE-IN */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-[110px] grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#131417] border border-white/8 rounded-[20px] p-6 sm:p-9">
          <h3 className="text-xl sm:text-[26px] font-bold">Calculate Your Finance</h3>
          <p className="text-gray-400 text-sm mt-2">Get an estimate in seconds.</p>
          <div className="text-xs text-gray-400 mt-7">Vehicle Price</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#E5C06A] mt-1.5">Rs. {priceLabel}</div>
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={50000}
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="w-full mt-4"
            style={{ background: `linear-gradient(90deg,#E5C06A ${pricePct}%,#2a2d33 ${pricePct}%)` }}
          />
          <div className="flex justify-between text-[11px] text-gray-500 mt-2">
            <span>Rs. 500K</span>
            <span>Rs. 25M+</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-3.5 mt-5.5">
            <div className="border border-white/10 rounded-xl px-3 sm:px-4 py-3">
              <div className="text-[11px] text-gray-400">Down Payment</div>
              <div className="flex justify-between mt-1.5 text-sm font-semibold">
                <span>Payment</span>
                <span className="text-[#E5C06A]">20%</span>
              </div>
            </div>
            <div className="border border-white/10 rounded-xl px-3 sm:px-4 py-3">
              <div className="text-[11px] text-gray-400">Loan Period</div>
              <div className="flex justify-between mt-1.5 text-sm font-semibold">
                <span>Duration</span>
                <span className="text-[#E5C06A]">5 Years</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-[#E5C06A] text-[#101114] font-bold text-sm rounded-[14px] py-3.5 min-h-11 mt-6 cursor-pointer hover:bg-[#F0D08A] transition-colors">
            ⊞ Calculate EMI
          </button>
        </div>
        <div
          className="relative border border-white/8 rounded-[20px] p-6 sm:p-9 flex gap-7 overflow-hidden bg-[#131417] min-h-[280px] sm:min-h-0"
          style={{ background: `url(${tradeInBg}) right center / cover no-repeat #131417` }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg,rgba(19,20,23,.6) 0%,rgba(19,20,23,.95) 55%) , linear-gradient(90deg,rgba(19,20,23,.95) 0%,rgba(19,20,23,.7) 45%,rgba(19,20,23,0) 75%)',
            }}
          />
          <div className="flex-1 relative">
            <h3 className="text-xl sm:text-[26px] font-bold">Get a Trade-in Estimate</h3>
            <p className="text-gray-300 sm:text-gray-400 text-sm mt-2">Find out the value of your current vehicle.</p>
            <div className="flex flex-col gap-3.5 mt-6.5">
              {tradeChecks.map((c) => (
                <div key={c} className="flex items-center gap-2.5 text-sm text-gray-200 sm:text-gray-300">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E5C06A" strokeWidth="2" className="shrink-0">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
                  </svg>
                  {c}
                </div>
              ))}
            </div>
            <div className="inline-flex items-center border border-white/15 rounded-[14px] px-5.5 py-3 min-h-11 text-[13px] font-semibold mt-6.5 cursor-pointer hover:border-[#E5C06A]/50 hover:text-[#E5C06A] transition-colors">
              Get Your Estimate
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-[110px]">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-[38px] font-bold">
          Why Choose Sudesh <span className="text-[#E5C06A]">Enterprises?</span>
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-[15px] mt-3">We go the extra mile for you.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-4.5 mt-8 sm:mt-11">
          {whyUs.map((w) => (
            <div
              key={w.title}
              className="bg-[#131417] border border-white/8 rounded-[20px] px-4 sm:px-5 py-5 sm:py-6 transition-all duration-250 hover:-translate-y-1 hover:border-[#E5C06A]/40"
            >
              <div className="w-[42px] h-[42px] rounded-xl bg-[#E5C06A]/12 flex items-center justify-center text-[#E5C06A] text-lg">
                {w.icon}
              </div>
              <div className="text-[15px] font-bold mt-4">{w.title}</div>
              <div className="text-xs text-gray-400 leading-relaxed mt-2">{w.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-[110px]">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-[38px] font-bold">Trusted by Thousands</h2>
        <p className="text-center text-gray-400 text-sm sm:text-[15px] mt-3">Hear from our happy customers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 mt-8 sm:mt-11">
          {testimonials.map((t) => (
            <div key={t.slot} className="bg-[#131417] border border-white/8 rounded-[20px] px-6 py-6.5">
              <div className="text-[#E5C06A] text-base tracking-[3px]">★★★★★</div>
              <div className="text-sm leading-relaxed text-gray-300 mt-4 sm:min-h-[66px]">"{t.quote}"</div>
              <div className="flex items-center gap-3 mt-4.5">
                <div className="w-[38px] h-[38px] shrink-0">
                  <PlaceholderAvatar />
                </div>
                <div>
                  <div className="text-[13px] font-bold">{t.name}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-7">
          <div className="w-5.5 h-1.5 rounded-full bg-[#E5C06A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#3a3d43]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#3a3d43]" />
        </div>
      </div>

      {/* SHOWROOM CTA */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-[110px]">
        <div className="bg-[#101114] border border-white/8 rounded-[20px] overflow-hidden grid grid-cols-1 md:grid-cols-3">
          <div className="p-6 sm:p-10">
            <h3 className="text-xl sm:text-[22px] font-bold">Visit Our Showroom</h3>
            <p className="text-gray-400 text-[13px] leading-relaxed mt-4">
              No. 45, Negombo Road,
              <br />
              Nittambuwa, Sri Lanka.
            </p>
            <p className="text-gray-400 text-[13px] leading-relaxed mt-4">
              Mon - Sat: 8.30 AM - 6.00 PM
              <br />
              Sunday: 9.00 AM - 2.00 PM
            </p>
            <div className="inline-flex items-center gap-2 border border-white/15 rounded-xl px-4.5 py-2.5 min-h-11 text-xs font-semibold mt-5.5 cursor-pointer hover:border-[#E5C06A]/50 hover:text-[#E5C06A] transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Get Directions
            </div>
          </div>
          <div
            className="relative md:col-span-2 border-t md:border-t-0 md:border-l border-white/6 min-h-[220px] sm:min-h-[260px]"
            style={{ background: `url(${sudeshBg}) right center / cover no-repeat #0d0e11` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg,rgba(13,14,17,.5) 0%,rgba(13,14,17,.92) 60%), linear-gradient(90deg,rgba(13,14,17,.95) 0%,rgba(13,14,17,.7) 40%,rgba(13,14,17,0) 70%)',
              }}
            />
            <div className="relative p-6 sm:p-10">
              <h3 className="text-xl sm:text-[22px] font-bold">Let's Find Your Dream Car</h3>
              <p className="text-[#C7CBD1] text-[13px] leading-relaxed mt-4">
                Connect with us on WhatsApp
                <br />
                for instant support.
              </p>
              <WhatsAppButton variant="solid" className="mt-6.5" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
