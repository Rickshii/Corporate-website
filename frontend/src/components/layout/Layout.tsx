import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { WhatsAppButton, BackToTop } from './FloatingActions';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pt-20">{children}</main>
    <Footer />
    <WhatsAppButton />
    <BackToTop />
  </div>
);

export default Layout;
