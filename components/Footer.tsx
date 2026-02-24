import React from 'react';
import { Code2, Heart } from 'lucide-react';

interface FooterProps {
  onShowDev?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowDev }) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-800 pb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-500">পরিকল্পনা ও বাস্তবায়নে</h3>
            <p className="text-sm text-gray-400">
              Our Mahespur Group ও NS Marketing Agency <br />
              যেকোনো প্রয়োজনে আমাদের ইমেইল করুন অথবা কল করুন।
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-500">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">জাতীয় তথ্য বাতায়ন</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ই-নামজারি আবেদন</a></li>
              <li><a href="#" className="hover:text-white transition-colors">পাসপোর্ট আবেদন</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-500">যোগাযোগ</h3>
            <p className="text-sm text-gray-400">
              ইমেইল: info@moheshpur.gov.bd <br />
              হেল্পলাইন: 01953800351 (জরুরি)
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500 order-2 md:order-1">
            &copy; {new Date().getFullYear()} Our Mahespur। সর্বস্বত্ব সংরক্ষিত।
          </div>
          
          <div className="order-1 md:order-2">
            <button 
              onClick={onShowDev}
              aria-label="ডেভেলপার তথ্য দেখুন"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-green-900/30 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-green-400 border border-gray-700 hover:border-green-800 transition-all group"
            >
              <Code2 className="w-3.5 h-3.5" />
              Developed with <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse inline mx-0.5" /> by 
              <span className="text-gray-300 group-hover:text-white">Nahian Nafiz</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;