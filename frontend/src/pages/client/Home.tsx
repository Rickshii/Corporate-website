import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Calculator, Receipt, Landmark, Building2, Users, Briefcase,
  CheckCircle2, Award, ShieldCheck, MapPin, Laptop, Settings, Layers,
  TrendingUp, Globe, Star
} from 'lucide-react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { SERVICES, STATS, WHY_CHOOSE_US, TRAINING_PROGRAMS, INDUSTRIES } from '../../data/content';

const iconMap: Record<string, React.ElementType> = {
  Calculator, Receipt, Landmark, Building2, Users, Briefcase,
  Award, ShieldCheck, MapPin, Laptop, Settings, Layers
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    className="relative min-h-screen flex items-center overflow-hidden"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Overlay */}
    <div className="hero-overlay-strong" />

    {/* Decorative blob elements */}
    <div
      className="blob"
      style={{
        width: '500px', height: '500px',
        top: '-100px', right: '-100px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.25), transparent 70%)',
        animationDelay: '0s',
      }}
    />
    <div
      className="blob"
      style={{
        width: '350px', height: '350px',
        bottom: '50px', left: '-80px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)',
        animationDelay: '3s',
      }}
    />

    {/* Subtle grid */}
    <div className="absolute inset-0 bg-grid-pattern opacity-30" />

    <div className="container-custom relative z-10 py-32 sm:py-36">
      <div className="max-w-3xl">
        {/* Company name — mobile only */}
        <div className="flex items-center gap-2 mb-5 sm:hidden">
          <p className="font-heading font-bold text-white text-xl leading-tight">Values Vruksha</p>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <p className="text-xs leading-tight font-medium" style={{ color: 'rgba(52,211,153,0.8)' }}>Private Limited</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Eyebrow badge */}
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.35)',
                color: '#34d399',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Star size={12} fill="currentColor" />
              Established 2018 · PAN India
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.05] mb-6"
          >
            Empowering Businesses &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Building Future Professionals
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Trusted consulting, taxation, compliance, and career-focused training —
            delivering value-driven solutions across India since 2018.
          </p>

          {/* CTAs */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-4">
            <Link
              to="/contact"
              className="btn btn-primary gap-2 text-sm sm:text-base px-7 py-3.5 w-full xs:w-auto justify-center"
            >
              Book Consultation <ArrowRight size={18} />
            </Link>
            <Link
              to="/training"
              className="btn btn-ghost text-sm sm:text-base px-7 py-3.5 w-full xs:w-auto justify-center"
            >
              Explore Training
            </Link>
          </div>
        </motion.div>

        {/* Floating trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-wrap gap-4 mt-14"
        >
          {[
            { icon: TrendingUp, text: '100+ Business Clients' },
            { icon: Users, text: '10,000+ Students Trained' },
            { icon: Globe, text: 'PAN India Coverage' },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium font-heading"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Icon size={14} style={{ color: '#10b981' }} />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>

    {/* Bottom wave fade */}
    <div
      className="absolute bottom-0 left-0 right-0 h-24"
      style={{
        background: 'linear-gradient(to bottom, transparent, #f0fdf9)',
      }}
    />
  </section>
);

// ── Stats ─────────────────────────────────────────────────────────────────────
const useCountUp = (end: number, inView: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 2000;
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, end]);
  return count;
};

const StatItem = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const count = useCountUp(value, inView);
  return (
    <div ref={ref} className="stat-card">
      <div
        className="text-4xl sm:text-5xl font-heading font-bold mb-2"
        style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</div>
    </div>
  );
};

const Stats = () => (
  <section
    className="py-20 relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #0f1f4d 0%, #162040 50%, #0a1628 100%)' }}
  >
    {/* Grid pattern */}
    <div className="absolute inset-0 bg-grid-pattern" />
    {/* Emerald glow */}
    <div
      className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)', filter: 'blur(40px)' }}
    />
    <div className="container-custom relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s) => <StatItem key={s.label} label={s.label} value={s.value} suffix={s.suffix} />)}
      </div>
    </div>
  </section>
);

// ── Services ──────────────────────────────────────────────────────────────────
const ServicesSection = () => (
  <section className="section" style={{ background: '#ffffff' }}>
    <div className="container-custom">
      <SectionHeader title="Our Services" subtitle="What We Offer" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => {
          const Icon = iconMap[s.icon] || Briefcase;
          return (
            <Reveal key={s.id} delay={i * 0.07}>
              <div className="glass-card p-8 h-full flex flex-col group">
                <div className="icon-box-emerald mb-6 w-14 h-14 rounded-2xl">
                  <Icon size={26} className="text-primary transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-secondary mb-4">{s.title}</h3>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {s.items.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#64748b' }}>
                      <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                  {s.items.length > 4 && (
                    <li className="text-xs pl-5" style={{ color: '#94a3b8' }}>+{s.items.length - 4} more</li>
                  )}
                </ul>
                <Link
                  to="/services"
                  className="flex items-center gap-2 text-primary font-semibold text-sm font-heading group-hover:gap-3 transition-all duration-300"
                >
                  Learn More <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const WhyUs = () => (
  <section className="section" style={{ background: '#f0fdf9' }}>
    <div className="container-custom">
      <SectionHeader title="Why Choose Values Vruksha" subtitle="Our Strengths" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_CHOOSE_US.map((item, i) => {
          const Icon = iconMap[item.icon] || ShieldCheck;
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className="glass-card p-6 flex gap-4 items-start group"
                style={{ borderLeft: '3px solid rgba(16,185,129,0.3)', paddingLeft: '1.5rem' }}
              >
                <div
                  className="icon-box-navy w-12 h-12 rounded-xl shrink-0"
                  style={{ background: 'rgba(15,31,77,0.06)', border: '1px solid rgba(15,31,77,0.1)' }}
                >
                  <Icon size={22} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-secondary mb-1.5">{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

// ── Training ──────────────────────────────────────────────────────────────────
const TrainingSection = () => (
  <section
    className="section relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #0f1f4d 0%, #162040 60%, #0a1628 100%)' }}
  >
    <div className="absolute inset-0 bg-grid-pattern" />
    <div
      className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)', filter: 'blur(48px)' }}
    />
    <div className="container-custom relative z-10">
      <SectionHeader title="Training Programs" subtitle="Skill Development" light />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRAINING_PROGRAMS.map((program, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="glass-dark px-5 py-4 flex items-center gap-3 cursor-default group">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 group-hover:scale-125"
                style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', boxShadow: '0 0 8px rgba(16,185,129,0.5)' }}
              />
              <p className="text-white font-medium text-sm leading-snug">{program}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/training" className="btn btn-primary px-8 py-3.5 text-sm gap-2">
          View All Programs <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

// ── Industries ────────────────────────────────────────────────────────────────
const Industries = () => (
  <section className="section" style={{ background: '#ffffff' }}>
    <div className="container-custom">
      <SectionHeader title="Industries We Serve" subtitle="Our Reach" />
      <div className="flex flex-wrap gap-3 justify-center">
        {INDUSTRIES.map((ind) => (
          <span
            key={ind}
            className="px-5 py-2.5 rounded-full text-sm font-medium font-heading transition-all duration-300 cursor-default"
            style={{
              background: 'rgba(240,253,249,0.8)',
              border: '1px solid rgba(16,185,129,0.2)',
              color: '#374151',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.1)';
              (e.currentTarget as HTMLElement).style.borderColor = '#10b981';
              (e.currentTarget as HTMLElement).style.color = '#059669';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(16,185,129,0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(240,253,249,0.8)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.2)';
              (e.currentTarget as HTMLElement).style.color = '#374151';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {ind}
          </span>
        ))}
      </div>
    </div>
  </section>
);

// ── Contact CTA ───────────────────────────────────────────────────────────────
const CtaBanner = () => (
  <section
    className="py-24 relative overflow-hidden"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="hero-overlay" />
    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
    {/* Emerald glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.18), transparent 70%)', filter: 'blur(40px)' }}
    />
    <div className="container-custom text-center relative z-10">
      <Reveal>
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}
        >
          <Star size={12} fill="currentColor" />
          Ready to Get Started?
        </span>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-5">
          Ready to grow your business?
        </h2>
        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Get expert consulting, compliance management, and career development support — all under one roof.
        </p>
        <Link
          to="/contact"
          className="btn gap-2"
          style={{
            background: 'white',
            color: '#0f1f4d',
            fontWeight: 700,
            boxShadow: '0 8px 32px rgba(255,255,255,0.2)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#10b981';
            (e.currentTarget as HTMLElement).style.color = 'white';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(16,185,129,0.4)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'white';
            (e.currentTarget as HTMLElement).style.color = '#0f1f4d';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(255,255,255,0.2)';
          }}
        >
          Get in Touch Today <ArrowRight size={18} />
        </Link>
      </Reveal>
    </div>
  </section>
);

// ── Home Page ─────────────────────────────────────────────────────────────────
const Home = () => (
  <>
    <Hero />
    <Stats />
    <ServicesSection />
    <WhyUs />
    <TrainingSection />
    <Industries />
    <CtaBanner />
  </>
);

export default Home;
