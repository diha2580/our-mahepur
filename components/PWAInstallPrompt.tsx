import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle2 } from 'lucide-react';

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
      setIsVisible(false);
      setIsInstalled(true);
      setTimeout(() => setIsInstalled(false), 5000);
    });

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (isInstalled) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom duration-500">
        <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-green-500">
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-bold">অ্যাপটি সফলভাবে ইনস্টল হয়েছে!</span>
        </div>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-96 z-[100] animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-2xl text-green-600">
              <Smartphone className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900 leading-tight">অ্যাপ হিসেবে ব্যবহার করুন</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Install as APK/App</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
            সহজ ও দ্রুত ব্যবহারের জন্য "আমাদের মহেশপুর" অ্যাপটি আপনার মোবাইলে ইনস্টল করে নিন। এটি অফলাইনেও কাজ করবে।
          </p>

          <button 
            onClick={handleInstallClick}
            className="w-full py-4 bg-green-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-xl shadow-green-100 active:scale-95"
          >
            <Download className="w-5 h-5" /> এখনই ইনস্টল করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
