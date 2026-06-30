import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Reveal, SectionHeader } from '../../components/ui/Reveal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
      const res = await fetch(`${API_URL}/api/enquiries`, {
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
      <section className="bg-gradient-to-br from-secondary to-secondary/80 py-20 text-center text-white">
        <div className="container-custom">
          <p className="text-teal-300 text-sm font-heading font-medium uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-teal-100 max-w-xl mx-auto">Reach out to our expert team for consultations, enquiries, or any assistance.</p>
        </div>
      </section>

      <section className="section bg-bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <Reveal direction="left">
              <SectionHeader title="We'd love to hear from you" center={false} />
              <p className="text-gray-600 mb-8">Whether you need business consulting, tax advisory, training, or placement support — our team is ready to help.</p>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: 'Phone', value: '+91 76673 33698', href: 'tel:+917667333698' },
                  { icon: Mail, label: 'Email', value: 'valuesvruksha@gmail.com', href: 'mailto:valuesvruksha@gmail.com' },
                  { icon: MapPin, label: 'Serving', value: 'PAN India — all states', href: '#' },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="glass-card p-5 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                      <c.icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{c.label}</p>
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
                  <CheckCircle2 size={64} className="text-primary mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-secondary mb-2">Thank You!</h3>
                  <p className="text-gray-600">We've received your message and will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline mt-6 text-sm">Send Another Message</button>
                </div>
              ) : (
                <div className="glass-card p-8">
                  <h3 className="text-xl font-heading font-bold text-secondary mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <input {...register('name', { required: 'Name is required' })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white" placeholder="Your full name" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                        <input {...register('phone')} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white" placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                      <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white" placeholder="your@email.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                      <input {...register('subject')} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white" placeholder="What can we help you with?" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                      <textarea {...register('message', { required: 'Message is required' })} rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white resize-none" placeholder="Tell us more about your requirements..." />
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
