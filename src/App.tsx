import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DiccionarioChapa } from './components/DiccionarioChapa';
import { Amenities } from './components/Amenities';
import { GalleryStrip } from './components/GalleryStrip';
import { Reviews } from './components/Reviews';
import { ContactForm } from './components/ContactForm';
import { FaqSection } from './components/FaqSection';
import { LocationMap } from './components/LocationMap';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { AdminScreen } from './components/AdminScreen';
import { Footer } from './components/Footer';
import {
  getStoredBlockedDates,
  getAdminAuthStatus,
  setAdminAuthStatus,
  BlockedDate,
} from './utils/calendarStorage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [selectedDateForForm, setSelectedDateForForm] = useState<string>('');

  // Initialize stored dates and admin status
  useEffect(() => {
    setBlockedDates(getStoredBlockedDates());
    setIsAdmin(getAdminAuthStatus());

    // Always start on the public home landing page, clearing any previous #admin hash
    setCurrentView('home');
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleRefreshDates = () => {
    setBlockedDates(getStoredBlockedDates());
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setAdminAuthStatus(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminAuthStatus(false);
  };

  const handleOpenAdminScreen = () => {
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWebsite = () => {
    setCurrentView('home');
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in admin screen mode, render full-page AdminScreen
  if (currentView === 'admin') {
    return (
      <AdminScreen
        isAdmin={isAdmin}
        blockedDates={blockedDates}
        onLoginSuccess={handleAdminLoginSuccess}
        onLogout={handleAdminLogout}
        onRefreshDates={handleRefreshDates}
        onBackToWebsite={handleBackToWebsite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Navbar onOpenVisitModal={() => setIsVisitModalOpen(true)} />

      {/* Main One-Page Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* 1. Hero Section */}
        <Hero onOpenVisitModal={() => setIsVisitModalOpen(true)} />

        {/* 2. Diccionario CHAPA & Concept */}
        <DiccionarioChapa />

        {/* 3. Installations & Amenities */}
        <Amenities />

        {/* 3.5 Photo Gallery Strip Separator */}
        <GalleryStrip />

        {/* 4. Verified Guest Reviews & Google Rating */}
        <Reviews />

        {/* 5. Contact & Booking Form with Integrated Compact Calendar */}
        <ContactForm
          selectedDate={selectedDateForForm}
          onSelectDate={(date) => setSelectedDateForForm(date)}
          blockedDates={blockedDates}
        />

        {/* 6. Frequently Asked Questions */}
        <FaqSection />

        {/* 7. Location, Google Maps & Directions (Ubicación al final) */}
        <LocationMap />
      </main>

      {/* Footer with imperceptible admin lock */}
      <Footer onOpenAdmin={handleOpenAdminScreen} />

      {/* Floating WhatsApp Widget (Desktop) */}
      <WhatsAppFloating />

      {/* Mobile App-Style Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </div>
  );
}

