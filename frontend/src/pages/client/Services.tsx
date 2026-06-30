import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calculator, Receipt, Landmark, Building2, Users, Briefcase } from 'lucide-react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { SERVICES } from '../../data/content';

const iconMap: Record<string, React.ElementType> = { Calculator, Receipt, Landmark, Building2, Users, Briefcase };

const ServicesPage = () => (
  <>
    {/* Hero */}
    <section className="bg-gradient-to-br from-secondary to-secondary/80 py-20 text-center text-white">
      <div className="container-custom">
        <p className="text-teal-300 text-sm font-heading font-medium uppercase tracking-widest mb-3">What We Offer</p>
        <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Our Services</h1>
        <p className="text-lg text-teal-100 max-w-xl mx-auto">Comprehensive financial and business solutions designed for growth.</p>
      </div>
    </section>

    {/* Services Grid */}
    <section className="section bg-bg-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((s, i) => {
            const Icon = iconMap[s.icon] || Briefcase;
            return (
              <Reveal key={s.id} delay={i * 0.07}>
                <div className="glass-card p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-heading font-semibold text-secondary">{s.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />{item}
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
    <section className="py-16 bg-primary text-center text-white">
      <div className="container-custom">
        <h2 className="text-3xl font-heading font-bold mb-4">Need a custom solution?</h2>
        <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-50 gap-2 mt-2">
          Talk to Our Experts <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  </>
);

export default ServicesPage;
