import React, { useState } from 'react';
import { X, MessageCircle, Facebook, ArrowLeft, Terminal, ShieldCheck } from 'lucide-react';

interface DeveloperModalProps {
  onClose: () => void;
}

const DeveloperModal: React.FC<DeveloperModalProps> = ({ onClose }) => {
  const [imgError, setImgError] = useState(false);

  // Using a direct high-quality anonymous professional man portrait
  const profileImageUrl = "https://i.postimg.cc/vmwM1hkW/IMG-20260131-WA0002-jpg.jpg";
  const fallbackAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Nahian&backgroundColor=b6e3f4";

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-[340px] shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300 overflow-hidden text-black relative">
        
        {/* Compact Navigation */}
        <div className="absolute top-3 left-3 z-20">
          <button 
            onClick={onClose}
            className="p-1.5 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full transition-all border border-white/30"
            title="ফিরে যান"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-1.5 bg-white/20 backdrop-blur-md hover:bg-red-500 rounded-full transition-all border border-white/30 text-white"
          title="বন্ধ করুন"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative">
          {/* Decorative Header */}
          <div className="h-20 bg-gradient-to-br from-green-900 to-green-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Terminal className="w-20 h-20 rotate-12" />
            </div>
          </div>
          
          <div className="px-6 pb-6 text-center -mt-10">
            {/* Enhanced Profile Image System */}
            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-2xl border border-gray-100 mx-auto overflow-hidden group">
                <img 
                  src={imgError ? fallbackAvatar : profileImageUrl} 
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" 
                  alt="Nahian Nafiz" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1 rounded-md shadow-lg border-2 border-white" title="Verified Expert">
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-black text-gray-900 leading-none mb-1">Nahian Nafiz</h2>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[9px] font-black text-green-700 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                  Full-Stack Dev
                </span>
                <span className="text-[9px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  Security Expert
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50/80 p-3 rounded-xl mb-5 border border-gray-100">
              <p className="text-[13px] text-gray-600 font-bold leading-relaxed">
                আমি একজন ডিজিটাল মার্কেটার ও সিকিউরিটি এক্সপার্ট। নাগরিক সেবা ডিজিটালকরণে আমি নিরন্তর কাজ করে যাচ্ছি।
              </p>
            </div>

            {/* Direct Social Access */}
            <div className="flex flex-col gap-2">
              <a 
                href="https://www.facebook.com/fb.sulphuric.acid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl transition-all shadow-md active:scale-95"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span className="text-xs font-black">ফেসবুক প্রোফাইল</span>
              </a>
              <a 
                href="https://wa.me/01928568322" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-black">সরাসরি হোয়াটসঅ্যাপ</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-gray-50/50 py-2.5 text-center border-t border-gray-100">
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Moheshpur ICT Cell &copy; 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperModal;