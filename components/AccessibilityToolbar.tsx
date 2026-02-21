import React, { useState, useEffect } from 'react';
import { Type, Eye, Volume2, Settings2, X, Sun, Moon, ZoomIn, ZoomOut } from 'lucide-react';

interface AccessibilityToolbarProps {
  onFontSizeChange: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  onContrastToggle: () => void;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  isHighContrast: boolean;
}

const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ 
  onFontSizeChange, 
  onContrastToggle, 
  fontSize, 
  isHighContrast 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 p-8 w-80 animate-in slide-in-from-bottom-8 fade-in duration-500 ease-out">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-600/20">
                <Settings2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 leading-none">অ্যাক্সেসিবিলিটি</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Accessibility Settings</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100/50 rounded-full transition-colors group"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ফন্ট সাইজ</p>
                <div className="flex gap-1">
                  <ZoomOut className="w-3 h-3 text-gray-300" />
                  <ZoomIn className="w-3 h-3 text-gray-300" />
                </div>
              </div>
              <div className="bg-gray-100/50 p-1.5 rounded-2xl grid grid-cols-4 gap-1">
                {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => onFontSizeChange(size)}
                    className={`py-2.5 rounded-xl text-xs font-black transition-all ${
                      fontSize === size 
                        ? 'bg-white text-green-600 shadow-sm scale-[1.02]' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                    aria-label={`ফন্ট সাইজ ${size === 'sm' ? 'ছোট' : size === 'md' ? 'স্বাভাবিক' : size === 'lg' ? 'বড়' : 'অতিরিক্ত বড়'}`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">কালার মোড</p>
              <button
                onClick={onContrastToggle}
                className={`w-full py-4 rounded-2xl font-black flex items-center justify-between px-6 border transition-all duration-300 ${
                  isHighContrast 
                    ? 'bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-900/20' 
                    : 'bg-white border-gray-100 text-gray-700 hover:border-green-200 hover:shadow-lg hover:shadow-green-600/5'
                }`}
                aria-pressed={isHighContrast}
              >
                <div className="flex items-center gap-3">
                  {isHighContrast ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                  <span>{isHighContrast ? 'স্বাভাবিক মোড' : 'হাই কন্ট্রাস্ট মোড'}</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isHighContrast ? 'bg-green-500' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${isHighContrast ? 'left-6' : 'left-1'}`}></div>
                </div>
              </button>
            </div>

            <div className="pt-6 border-t border-gray-100/50">
              <div className="flex items-start gap-3 bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
                <Volume2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-green-800 font-bold leading-relaxed">
                  স্ক্রিন রিডার ব্যবহারের জন্য আপনার ডিভাইসের ডিফল্ট সেটিংস সক্রিয় রাখুন। আমরা ব্রাউজার স্ট্যান্ডার্ড অনুসরণ করি।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-90 ${
          isOpen ? 'bg-red-500 text-white rotate-90' : 'bg-green-600 text-white hover:bg-green-700'
        }`}
        aria-label="অ্যাক্সেসিবিলিটি সেটিংস"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Settings2 className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
