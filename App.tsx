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
import LandServices from './pages/LandServices';
import History from './pages/History';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';
import Profile from './pages/Profile';
import DeveloperModal from './components/DeveloperModal';
import { WifiOff, ShieldAlert, RefreshCcw } from 'lucide-react';
import { syncDataToCache } from './lib/cache';
import { initStorage, getCurrentUser, logoutUser, getPortalData, updatePortalData, subscribeToData } from './lib/store';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [user, setUser] = useState<any>(null);
  const [portalData, setPortalData] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);

  useEffect(() => {
    initStorage();
    setUser(getCurrentUser());
    
    // Initial data load
    const initialData = getPortalData();
    setPortalData(initialData);

    // Subscribe to real-time updates from store
    const unsubscribe = subscribeToData((newData) => {
      setIsSyncing(true);
      setPortalData(newData);
      setTimeout(() => setIsSyncing(false), 1000);
    });

    const handleOnline = () => {
      setIsOnline(true);
      syncDataToCache();
    };
    const handleOffline = () => setIsOnline(false);
    
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('storage', handleStorageChange);

    // Simulated "Server Check" for real-time cloud updates
    const syncInterval = setInterval(() => {
      const dataFromStore = getPortalData();
      if (JSON.stringify(dataFromStore) !== JSON.stringify(portalData)) {
        setPortalData(dataFromStore);
      }
    }, 5000);

    if (navigator.onLine) {
      syncDataToCache();
    }

    return () => {
      unsubscribe();
      clearInterval(syncInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [portalData]);

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
  };

  const handleBack = () => setActivePage('home');

  const renderPage = () => {
    if (!portalData) return null;

    if (activePage === 'login' || activePage === 'signup') {
      return (
        <div className="py-10">
          <Auth 
            mode={activePage as any} 
            onSuccess={(u) => {setUser(u); setActivePage('home');}} 
            onSwitch={() => setActivePage(activePage === 'login' ? 'signup' : 'login')} 
            onBack={handleBack}
          />
        </div>
      );
    }

    if (activePage === 'profile') {
      if (!user) {
        setActivePage('login');
        return null;
      }
      return <Profile user={user} onUpdate={handleUserUpdate} onLogout={handleLogout} onBack={handleBack} />;
    }

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
      return <AdminPanel onBack={handleBack} />;
    }

    switch (activePage) {
      case 'home': return <Home onNavigate={setActivePage} />;
      case 'history': return <History data={portalData.historyData} onBack={handleBack} />;
      case 'emergency': return (
        <Emergency 
          user={user} 
          contacts={portalData.emergencyContacts || []} 
          onUpdate={(newContacts) => handleDataUpdate({ ...portalData, emergencyContacts: newContacts })} 
          onBack={handleBack}
        />
      );
      case 'health': return (
        <Health 
          facilities={portalData.healthFacilities || []} 
          onBack={handleBack} 
        />
      );
      case 'directory': return (
        <Directory 
          officials={portalData.districtOfficials || []} 
          onBack={handleBack} 
        />
      );
      case 'land': return <LandServices onBack={handleBack} />;
      case 'tourism': return (
        <TouristPlaces 
          spots={portalData.touristSpots || []} 
          user={user}
          onUpdate={(newSpots) => handleDataUpdate({ ...portalData, touristSpots: newSpots })}
          onBack={handleBack} 
        />
      );
      case 'complaint': return <ComplaintBox onBack={handleBack} />;
      case 'education': return (
        <Education 
          institutions={portalData.educationData || []} 
          onBack={handleBack} 
        />
      );
      case 'eapps': return <EApplications onBack={handleBack} />;
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

      {isSyncing && (
        <div className="fixed top-20 right-4 z-[70] bg-white border border-green-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-right fade-in duration-300">
           <RefreshCcw className="w-4 h-4 text-green-600 animate-spin" />
           <span className="text-xs font-bold text-green-800">তথ্য আপডেট হচ্ছে...</span>
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

      <Footer onShowDev={() => setShowDevModal(true)} />
      
      {showDevModal && <DeveloperModal onClose={() => setShowDevModal(false)} />}
    </div>
  );
};

export default App;