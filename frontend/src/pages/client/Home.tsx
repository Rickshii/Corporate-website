import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Receipt, Landmark, Building2, Users, Briefcase, CheckCircle2, Award, ShieldCheck, MapPin, Laptop, Settings, Layers } from 'lucide-react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { SERVICES, STATS, WHY_CHOOSE_US, TRAINING_PROGRAMS, INDUSTRIES } from '../../data/content';

const iconMap: Record<string, React.ElementType> = { Calculator, Receipt, Landmark, Building2, Users, Briefcase, Award, ShieldCheck, MapPin, Laptop, Settings, Layers };

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-teal-50 overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />

    <div className="container-custom relative z-10 py-24 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        {/* Company name — mobile only (navbar already shows it on sm+) */}
        <div className="flex items-center gap-2 mb-5 sm:hidden">
          <p className="font-heading font-bold text-primary text-xl leading-tight">Values Vruksha</p>
          <span className="text-gray-300">|</span>
          <p className="text-xs text-gray-400 leading-tight font-medium">Private Limited</p>
        </div>
        <span className="inline-block bg-accent/15 text-accent font-heading font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-5 sm:mb-6">Established 2018 · PAN India</span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-secondary leading-tight mb-4 sm:mb-6">
          Empowering Businesses &amp; Building <span className="text-primary">Future Professionals</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl leading-relaxed">
          Trusted consulting, taxation, compliance, and career-focused training — delivering value-driven solutions across India since 2018.
        </p>
        <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
          <Link to="/contact" className="btn btn-primary gap-2 text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 w-full xs:w-auto justify-center">
            Book Consultation <ArrowRight size={18} />
          </Link>
          <Link to="/training" className="btn btn-outline text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 w-full xs:w-auto justify-center">Explore Training</Link>
        </div>
      </motion.div>
    </div>
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
    <div ref={ref} className="text-center text-white">
      <div className="text-5xl font-heading font-bold mb-2">{count.toLocaleString()}{suffix}</div>
      <div className="text-teal-100 font-medium">{label}</div>
    </div>
  );
};

const Stats = () => (
  <section className="py-20 bg-primary">
    <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-8">
      {STATS.map((s) => <StatItem key={s.label} label={s.label} value={s.value} suffix={s.suffix} />)}
    </div>
  </section>
);

// ── Services ──────────────────────────────────────────────────────────────────
const ServicesSection = () => (
  <section className="section bg-white">
    <div className="container-custom">
      <SectionHeader title="Our Services" subtitle="What We Offer" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => {
          const Icon = iconMap[s.icon] || Briefcase;
          return (
            <Reveal key={s.id} delay={i * 0.07}>
              <div className="glass-card p-8 h-full flex flex-col group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Icon size={30} className="text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-secondary mb-4">{s.title}</h3>
                <ul className="space-y-2 flex-1 mb-6">
                  {s.items.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                  {s.items.length > 4 && <li className="text-xs text-gray-400 pl-5">+{s.items.length - 4} more</li>}
                </ul>
                <Link to="/services" className="flex items-center gap-2 text-primary font-medium text-sm font-heading group-hover:gap-3 transition-all">
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
  <section className="section bg-bg-light">
    <div className="container-custom">
      <SectionHeader title="Why Choose Values Vruksha" subtitle="Our Strengths" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_CHOOSE_US.map((item, i) => {
          const Icon = iconMap[item.icon] || ShieldCheck;
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div className="glass-card p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-secondary mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
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
  <section className="section bg-secondary">
    <div className="container-custom">
      <SectionHeader title="Training Programs" subtitle="Skill Development" light />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRAINING_PROGRAMS.map((program, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl px-5 py-4 flex items-center gap-3 transition-all cursor-default border border-white/10">
              <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <p className="text-white font-medium text-sm">{program}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/training" className="btn bg-accent text-white hover:bg-amber-500 px-8 py-3 text-sm gap-2">
          View All Programs <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

// ── Industries ────────────────────────────────────────────────────────────────
const Industries = () => (
  <section className="section bg-white">
    <div className="container-custom">
      <SectionHeader title="Industries We Serve" subtitle="Our Reach" />
      <div className="flex flex-wrap gap-3 justify-center">
        {INDUSTRIES.map((ind) => (
          <span key={ind} className="px-5 py-2.5 bg-bg-light rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-primary hover:text-primary transition-colors">{ind}</span>
        ))}
      </div>
    </div>
  </section>
);

// ── Contact CTA ───────────────────────────────────────────────────────────────
const CtaBanner = () => (
  <section className="section bg-gradient-to-r from-primary to-secondary">
    <div className="container-custom text-center">
      <Reveal>
        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Ready to grow your business?</h2>
        <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">Get expert consulting, compliance management, and career development support — all under one roof.</p>
        <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-50 text-base px-8 py-3.5 gap-2">
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
