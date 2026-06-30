import React from 'react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { Link } from 'react-router-dom';

const About = () => (
  <>
    <section className="bg-gradient-to-br from-secondary to-secondary/80 py-20 text-center text-white">
      <div className="container-custom">
        <p className="text-teal-300 text-sm font-heading font-medium uppercase tracking-widest mb-3">Our Story</p>
        <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">About Values Vruksha</h1>
        <p className="text-lg text-teal-100 max-w-xl mx-auto">A trusted consulting and training partner established in 2018.</p>
      </div>
    </section>

    {/* Overview */}
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <SectionHeader title="Who We Are" center={false} />
            <p className="text-gray-600 leading-relaxed mb-4">
              Values Vruksha Private Limited is a professionally managed consulting and training organization established in 2018. We provide Accounting, Taxation, Compliance, Business Advisory, Virtual CFO, Training & Development, and Placement Services across India.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to empower businesses with reliable financial solutions while bridging the gap between academia and industry through practical skill development and career-focused training.
            </p>
            <Link to="/contact" className="btn btn-primary gap-2 mt-8">Book a Consultation</Link>
          </Reveal>

          <Reveal direction="right">
            <div className="space-y-5">
              <div className="glass-card p-8 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Our Vision</h3>
                <p className="text-gray-600">To become India's most trusted partner for business consulting, compliance management, skill development, and professional excellence.</p>
              </div>
              <div className="glass-card p-8 border-l-4 border-secondary">
                <h3 className="text-xl font-heading font-semibold text-secondary mb-4">Our Mission</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {['Deliver value-driven financial and business consulting services.', 'Enable organizations to achieve statutory compliance with confidence.', 'Equip students with industry-relevant skills for successful careers.', 'Foster innovation, integrity, and continuous learning.'].map((m) => (
                    <li key={m} className="flex gap-2"><span className="text-primary font-bold">•</span>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* Achievements */}
    <section className="section bg-bg-light">
      <div className="container-custom">
        <SectionHeader title="Our Achievements" subtitle="Milestones" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Established in 2018', '20+ Academic Institution MoUs', '10,000+ Students Successfully Trained', '100+ Business Clients', 'PAN India Service Network', 'Industry-Aligned Skill Development'].map((a, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="glass-card p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-lg shrink-0">✓</div>
                <p className="font-medium text-gray-800">{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
