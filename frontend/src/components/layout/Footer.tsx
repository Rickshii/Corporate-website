import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../../assets/compy logo.jpeg';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="container-custom py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Values Vruksha" className="h-12 w-auto object-contain bg-white rounded-lg p-1" />
            <span className="font-heading font-bold text-white text-lg">Values Vruksha</span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">Empowering businesses with reliable financial solutions and bridging academia with industry since 2018.</p>
          <div className="flex gap-3 mt-5">
            {['Fb', 'In', 'Tw', 'Ig'].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center text-xs font-bold transition-colors">{s}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Training', '/training'], ['Placement', '/placement'], ['Contact', '/contact']].map(([name, path]) => (
              <li key={path}><Link to={path} className="hover:text-primary transition-colors">{name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm">
            {['Accounting & Bookkeeping', 'GST Services', 'Income Tax Services', 'Company & Secretarial', 'Payroll & HR Compliance', 'Virtual CFO Services'].map((s) => (
              <li key={s}><Link to="/services" className="hover:text-primary transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><MapPin size={18} className="text-primary shrink-0 mt-0.5" /><span>PAN India — serving clients across all states</span></li>
            <li className="flex gap-3"><Phone size={18} className="text-primary shrink-0 mt-0.5" /><a href="tel:+917667333698" className="hover:text-primary">+91 76673 33698</a></li>
            <li className="flex gap-3"><Mail size={18} className="text-primary shrink-0 mt-0.5" /><a href="mailto:valuesvruksha@gmail.com" className="hover:text-primary">valuesvruksha@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 py-5">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Values Vruksha Private Limited. All rights reserved.</p>
        <a href="/admin/login" className="hover:text-gray-300 transition-colors text-xs">Admin Login</a>
      </div>
    </div>
  </footer>
);

export default Footer;
