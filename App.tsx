
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Emergency from './pages/Emergency';
import Health from './pages/Health';
import Directory from './pages/Directory';
import TouristPlaces from './pages/TouristPlaces';
import Education from './pages/Education';
import ComplaintBox from './pages/ComplaintBox';
import EApplications from './pages/EApplications';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';
import Profile from './pages/Profile';
import { WifiOff, ShieldAlert } from 'lucide-react';
import { syncDataToCache } from './lib/cache';
import { initStorage, getCurrentUser, logoutUser, getPortalData, updatePortalData } from './lib/store';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [user, setUser] = useState<any>(null);
  const [portalData, setPortalData] = useState<any>(null);

  const loadPortalConfig = () => {
    const data = getPortalData();
    if (data) {
      setPortalData(data);
    }
  };

  useEffect(() => {
    initStorage();
    setUser(getCurrentUser());
    loadPortalConfig();

    const handleOnline = () => {
      setIsOnline(true);
      syncDataToCache();
    };
    const handleOffline = () => setIsOnline(false);
    
    const handleStorageChange = () => {
      loadPortalConfig();
      setUser(getCurrentUser());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('storage', handleStorageChange);

    if (navigator.onLine) {
      syncDataToCache();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setActivePage('home');
  };

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const handleDataUpdate = (newData: any) => {
    updatePortalData(newData);
    setPortalData(newData);
  };

  const renderPage = () => {
    if (!portalData) return null;

    // Auth screens
    if (activePage === 'login' || activePage === 'signup') {
      return (
        <div className="py-10">
          <Auth 
            mode={activePage as any} 
            onSuccess={(u) => {setUser(u); setActivePage('home');}} 
            onSwitch={() => setActivePage(activePage === 'login' ? 'signup' : 'login')} 
          />
        </div>
      );
    }

    // Profile Screen
    if (activePage === 'profile') {
      if (!user) {
        setActivePage('login');
        return null;
      }
      return <Profile user={user} onUpdate={handleUserUpdate} onLogout={handleLogout} />;
    }

    // Admin protected screen
    if (activePage === 'admin') {
      if (user?.role !== 'admin') {
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="bg-red-100 p-6 rounded-full text-red-600"><ShieldAlert className="w-16 h-16" /></div>
            <h2 className="text-3xl font-bold">অনুমতি নেই</h2>
            <p className="text-gray-500">এই পৃষ্ঠাটি শুধুমাত্র অ্যাডমিনদের জন্য সংরক্ষিত।</p>
            <button onClick={() => setActivePage('home')} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold">হোমে ফিরুন</button>
          </div>
        );
      }
      return <AdminPanel />;
    }

    switch (activePage) {
      case 'home': return <Home onNavigate={setActivePage} />;
      case 'emergency': return (
        <Emergency 
          user={user} 
          contacts={portalData.emergencyContacts || []} 
          onUpdate={(newContacts) => handleDataUpdate({ ...portalData, emergencyContacts: newContacts })} 
        />
      );
      case 'health': return <Health />;
      case 'directory': return <Directory />;
      case 'tourism': return <TouristPlaces />;
      case 'complaint': return <ComplaintBox />;
      case 'education': return <Education />;
      case 'eapps': return <EApplications />;
      default: return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!isOnline && (
        <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top z-[60]">
          <WifiOff className="w-4 h-4" />
          <span>আপনি বর্তমানে অফলাইন আছেন। সংরক্ষিত তথ্য প্রদর্শিত হচ্ছে।</span>
        </div>
      )}

      <Navbar 
        onNavigate={setActivePage} 
        activePage={activePage} 
        isOnline={isOnline} 
        user={user} 
        onLogout={handleLogout} 
        navItems={portalData?.navItems || []} 
      />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
