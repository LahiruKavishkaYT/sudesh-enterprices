import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SudaAiButton, { openSudaChat } from '../components/SudaAiButton';
import WhatsAppButton from '../components/WhatsAppButton';
import { PlaceholderVehicleImage } from '../components/PlaceholderImage';
import { inventoryHeroBadges, inventorySudaSuggestions, inventoryVehicles } from '../data/site';
import heroSuv from '../assets/hero-suv.webp';

const GOLD = '#E5C06A';
const DIM = 'rgba(255,255,255,0.12)';
const PER_PAGE = 9;

const MAKES = ['All Makes', 'Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mitsubishi'];
const BODY_TYPES = ['All', 'SUV', 'Car', 'Van', 'Truck', 'Hatchback'];
const YEAR_OPTIONS = [2016, 2017, 2018, 2019, 2020, 2021, 2022];
const YEAR_TO_OPTIONS = [2018, 2019, 2020, 2021, 2022, 2023];
const MIN_KM_OPTIONS = [20000, 50000, 80000];
const MAX_KM_OPTIONS = [50000, 80000, 120000];
const FUEL_TYPES = ['All Fuel Types', 'Petrol', 'Diesel', 'Hybrid'];
const TRANS_TYPES = ['All Transmissions', 'Automatic', 'Manual'];
const PRICE_CHIPS: [string, number][] = [
  ['Under 5M', 5000000],
  ['5M – 10M', 10000000],
  ['10M – 15M', 15000000],
  ['15M+', 25000000],
];
const CONDITIONS = ['New', 'Used', 'Certified'] as const;

const fmt = (n: number) => n.toLocaleString('en-US');

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [make, setMake] = useState('All Makes');
  const [body, setBody] = useState('All');
  const [maxPrice, setMaxPrice] = useState(25000000);
  const [yearFrom, setYearFrom] = useState('From Year');
  const [yearTo, setYearTo] = useState('To Year');
  const [minKm, setMinKm] = useState('Min Mileage');
  const [maxKm, setMaxKm] = useState('Max Mileage');
  const [fuel, setFuel] = useState('All Fuel Types');
  const [trans, setTrans] = useState('All Transmissions');
  const [cond, setCond] = useState<Record<string, boolean>>({ New: false, Used: false, Certified: false });
  const [sort, setSort] = useState('Sort by: Latest');
  const [page, setPage] = useState(1);
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  const [filtersOpen, setFiltersOpen] = useState(false);

  const set = (fn: () => void) => {
    fn();
    setPage(1);
  };

  const kmVal = (str: string, def: number) => {
    const digits = str.replace(/\D/g, '');
    return digits ? parseInt(digits, 10) : def;
  };

  const filtered = useMemo(() => {
    let list = inventoryVehicles.filter((v) => {
      if (search && !(v.name + ' ' + v.brand + ' ' + v.body).toLowerCase().includes(search.toLowerCase())) return false;
      if (make !== 'All Makes' && v.brand !== make) return false;
      if (body !== 'All' && v.body !== body) return false;
      if (v.price > maxPrice) return false;
      if (yearFrom !== 'From Year' && v.year < +yearFrom) return false;
      if (yearTo !== 'To Year' && v.year > +yearTo) return false;
      if (v.km < kmVal(minKm, 0) || v.km > kmVal(maxKm, Infinity)) return false;
      if (fuel !== 'All Fuel Types' && v.fuel !== fuel) return false;
      if (trans !== 'All Transmissions' && v.trans !== trans) return false;
      const anyCond = cond.New || cond.Used || cond.Certified;
      if (anyCond && !cond[v.cond]) return false;
      return true;
    });
    if (sort === 'Price Low to High') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'Price High to Low') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'Newest') list = [...list].sort((a, b) => b.year - a.year);
    else if (sort === 'Oldest') list = [...list].sort((a, b) => a.year - b.year);
    return list;
  }, [search, make, body, maxPrice, yearFrom, yearTo, minKm, maxKm, fuel, trans, cond, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pages);
  const pageVehicles = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const maxLabel = maxPrice >= 25000000 ? '25M+' : (maxPrice / 1000000).toFixed(1).replace('.0', '') + 'M';
  const empty = filtered.length === 0;

  const resetAll = () => {
    setSearch('');
    setMake('All Makes');
    setBody('All');
    setMaxPrice(25000000);
    setYearFrom('From Year');
    setYearTo('To Year');
    setMinKm('Min Mileage');
    setMaxKm('Max Mileage');
    setFuel('All Fuel Types');
    setTrans('All Transmissions');
    setCond({ New: false, Used: false, Certified: false });
    setPage(1);
  };

  const renderFilters = () => (
    <>
      <div className="flex justify-between items-center">
        <div className="text-base font-bold">Filter Vehicles</div>
        <div onClick={resetAll} className="text-xs text-gray-400 cursor-pointer hover:text-[#E5C06A] py-2 -my-2">
          Reset All
        </div>
      </div>
      <div className="h-px bg-white/8 my-4.5" />

      <div className="text-xs font-semibold text-gray-300 mb-2">Make</div>
      <select value={make} onChange={(e) => set(() => setMake(e.target.value))}>
        {MAKES.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <div className="text-xs font-semibold text-gray-300 mt-4 mb-2">Model</div>
      <select disabled>
        <option>All Models</option>
      </select>

      <div className="text-xs font-semibold text-gray-300 mt-4 mb-2">Body Type</div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {BODY_TYPES.map((label) => {
          const on = body === label;
          return (
            <div
              key={label}
              onClick={() => set(() => setBody(label))}
              className="rounded-[10px] py-2.5 min-h-11 flex items-center justify-center text-[11px] font-semibold text-center cursor-pointer border"
              style={{ borderColor: on ? GOLD : DIM, background: on ? 'rgba(229,192,106,.15)' : 'transparent', color: on ? GOLD : '#9CA3AF' }}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div className="text-xs font-semibold text-gray-300 mt-4.5 mb-2">Price Range</div>
      <div className="flex justify-between text-[11px] text-gray-400">
        <span>Rs. 0</span>
        <span>Rs. {maxLabel}</span>
      </div>
      <input
        type="range"
        min={1000000}
        max={25000000}
        step={250000}
        value={maxPrice}
        onChange={(e) => set(() => setMaxPrice(+e.target.value))}
        className="w-full mt-2.5"
      />
      <div className="flex gap-1.5 mt-2.5 flex-wrap">
        {PRICE_CHIPS.map(([label, val]) => {
          const on = maxPrice === val;
          return (
            <div
              key={label}
              onClick={() => set(() => setMaxPrice(val))}
              className="rounded-full px-2.5 py-1.5 min-h-9 flex items-center text-[10px] font-semibold cursor-pointer border"
              style={{ borderColor: on ? GOLD : DIM, background: on ? 'rgba(229,192,106,.15)' : 'transparent', color: on ? GOLD : '#9CA3AF' }}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div className="text-xs font-semibold text-gray-300 mt-4.5 mb-2">Year</div>
      <div className="grid grid-cols-2 gap-2">
        <select value={yearFrom} onChange={(e) => set(() => setYearFrom(e.target.value))}>
          <option>From Year</option>
          {YEAR_OPTIONS.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
        <select value={yearTo} onChange={(e) => set(() => setYearTo(e.target.value))}>
          <option>To Year</option>
          {YEAR_TO_OPTIONS.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="text-xs font-semibold text-gray-300 mt-4 mb-2">Mileage</div>
      <div className="grid grid-cols-2 gap-2">
        <select value={minKm} onChange={(e) => set(() => setMinKm(e.target.value))}>
          <option>Min Mileage</option>
          {MIN_KM_OPTIONS.map((k) => (
            <option key={k}>{fmt(k)} km</option>
          ))}
        </select>
        <select value={maxKm} onChange={(e) => set(() => setMaxKm(e.target.value))}>
          <option>Max Mileage</option>
          {MAX_KM_OPTIONS.map((k) => (
            <option key={k}>{fmt(k)} km</option>
          ))}
        </select>
      </div>

      <div className="text-xs font-semibold text-gray-300 mt-4 mb-2">Fuel Type</div>
      <select value={fuel} onChange={(e) => set(() => setFuel(e.target.value))}>
        {FUEL_TYPES.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>

      <div className="text-xs font-semibold text-gray-300 mt-4 mb-2">Transmission</div>
      <select value={trans} onChange={(e) => set(() => setTrans(e.target.value))}>
        {TRANS_TYPES.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <div className="text-xs font-semibold text-gray-300 mt-4 mb-2">Drive Type</div>
      <select disabled>
        <option>All Drive Types</option>
      </select>

      <div className="text-xs font-semibold text-gray-300 mt-4 mb-2.5">Condition</div>
      <div className="flex gap-4.5 flex-wrap">
        {CONDITIONS.map((label) => (
          <label key={label} className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={cond[label]}
              onChange={() => set(() => setCond((c) => ({ ...c, [label]: !c[label] })))}
            />
            {label}
          </label>
        ))}
      </div>

      <button
        onClick={() => setFiltersOpen(false)}
        className="w-full bg-[#E5C06A] text-[#101114] font-bold text-[13px] rounded-[14px] py-3.5 min-h-11 text-center mt-5.5 cursor-pointer hover:bg-[#F0D08A] transition-colors"
      >
        Show {filtered.length} Vehicles
      </button>
    </>
  );

  return (
    <div className="bg-[#08090B] overflow-x-hidden">
      <Navbar />

      {/* HERO BANNER */}
      <div className="relative overflow-hidden min-h-[340px] sm:min-h-[380px] lg:h-[420px] flex flex-col">
        <div className="absolute inset-0">
          <img src={heroSuv} alt="Dark SUV hero" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg,rgba(8,9,11,.97) 0%,rgba(8,9,11,.88) 40%,rgba(8,9,11,.25) 75%)' }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-16 sm:h-20 pointer-events-none"
            style={{ background: 'linear-gradient(180deg,transparent,#08090B)' }}
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-11 pb-8 flex-1">
          <div className="text-xs text-gray-400">
            <Link to="/" className="text-gray-400 hover:text-[#E5C06A]">
              Home
            </Link>{' '}
            <span className="mx-1.5 text-gray-600">›</span> <span className="text-[#E5C06A]">Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold mt-4 sm:mt-4.5">Our Inventory</h1>
          <p className="text-[#C7CBD1] text-sm sm:text-[15px] mt-3 sm:mt-3.5 max-w-[480px]">
            Explore our wide selection of quality new and used vehicles.
          </p>
          <div className="flex items-center bg-[#131417]/90 border border-white/10 rounded-[18px] pl-4.5 pr-1.5 py-1.5 w-full max-w-[420px] mt-5 sm:mt-6">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="shrink-0">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              placeholder="Search any make, model, type..."
              value={search}
              onChange={(e) => set(() => setSearch(e.target.value))}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm px-3 py-2"
            />
            <button className="bg-[#E5C06A] text-[#101114] font-bold text-[13px] rounded-[13px] px-5 sm:px-6.5 py-2.5 min-h-11 cursor-pointer hover:bg-[#F0D08A] transition-colors shrink-0">
              Search
            </button>
          </div>
          <div className="flex gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-7.5 flex-wrap">
            {inventoryHeroBadges.map((b) => (
              <div key={b.title} className="flex items-center gap-2.5">
                <b.icon width={18} height={18} stroke="#E5C06A" strokeWidth={1.8} className="shrink-0" />
                <div>
                  <div className="text-[13px] font-bold">{b.title}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INVENTORY SPLIT */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-9 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8 items-start">
        {/* Mobile filter trigger */}
        <button
          onClick={() => setFiltersOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 w-full bg-[#131417] border border-white/10 rounded-[14px] py-3 min-h-11 text-sm font-semibold cursor-pointer hover:border-[#E5C06A]/50 transition-colors"
        >
          <SlidersHorizontal width={16} height={16} className="text-[#E5C06A]" />
          Filter Vehicles
        </button>

        {/* SIDEBAR — desktop */}
        <div className="hidden lg:block sticky top-[76px] bg-[#131417] border border-white/8 rounded-[20px] p-6 max-h-[calc(100vh-100px)] overflow-y-auto">
          {renderFilters()}
        </div>

        {/* SIDEBAR — mobile drawer */}
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] flex justify-end">
            <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
            <div className="relative w-full max-w-[380px] h-full bg-[#131417] border-l border-white/10 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-bold">Filters</div>
                <button
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                  className="w-11 h-11 -mr-2 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
                >
                  <X width={20} height={20} />
                </button>
              </div>
              {renderFilters()}
            </div>
          </div>
        )}

        {/* GRID SIDE */}
        <div>
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="text-lg sm:text-[22px] font-bold">
              <span className="text-[#E5C06A]">{filtered.length}</span> Vehicles Found
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[170px]">
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option>Sort by: Latest</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 mt-6">
            {pageVehicles.map((v) => (
              <div
                key={v.slot}
                className="bg-[#131417] border border-white/8 rounded-[20px] overflow-hidden transition-all duration-250 hover:-translate-y-1 hover:border-[#E5C06A]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,.4)]"
              >
                <div className="relative h-[200px] sm:h-[180px]">
                  {v.img ? (
                    <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                  ) : (
                    <PlaceholderVehicleImage label={`${v.name} photo`} />
                  )}
                  <div className="absolute top-3 left-3 bg-[#E5C06A] text-[#101114] text-[10px] font-extrabold tracking-wider rounded-md px-2.5 py-1.5 pointer-events-none">
                    {v.badge}
                  </div>
                  <div
                    onClick={() => setFavs((f) => ({ ...f, [v.slot]: !f[v.slot] }))}
                    className="absolute top-2.5 right-2.5 w-11 h-11 rounded-full bg-[#08090b]/55 flex items-center justify-center cursor-pointer"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill={favs[v.slot] ? GOLD : 'none'}
                      stroke={favs[v.slot] ? GOLD : '#D1D5DB'}
                      strokeWidth="1.8"
                    >
                      <path d="M12 21s-7.5-4.8-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9z" />
                    </svg>
                  </div>
                </div>
                <div className="px-4.5 pb-4.5 pt-4">
                  <div className="text-base font-bold truncate">{v.name}</div>
                  <div className="text-xs text-gray-400 mt-1.5">
                    {v.year} | {v.fuel} | {v.trans}
                  </div>
                  <div className="flex justify-between items-center mt-3 gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                      {fmt(v.km)} km
                    </div>
                    <div className="text-[15px] font-extrabold truncate">Rs. {fmt(v.price)}</div>
                  </div>
                  <div className="flex gap-2.5 mt-3.5">
                    <div className="flex-1 bg-[#E5C06A] text-[#101114] font-bold text-xs rounded-[11px] py-2.5 min-h-11 flex items-center justify-center text-center cursor-pointer hover:bg-[#F0D08A] transition-colors">
                      View Details
                    </div>
                    <a
                      href="https://wa.me/94771234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 min-h-11 border border-white/15 rounded-[11px] flex items-center justify-center cursor-pointer hover:border-[#E5C06A]/50 transition-colors shrink-0"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E5C06A" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {empty && (
            <div className="text-center text-gray-400 text-sm py-15">
              No vehicles match your filters.{' '}
              <span onClick={resetAll} className="text-[#E5C06A] cursor-pointer">
                Reset all
              </span>
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex flex-wrap justify-center gap-2 mt-9">
            <div
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-11 h-11 border border-white/12 rounded-[10px] flex items-center justify-center cursor-pointer text-gray-400 hover:border-[#E5C06A]/50 hover:text-[#E5C06A] transition-colors"
            >
              ‹
            </div>
            {Array.from({ length: pages }, (_, i) => {
              const on = currentPage === i + 1;
              return (
                <div
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[13px] font-bold cursor-pointer border"
                  style={{ borderColor: on ? GOLD : DIM, background: on ? GOLD : 'transparent', color: on ? '#101114' : '#9CA3AF' }}
                >
                  {i + 1}
                </div>
              );
            })}
            <div
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="w-11 h-11 border border-white/12 rounded-[10px] flex items-center justify-center cursor-pointer text-gray-400 hover:border-[#E5C06A]/50 hover:text-[#E5C06A] transition-colors"
            >
              ›
            </div>
          </div>
        </div>
      </div>

      {/* AI CTA */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-[70px]">
        <div className="bg-gradient-to-br from-[#131417] to-[#0d0e11] border border-white/8 rounded-[20px] flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-8 px-5 sm:px-9 py-6 sm:py-7">
          <div className="w-full h-32 xl:w-[110px] xl:h-[110px] shrink-0 rounded-2xl overflow-hidden">
            <PlaceholderVehicleImage label="Suda AI" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-lg sm:text-xl font-bold">Can't find what you're looking for?</div>
            <div className="text-gray-400 text-[13px] leading-relaxed mt-2 max-w-[380px]">
              Let Suda AI help you find the perfect vehicle that matches your needs and budget.
            </div>
          </div>
          <div className="flex gap-2.5 flex-wrap xl:justify-end min-w-0 xl:max-w-[440px]">
            {inventorySudaSuggestions.map((s) => (
              <button
                key={s}
                onClick={openSudaChat}
                className="border border-white/12 rounded-full px-4.5 py-2.5 min-h-11 text-xs text-gray-300 cursor-pointer bg-white/[.02] hover:border-[#E5C06A]/50 hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <SudaAiButton className="shrink-0 w-full xl:w-auto justify-center" />
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-[70px]">
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
          <div className="p-6 sm:p-10 border-t md:border-t-0 md:border-l border-white/6">
            <h3 className="text-xl sm:text-[22px] font-bold">Need Help?</h3>
            <p className="text-gray-400 text-[13px] leading-relaxed mt-4">Our team is here to assist you.</p>
            <div className="flex items-center gap-2 text-[13px] text-gray-300 mt-4">
              <span className="text-[#E5C06A]">✆</span> 077 123 4567
            </div>
            <div className="flex items-center gap-2 text-[13px] text-gray-300 mt-2.5">
              <span className="text-[#E5C06A]">✉</span> info@sudeshenterprises.lk
            </div>
            <WhatsAppButton variant="solid" className="mt-5.5" />
          </div>
          <div className="relative min-h-[200px] md:min-h-[260px] border-t md:border-t-0 border-white/6">
            <PlaceholderVehicleImage label="Dealership showroom photo at night" />
          </div>
        </div>
      </div>

      <Footer marginTop="mt-12 sm:mt-[70px]" />
    </div>
  );
}
