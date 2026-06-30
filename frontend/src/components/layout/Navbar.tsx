import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/compy logo.jpeg';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Training', path: '/training' },
  { name: 'Placement', path: '/placement' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(15, 31, 77, 0.97)'
          : 'rgba(15, 31, 77, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 4px 32px rgba(15,31,77,0.4)' : 'none',
        height: scrolled ? '64px' : '76px',
      }}
    >
      <div className="container-custom h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <div className="relative">
            <img
              src={logo}
              alt="Values Vruksha"
              className="h-9 sm:h-11 w-auto object-contain rounded-xl"
              style={{ filter: 'brightness(1.05)' }}
            />
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 16px rgba(16,185,129,0.5)' }}
            />
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm sm:text-base leading-tight tracking-wide">
              Values Vruksha
            </p>
            <p className="text-[10px] sm:text-[11px] leading-tight" style={{ color: 'rgba(52,211,153,0.8)' }}>
              Private Limited
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="relative px-4 py-2 rounded-full text-sm font-medium font-heading transition-all duration-300"
                  style={{
                    color: isActive ? '#10b981' : 'rgba(255,255,255,0.8)',
                    background: isActive ? 'rgba(16,185,129,0.1)' : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = 'white';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #10b981, #34d399)' }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/contact"
            className="btn btn-primary text-sm px-5 py-2.5"
            style={{ fontSize: '0.825rem' }}
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-xl transition-colors duration-200"
          style={{ color: 'white', background: 'rgba(255,255,255,0.08)' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden absolute w-full transition-all duration-300 overflow-hidden"
        style={{
          background: 'rgba(15, 31, 77, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(16,185,129,0.15)',
          boxShadow: '0 16px 48px rgba(15,31,77,0.5)',
          maxHeight: open ? '480px' : '0',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <ul className="container-custom py-5 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="flex items-center px-4 py-3 rounded-2xl text-sm font-medium font-heading transition-all duration-200"
                  style={{
                    color: isActive ? '#10b981' : 'rgba(255,255,255,0.8)',
                    background: isActive ? 'rgba(16,185,129,0.12)' : 'transparent',
                    borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent',
                  }}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li className="mt-3 px-1 pb-2">
            <Link
              to="/contact"
              className="block w-full text-center btn btn-primary text-sm py-3"
            >
              Book Consultation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
