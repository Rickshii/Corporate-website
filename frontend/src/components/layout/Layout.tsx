import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { WhatsAppButton, BackToTop } from './FloatingActions';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    {/* pt-0 because hero sections on each page already account for the navbar height */}
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppButton />
    <BackToTop />
  </div>
);

export default Layout;
