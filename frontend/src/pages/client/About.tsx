import React from 'react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { Link } from 'react-router-dom';

// ── Shared hero background helper ─────────────────────────────────────────────
const PageHero = ({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
}) => (
  <section
    className="relative py-32 sm:py-40 text-center overflow-hidden"
    style={{
      backgroundImage: `url('${image}')`,
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
      <p
        className="text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-4"
        style={{ color: '#34d399' }}
      >
        {eyebrow}
      </p>
      <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
        {subtitle}
      </p>
    </div>
    <div
      className="absolute bottom-0 left-0 right-0 h-20"
      style={{ background: 'linear-gradient(to bottom, transparent, #f0fdf9)' }}
    />
  </section>
);

const About = () => (
  <>
    <PageHero
      eyebrow="Our Story"
      title="About Values Vruksha"
      subtitle="A trusted consulting and training partner established in 2018."
      image="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1920&q=80"
    />

    {/* Overview */}
    <section className="section" style={{ background: '#ffffff' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <SectionHeader title="Who We Are" center={false} />
            <p className="leading-relaxed mb-4" style={{ color: '#64748b' }}>
              Values Vruksha Private Limited is a professionally managed consulting and training organization established in 2018. We provide Accounting, Taxation, Compliance, Business Advisory, Virtual CFO, Training & Development, and Placement Services across India.
            </p>
            <p className="leading-relaxed" style={{ color: '#64748b' }}>
              Our mission is to empower businesses with reliable financial solutions while bridging the gap between academia and industry through practical skill development and career-focused training.
            </p>
            <Link to="/contact" className="btn btn-primary gap-2 mt-8">
              Book a Consultation
            </Link>
          </Reveal>

          <Reveal direction="right">
            <div className="space-y-5">
              <div
                className="glass-card p-8"
                style={{ borderLeft: '4px solid #10b981' }}
              >
                <h3 className="text-xl font-heading font-semibold mb-3" style={{ color: '#10b981' }}>
                  Our Vision
                </h3>
                <p style={{ color: '#64748b' }}>
                  To become India's most trusted partner for business consulting, compliance management, skill development, and professional excellence.
                </p>
              </div>
              <div
                className="glass-card p-8"
                style={{ borderLeft: '4px solid #0f1f4d' }}
              >
                <h3 className="text-xl font-heading font-semibold text-secondary mb-4">Our Mission</h3>
                <ul className="space-y-2.5 text-sm" style={{ color: '#64748b' }}>
                  {[
                    'Deliver value-driven financial and business consulting services.',
                    'Enable organizations to achieve statutory compliance with confidence.',
                    'Equip students with industry-relevant skills for successful careers.',
                    'Foster innovation, integrity, and continuous learning.',
                  ].map((m) => (
                    <li key={m} className="flex gap-2.5">
                      <span className="text-primary font-bold shrink-0 mt-0.5">✓</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* Achievements */}
    <section className="section" style={{ background: '#f0fdf9' }}>
      <div className="container-custom">
        <SectionHeader title="Our Achievements" subtitle="Milestones" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Established in 2018',
            '20+ Academic Institution MoUs',
            '10,000+ Students Successfully Trained',
            '100+ Business Clients',
            'PAN India Service Network',
            'Industry-Aligned Skill Development',
          ].map((a, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="glass-card p-6 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}
                >
                  ✓
                </div>
                <p className="font-semibold font-heading" style={{ color: '#1e293b' }}>{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
