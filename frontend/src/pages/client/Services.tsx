import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calculator, Receipt, Landmark, Building2, Users, Briefcase } from 'lucide-react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { SERVICES } from '../../data/content';

const iconMap: Record<string, React.ElementType> = { Calculator, Receipt, Landmark, Building2, Users, Briefcase };

const ServicesPage = () => (
  <>
    {/* Hero */}
    <section
      className="relative py-32 sm:py-40 text-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="container-custom relative z-10">
        <p className="text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#34d399' }}>
          What We Offer
        </p>
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 leading-tight">
          Our Services
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Comprehensive financial and business solutions designed for growth.
        </p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #f0fdf9)' }}
      />
    </section>

    {/* Services Grid */}
    <section className="section" style={{ background: '#f0fdf9' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((s, i) => {
            const Icon = iconMap[s.icon] || Briefcase;
            return (
              <Reveal key={s.id} delay={i * 0.07}>
                <div className="glass-card p-8 h-full group">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="icon-box-emerald w-14 h-14 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.05))',
                        border: '1px solid rgba(16,185,129,0.2)',
                      }}
                    >
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-heading font-semibold text-secondary">{s.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.items.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#64748b' }}>
                        <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section
      className="py-20 relative overflow-hidden text-center"
      style={{ background: 'linear-gradient(135deg, #0f1f4d 0%, #162040 100%)' }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)', filter: 'blur(40px)' }}
      />
      <div className="container-custom relative z-10">
        <h2 className="text-3xl font-heading font-bold text-white mb-4">Need a custom solution?</h2>
        <Link to="/contact" className="btn gap-2 mt-2" style={{ background: '#10b981', color: 'white', boxShadow: '0 4px 20px rgba(16,185,129,0.4)' }}>
          Talk to Our Experts <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  </>
);

export default ServicesPage;
