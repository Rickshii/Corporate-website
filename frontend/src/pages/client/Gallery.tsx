import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Reveal } from '../../components/ui/Reveal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ClientGallery = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // Helper to resolve absolute vs relative uploads URL
  const getFullImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${API_URL}${url}`;
  };
  
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_URL}/api/gallery`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setGallery(data);
        }
      } catch (err) {
        console.error('Error fetching client gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ['All', ...Array.from(new Set(gallery.map(item => item.category).filter(Boolean)))];

  const filteredGallery = filter === 'All' ? gallery : gallery.filter(item => item.category === filter);

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-6">Our Gallery</h1>
            <p className="text-gray-600 text-lg">
              Explore moments from our training programs, corporate events, and impactful sessions that define the Values Vruksha experience.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={40} className="animate-spin text-primary" />
          </div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No images available at the moment. Check back soon!</p>
          </div>
        ) : (
          <>
            {categories.length > 1 && (
              <Reveal delay={0.1}>
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFilter(cat as string)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        filter === cat 
                          ? 'bg-primary text-white shadow-md shadow-primary/20' 
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Reveal>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredGallery.map((item, idx) => (
                <Reveal key={item._id || item.id} delay={idx * 0.1}>
                  <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                      <img 
                        src={getFullImageUrl(item.imageUrl)} 
                        alt={item.title || 'Gallery Image'} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <h3 className="text-white font-heading font-semibold text-lg">{item.title}</h3>
                          {item.category && <p className="text-white/80 text-sm mt-1">{item.category}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientGallery;

