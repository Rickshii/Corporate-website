import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import logo from '../../assets/compy logo.jpeg';

const Footer = () => (
  <footer style={{ background: 'linear-gradient(135deg, #060d1f 0%, #0f1f4d 60%, #081530 100%)' }}>
    {/* Top accent line */}
    <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, #10b981, #34d399, transparent)' }} />

    <div className="container-custom pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-5">
            <img
              src={logo}
              alt="Values Vruksha"
              className="h-12 w-auto object-contain rounded-xl"
              style={{ background: 'rgba(255,255,255,0.1)', padding: '4px' }}
            />
            <div>
              <p className="font-heading font-bold text-white text-base leading-tight">Values Vruksha</p>
              <p className="text-xs" style={{ color: 'rgba(52,211,153,0.8)' }}>Private Limited</p>
            </div>
          </Link>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Empowering businesses with reliable financial solutions and bridging academia with industry since 2018.
          </p>
          <div className="flex gap-3">
            {[
              { label: 'Fb', href: '#' },
              { label: 'In', href: '#' },
              { label: 'Tw', href: '#' },
              { label: 'Ig', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-heading transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#10b981,#059669)';
                  (e.currentTarget as HTMLElement).style.color = 'white';
                  (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(16,185,129,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-5 flex items-center gap-2">
            <span className="h-4 w-0.5 rounded-full" style={{ background: '#10b981' }} />
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Training', '/training'], ['Placement', '/placement'], ['Contact', '/contact']].map(([name, path]) => (
              <li key={path}>
                <Link
                  to={path}
                  className="flex items-center gap-2 transition-all duration-200 group"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#34d399'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                >
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" style={{ color: '#10b981' }} />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-5 flex items-center gap-2">
            <span className="h-4 w-0.5 rounded-full" style={{ background: '#10b981' }} />
            Our Services
          </h4>
          <ul className="space-y-2.5 text-sm">
            {['Accounting & Bookkeeping', 'GST Services', 'Income Tax Services', 'Company & Secretarial', 'Payroll & HR Compliance', 'Virtual CFO Services'].map((s) => (
              <li key={s}>
                <Link
                  to="/services"
                  className="flex items-center gap-2 transition-all duration-200 group"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#34d399'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                >
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" style={{ color: '#10b981' }} />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-5 flex items-center gap-2">
            <span className="h-4 w-0.5 rounded-full" style={{ background: '#10b981' }} />
            Contact Info
          </h4>
          <ul className="space-y-4 text-sm">
            {[
              { Icon: MapPin, value: 'PAN India — serving clients across all states', href: '#' },
              { Icon: Phone, value: '+91 76673 33698', href: 'tel:+917667333698' },
              { Icon: Mail, value: 'valuesvruksha@gmail.com', href: 'mailto:valuesvruksha@gmail.com' },
            ].map(({ Icon, value, href }, i) => (
              <li key={i}>
                <a
                  href={href}
                  className="flex gap-3 items-start transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#34d399'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    <Icon size={15} style={{ color: '#10b981' }} />
                  </div>
                  <span className="leading-relaxed">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
        <p>© {new Date().getFullYear()} Values Vruksha Private Limited. All rights reserved.</p>
        <a
          href="/admin/login"
          className="transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#34d399'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
        >
          Admin Login
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
