import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md h-16' : 'bg-white h-20'}`}>
      <div className="container-custom h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <img src={logo} alt="Values Vruksha" className="h-9 sm:h-12 w-auto object-contain" />
          <div>
            <p className="font-heading font-bold text-primary text-sm sm:text-lg leading-tight">Values Vruksha</p>
            <p className="text-[10px] sm:text-xs text-gray-400 leading-tight">Private Limited</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`relative text-sm font-medium transition-colors pb-1 ${
                  location.pathname === link.path
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                    : 'text-gray-600 hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="btn btn-primary text-sm px-5 py-2.5">
            Book Consultation
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 text-secondary" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <ul className="container-custom py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="mt-2 px-4">
            <Link to="/contact" className="block w-full text-center btn btn-primary text-sm py-3">Book Consultation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
