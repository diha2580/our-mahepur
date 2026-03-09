import React from 'react';
import { ArrowLeft } from 'lucide-react';
import NewsSection from '../components/NewsSection';

interface NewsPageProps {
  onBack: () => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-green-50 hover:text-green-600 transition-all active:scale-95"
          aria-label="পিছনে যান"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">সর্বশেষ সংবাদ</h1>
          <p className="text-gray-500 font-bold">মহেশপুর ও বাংলাদেশের সাম্প্রতিক খবর ও আপডেট</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
        <NewsSection />
      </div>
    </div>
  );
};

export default NewsPage;
