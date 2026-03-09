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
import BloodDonation from './pages/BloodDonation';
import LandServices from './pages/LandServices';
import History from './pages/History';
import Contact from './pages/Contact';
import UnionPorisod from './pages/UnionPorisod';
import NewsPage from './pages/NewsPage';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';
import Profile from './pages/Profile';
import DeveloperModal from './components/DeveloperModal';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import LoadingSkeleton from './components/LoadingSkeleton';
import { WifiOff, ShieldAlert, RefreshCcw } from 'lucide-react';
import { syncDataToCache } from './lib/cache';
import { initStorage, getCurrentUser, logoutUser, getPortalData, updatePortalData, subscribeToData } from './lib/store';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [user, setUser] = useState<any>(null);
  const [portalData, setPortalData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(() => (localStorage.getItem('fontSize') as any) || 'md');
  const [isHighContrast, setIsHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true');

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setActivePage(event.state.page);
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial state if not already set
    if (!window.history.state) {
      window.history.replaceState({ page: 'home' }, '');
    } else if (window.history.state.page) {
      setActivePage(window.history.state.page);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: string) => {
    if (page !== activePage) {
      window.history.pushState({ page }, '');
      setActivePage(page);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('highContrast', String(isHighContrast));
  }, [isHighContrast]);

  useEffect(() => {
    if (portalData?.appIcon) {
      // Update Favicon
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) favicon.setAttribute('href', portalData.appIcon);

      // Dynamic Manifest Update
      const manifest = {
        name: "Our Mahespur",
        short_name: "Our Mahespur",
        description: "মহেশপুর উপজেলার সকল ডিজিটাল সেবা এক জায়গায়।",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#166534",
        icons: [
          {
            src: portalData.appIcon,
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: portalData.appIcon,
            sizes: "512x512",
            type: "image/png"
          }
        ]
      };

      const stringManifest = JSON.stringify(manifest);
      const blob = new Blob([stringManifest], {type: 'application/json'});
      const manifestURL = URL.createObjectURL(blob);
      const manifestElement = document.querySelector('link[rel="manifest"]');
      if (manifestElement) {
        manifestElement.setAttribute('href', manifestURL);
      }
    }
  }, [portalData]);

  useEffect(() => {
    const setup = async () => {
      setIsLoading(true);
      try {
        await initStorage();
        setUser(getCurrentUser());
        
        // Initial data load
        const initialData = getPortalData();
        setPortalData(initialData);
      } finally {
        // Add a slight delay for a smoother transition
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    setup();

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
      setPortalData(getPortalData());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('storage', handleStorageChange);

    // Simulated "Server Check" for real-time cloud updates
    const syncInterval = setInterval(() => {
      const dataFromStore = getPortalData();
      setPortalData((prevData: any) => {
        if (JSON.stringify(dataFromStore) !== JSON.stringify(prevData)) {
          return dataFromStore;
        }
        return prevData;
      });
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
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    handleNavigate('home');
  };

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const handleDataUpdate = async (newData: any) => {
    setPortalData(newData);
    await updatePortalData(newData);
  };

  const handleBack = () => handleNavigate('home');

  const renderPage = () => {
    if (isLoading || !portalData) {
      return <LoadingSkeleton />;
    }

    if (activePage === 'login' || activePage === 'signup') {
      return (
        <div className="py-10">
          <Auth 
            mode={activePage as any} 
            onSuccess={(u) => {setUser(u); handleNavigate('home');}} 
            onSwitch={() => handleNavigate(activePage === 'login' ? 'signup' : 'login')} 
            onBack={handleBack}
          />
        </div>
      );
    }

    if (activePage === 'profile') {
      if (!user) {
        handleNavigate('login');
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
            <button onClick={() => handleNavigate('home')} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold">হোমে ফিরুন</button>
          </div>
        );
      }
      return <AdminPanel onBack={handleBack} />;
    }

    switch (activePage) {
      case 'home': return <Home onNavigate={handleNavigate} />;
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
          pharmacies={portalData.pharmacies || []}
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
      case 'blood': return (
        <BloodDonation 
          donors={portalData.bloodDonors || []} 
          onRegister={(newDonor) => handleDataUpdate({ ...portalData, bloodDonors: [newDonor, ...(portalData.bloodDonors || [])] })}
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
      case 'union': return <UnionPorisod data={portalData.unionData || []} onBack={handleBack} />;
      case 'news': return <NewsPage onBack={handleBack} />;
      case 'contact': return <Contact contactInfo={portalData.contactInfo} onBack={handleBack} />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 font-size-${fontSize} ${isHighContrast ? 'high-contrast' : ''}`}>
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
        onNavigate={handleNavigate} 
        activePage={activePage} 
        isOnline={isOnline} 
        user={user} 
        onLogout={handleLogout} 
        navItems={portalData?.navItems || []} 
        appIcon={portalData?.appIcon}
      />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderPage()}
      </main>

      <Footer onShowDev={() => setShowDevModal(true)} />
      
      {showDevModal && <DeveloperModal onClose={() => setShowDevModal(false)} />}

      <AccessibilityToolbar 
        fontSize={fontSize}
        isHighContrast={isHighContrast}
        onFontSizeChange={setFontSize}
        onContrastToggle={() => setIsHighContrast(!isHighContrast)}
      />

      <PWAInstallPrompt />
    </div>
  );
};

export default App;