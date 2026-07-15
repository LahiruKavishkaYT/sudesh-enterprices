import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import WhatsAppButton from './WhatsAppButton';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Inventory', to: '/inventory' },
  { label: 'Sell/Trade', to: null },
  { label: 'Financing', to: null },
  { label: 'Services', to: null },
  { label: 'About Us', to: null },
  { label: 'Contact', to: null },
];

export default function Navbar({ transparent: _transparent = false }: { transparent?: boolean }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-[#08090b]/90 border-b border-white/8">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-3.5">
        <Link to="/" className="text-white" onClick={() => setMobileOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden lg:flex gap-7 text-sm text-gray-300 items-center">
          {links.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={
                  pathname === link.to
                    ? 'text-[#E5C06A] border-b-2 border-[#E5C06A] pb-1'
                    : 'text-gray-300 hover:text-white transition-colors'
                }
              >
                {link.label}
              </Link>
            ) : (
              <div key={link.label} className="cursor-pointer hover:text-white transition-colors">
                {link.label}
              </div>
            ),
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <WhatsAppButton className="hidden sm:inline-flex" />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer -mr-2"
          >
            {mobileOpen ? <X width={22} height={22} /> : <Menu width={22} height={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/8 bg-[#08090b] px-4 sm:px-6 py-4 flex flex-col gap-1">
          {links.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={
                  'py-3 px-2 rounded-lg text-[15px] ' +
                  (pathname === link.to ? 'text-[#E5C06A] font-semibold bg-white/5' : 'text-gray-300 hover:bg-white/5')
                }
              >
                {link.label}
              </Link>
            ) : (
              <div key={link.label} className="py-3 px-2 rounded-lg text-[15px] text-gray-300 hover:bg-white/5 cursor-pointer">
                {link.label}
              </div>
            ),
          )}
          <WhatsAppButton className="sm:hidden mt-3 justify-center" />
        </div>
      )}
    </div>
  );
}
