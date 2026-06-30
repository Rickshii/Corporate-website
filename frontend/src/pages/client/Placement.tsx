import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, FileText, MessageSquare,
  UserCheck, Building, Briefcase, GraduationCap
} from 'lucide-react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { PLACEMENT_SERVICES, INDUSTRIES } from '../../data/content';

const placementIcons: Record<string, React.ElementType> = {
  'Campus Recruitment Drives': Building,
  'Resume Building': FileText,
  'Mock Interviews': MessageSquare,
  'Career Counselling': UserCheck,
  'Employer Networking': Briefcase,
  'Internship Opportunities': GraduationCap,
  'Job Placement Assistance': CheckCircle,
};

const PlacementPage = () => (
  <>
    {/* Hero */}
    <section
      className="relative py-32 sm:py-40 text-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')`,
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
          Career Support
        </p>
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 leading-tight">
          Placement Services
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Connecting skilled professionals with top employers across India.
        </p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
      />
    </section>

    {/* How We Help */}
    <section className="section" style={{ background: '#ffffff' }}>
      <div className="container-custom">
        <SectionHeader title="How We Help You" subtitle="Placement Support" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEMENT_SERVICES.map((s, i) => {
            const Icon = placementIcons[s] || CheckCircle;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="glass-card p-6 flex gap-4 items-start group">
                  <div
                    className="icon-box-emerald w-12 h-12 rounded-xl shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))',
                      border: '1px solid rgba(16,185,129,0.2)',
                    }}
                  >
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-secondary mb-1.5">{s}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                      Professional support to help you succeed in your career.
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* Industries */}
    <section className="section" style={{ background: '#f0fdf9' }}>
      <div className="container-custom">
        <SectionHeader title="Industries We Place In" subtitle="Our Network" />
        <div className="flex flex-wrap gap-3 justify-center">
          {INDUSTRIES.map((ind) => (
            <span
              key={ind}
              className="px-5 py-2.5 rounded-full text-sm font-medium font-heading cursor-default transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#374151',
                boxShadow: '0 2px 8px rgba(15,31,77,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = '#10b981';
                (e.currentTarget as HTMLElement).style.color = '#059669';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(16,185,129,0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.2)';
                (e.currentTarget as HTMLElement).style.color = '#374151';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(15,31,77,0.06)';
              }}
            >
              {ind}
            </span>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/contact" className="btn btn-secondary gap-2">
            Hire From Us <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default PlacementPage;
