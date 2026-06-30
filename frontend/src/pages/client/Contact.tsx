import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';
import { API_URL, apiFetch } from '../../config';

type EnquiryForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EnquiryForm>();

  const onSubmit: SubmitHandler<EnquiryForm> = async (data) => {
    try {
      const res = await apiFetch(`${API_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSubmitted(true); reset(); }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-32 sm:py-40 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920&q=80')`,
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
            Get In Touch
          </p>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Reach out to our expert team for consultations, enquiries, or any assistance.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #f0fdf9)' }}
        />
      </section>

      {/* Contact Section */}
      <section className="section" style={{ background: '#f0fdf9' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <Reveal direction="left">
              <SectionHeader title="We'd love to hear from you" center={false} />
              <p className="mb-8 leading-relaxed" style={{ color: '#64748b' }}>
                Whether you need business consulting, tax advisory, training, or placement support — our team is ready to help.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: 'Phone', value: '+91 76673 33698', href: 'tel:+917667333698' },
                  { icon: Mail, label: 'Email', value: 'valuesvruksha@gmail.com', href: 'mailto:valuesvruksha@gmail.com' },
                  { icon: MapPin, label: 'Serving', value: 'PAN India — all states', href: '#' },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    className="glass-card p-5 flex items-center gap-4"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}
                    >
                      <c.icon size={20} color="white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: '#94a3b8' }}>{c.label}</p>
                      <p className="font-semibold text-secondary mt-0.5">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal direction="right">
              {submitted ? (
                <div className="glass-card p-10 flex flex-col items-center justify-center text-center h-full">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))', border: '2px solid rgba(16,185,129,0.3)' }}
                  >
                    <CheckCircle2 size={40} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-secondary mb-2">Thank You!</h3>
                  <p style={{ color: '#64748b' }}>We've received your message and will get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline mt-6 text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="glass-card p-8">
                  <h3 className="text-xl font-heading font-bold text-secondary mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#475569' }}>Full Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          className="input-premium"
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#475569' }}>Phone Number</label>
                        <input
                          {...register('phone')}
                          className="input-premium"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#475569' }}>Email Address *</label>
                      <input
                        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                        className="input-premium"
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#475569' }}>Subject</label>
                      <input
                        {...register('subject')}
                        className="input-premium"
                        placeholder="What can we help you with?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#475569' }}>Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows={5}
                        className="input-premium resize-none"
                        placeholder="Tell us more about your requirements..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary py-3.5 gap-2">
                      {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
