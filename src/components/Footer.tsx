import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { socialIcons } from '../data/site';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Inventory', to: '/inventory' },
  { label: 'Sell/Trade', to: null },
  { label: 'Financing', to: null },
  { label: 'Services', to: null },
  { label: 'About Us', to: null },
  { label: 'Contact', to: null },
];

export default function Footer({ marginTop = 'mt-16 lg:mt-[110px]' }: { marginTop?: string }) {
  const { pathname } = useLocation();

  return (
    <div className={`border-t border-white/8 ${marginTop}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-6.5 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
        <Logo size={24} />
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-400 order-3 lg:order-2">
          {links.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={pathname === link.to ? 'text-[#E5C06A]' : 'hover:text-white transition-colors'}
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
        <div className="text-xs text-gray-500 order-2 lg:order-3">© 2025 Sudesh Enterprises. All rights reserved.</div>
        <div className="flex gap-3.5 text-gray-400 order-4">
          {socialIcons.map((ic, i) => (
            <div
              key={i}
              className="w-9 h-9 border border-white/12 rounded-lg flex items-center justify-center text-xs cursor-pointer hover:border-[#E5C06A]/50 hover:text-[#E5C06A] transition-colors"
            >
              {ic}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
