import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, PlayCircle, GraduationCap, ShieldCheck } from 'lucide-react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { TRAINING_PROGRAMS } from '../../data/content';

const whyTraining = [
  { icon: BookOpen, title: 'Industry-Oriented Curriculum' },
  { icon: PlayCircle, title: 'Practical Hands-on Sessions' },
  { icon: GraduationCap, title: 'Expert Trainers' },
  { icon: Award, title: 'Certification' },
  { icon: ShieldCheck, title: 'Placement Assistance' },
  { icon: BookOpen, title: 'Live Business Case Studies' },
];

const TrainingPage = () => (
  <>
    {/* Hero */}
    <section
      className="relative py-32 sm:py-40 text-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80')`,
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
          Skill Development
        </p>
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 leading-tight">
          Training Programs
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Industry-oriented programs bridging academia and professional careers.
        </p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
      />
    </section>

    {/* Why Our Training */}
    <section className="section" style={{ background: '#ffffff' }}>
      <div className="container-custom">
        <SectionHeader title="Why Train With Us?" subtitle="Our Approach" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {whyTraining.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="glass-card p-6 text-center group">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.04))',
                    border: '1px solid rgba(16,185,129,0.2)',
                  }}
                >
                  <item.icon size={30} className="text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="font-heading font-semibold text-secondary text-sm leading-snug">{item.title}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Programs */}
    <section className="section" style={{ background: '#f0fdf9' }}>
      <div className="container-custom">
        <SectionHeader title="All Training Programs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRAINING_PROGRAMS.map((program, i) => (
            <Reveal key={i} delay={(i % 6) * 0.07}>
              <div className="glass-card p-6 flex flex-col group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))',
                    border: '1px solid rgba(16,185,129,0.2)',
                  }}
                >
                  <BookOpen size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-secondary mb-5 flex-1 leading-snug">{program}</h3>
                <Link to="/contact" className="btn btn-outline text-sm py-2.5 w-full text-center">
                  Enquire Now
                </Link>
              </div>
            </Reveal>
          ))}
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
        <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to start your journey?</h2>
        <Link to="/contact" className="btn gap-2 mt-2" style={{ background: '#10b981', color: 'white', boxShadow: '0 4px 20px rgba(16,185,129,0.4)' }}>
          Get in Touch <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  </>
);

export default TrainingPage;
