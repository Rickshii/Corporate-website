import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, MessageSquare, UserCheck, Building, Briefcase, GraduationCap } from 'lucide-react';
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
    <section className="bg-gradient-to-br from-secondary to-secondary/80 py-20 text-center text-white">
      <div className="container-custom">
        <p className="text-teal-300 text-sm font-heading font-medium uppercase tracking-widest mb-3">Career Support</p>
        <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Placement Services</h1>
        <p className="text-lg text-teal-100 max-w-xl mx-auto">Connecting skilled professionals with top employers across India.</p>
      </div>
    </section>

    <section className="section bg-white">
      <div className="container-custom">
        <SectionHeader title="How We Help You" subtitle="Placement Support" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEMENT_SERVICES.map((s, i) => {
            const Icon = placementIcons[s] || CheckCircle;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="glass-card p-6 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-secondary">{s}</h3>
                    <p className="text-sm text-gray-500 mt-1">Professional support to help you succeed in your career.</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    <section className="section bg-bg-light">
      <div className="container-custom">
        <SectionHeader title="Industries We Place In" subtitle="Our Network" />
        <div className="flex flex-wrap gap-3 justify-center">
          {INDUSTRIES.map((ind) => (
            <span key={ind} className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-primary hover:text-primary transition-colors shadow-sm">{ind}</span>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/contact" className="btn btn-secondary gap-2">Hire From Us <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  </>
);

export default PlacementPage;
