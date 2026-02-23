import React from 'react';
import { History as HistoryIcon, Landmark, ArrowLeft, Calendar, ShieldCheck, MapPin } from 'lucide-react';

interface HistoryProps {
  data: any;
  onBack: () => void;
}

const History: React.FC<HistoryProps> = ({ data, onBack }) => {
  if (!data) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-700 pb-20">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition-colors group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-green-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        ফিরে যান
      </button>

      {/* Hero Section */}
      <section className="relative rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1590050752117-23a9d7f668ad?auto=format&fit=crop&q=80&w=1200" 
          alt="Historical Moheshpur" 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
           <div className="bg-green-500/20 backdrop-blur-md p-4 rounded-full border border-white/20 mb-6">
              <HistoryIcon className="w-12 h-12 text-green-400" />
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{data.title}</h1>
           <p className="max-w-2xl text-white/90 text-lg font-medium leading-relaxed">{data.description}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Timeline Sidebar */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
                 <Calendar className="w-5 h-5 text-green-600" />
                 ঐতিহাসিক সময়রেখা
              </h3>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-green-100">
                 {data.timeline?.map((item: any, idx: number) => (
                    <div key={idx} className="relative pl-10 group">
                       <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-green-500 z-10 group-hover:scale-125 transition-transform"></div>
                       <div className="text-xs font-black text-green-600 uppercase tracking-widest mb-1">{item.year}</div>
                       <div className="text-gray-900 font-bold leading-tight">{item.event}</div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-green-900 p-8 rounded-[2.5rem] text-white shadow-xl">
              <Landmark className="w-10 h-10 text-green-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">ঐতিহ্যবাহী স্থাপনা</h4>
              <p className="text-sm text-green-100 opacity-80 mb-6">মহেশপুরে ছড়িয়ে ছিটিয়ে আছে অসংখ্য প্রাচীন মন্দির ও মঠ।</p>
              <button className="w-full py-3 bg-green-500 text-white rounded-xl font-black hover:bg-green-400 transition-colors">স্থাপত্য ডিরেক্টরি</button>
           </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-2 space-y-12">
           {data.sections?.map((section: any) => (
              <div key={section.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
                 <div className="flex items-start gap-6">
                    <div className="bg-green-50 p-4 rounded-2xl group-hover:bg-green-600 transition-all">
                       <ShieldCheck className="w-8 h-8 text-green-600 group-hover:text-white" />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-gray-900 mb-4 leading-tight">{section.title}</h2>
                       <p className="text-gray-600 text-lg leading-relaxed font-medium">
                          {section.content}
                       </p>
                    </div>
                 </div>
              </div>
           ))}

           {/* Location Highlight */}
           <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 flex flex-col md:flex-row items-center gap-8">
              <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-200/50">
                 <MapPin className="w-12 h-12 text-blue-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h4 className="text-2xl font-black text-blue-900 mb-2">আপনি কি বর্তমানে মহেশপুরে?</h4>
                 <p className="text-blue-700 font-medium">আপনার নিকটস্থ ঐতিহাসিক স্থানগুলো ম্যাপে দেখে নিন।</p>
              </div>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">ম্যাপ খুলুন</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default History;