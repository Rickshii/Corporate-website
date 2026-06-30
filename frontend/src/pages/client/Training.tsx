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
    <section className="bg-gradient-to-br from-secondary to-secondary/80 py-20 text-center text-white">
      <div className="container-custom">
        <p className="text-teal-300 text-sm font-heading font-medium uppercase tracking-widest mb-3">Skill Development</p>
        <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Training Programs</h1>
        <p className="text-lg text-teal-100 max-w-xl mx-auto">Industry-oriented programs bridging academia and professional careers.</p>
      </div>
    </section>

    {/* Why Our Training */}
    <section className="section bg-white">
      <div className="container-custom">
        <SectionHeader title="Why Train With Us?" subtitle="Our Approach" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {whyTraining.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="glass-card p-6 text-center">
                <item.icon size={36} className="text-primary mx-auto mb-3" />
                <h4 className="font-heading font-semibold text-secondary text-sm">{item.title}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Programs */}
    <section className="section bg-bg-light">
      <div className="container-custom">
        <SectionHeader title="All Training Programs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRAINING_PROGRAMS.map((program, i) => (
            <Reveal key={i} delay={(i % 6) * 0.07}>
              <div className="glass-card p-6 flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <BookOpen size={20} className="text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-secondary mb-4 flex-1">{program}</h3>
                <Link to="/contact" className="btn btn-outline text-sm py-2 w-full text-center">
                  Enquire Now
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-primary text-center text-white">
      <div className="container-custom">
        <h2 className="text-3xl font-heading font-bold mb-4">Ready to start your journey?</h2>
        <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-50 gap-2 mt-2">
          Get in Touch <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  </>
);

export default TrainingPage;
