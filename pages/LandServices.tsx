import React from 'react';
import { Map, ArrowRight, MousePointer2, Info, Landmark, Layers } from 'lucide-react';
import { getPortalData } from '../lib/store';

const LandServices: React.FC = () => {
  const data = getPortalData();
  const services = data?.landServices || [];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="bg-amber-600 p-10 rounded-3xl text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">ডিজিটাল ভূমি সেবা পোর্টাল</h2>
          <p className="opacity-90 font-medium">নামজারি আবেদন, খতিয়ান অনুসন্ধান এবং ভূমি উন্নয়ন কর এখন ঘরে বসেই সম্পাদন করুন। দালালের হয়রানি মুক্ত আধুনিক ভূমি সেবা।</p>
        </div>
        <Map className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((app: any) => (
          <a 
            key={app.id} 
            href={app.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-amber-200 group transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                 <Landmark className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </div>
            
            <h3 className="text-xl font-black text-gray-800 mb-2">{app.title}</h3>
            <p className="text-sm text-gray-500 font-medium mb-4">{app.desc}</p>
            
            <div className="mt-auto flex items-center text-xs font-black uppercase tracking-widest text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
               লিংকে প্রবেশ করুন
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-12 bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
         <div className="flex items-center space-x-6">
            <div className="bg-amber-100 text-amber-700 p-5 rounded-full">
               <Layers className="w-8 h-8" />
            </div>
            <div>
               <div className="text-lg font-black text-gray-800">নামজারি আবেদনের গাইডলাইন</div>
               <div className="text-sm text-gray-500 font-medium">আবেদন করার আগে প্রয়োজনীয় ধাপগুলো দেখে নিন।</div>
            </div>
         </div>
         <button className="bg-gray-900 text-white px-8 py-3 rounded-xl text-sm font-black hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200">নির্দেশিকা দেখুন</button>
      </div>
      
      <div className="mt-8 text-center">
         <p className="text-xs text-gray-400 font-medium italic">বি:দ্র: সরকারি পোর্টালে আবেদনের জন্য আপনার এনআইডি ও ফোন নম্বর প্রয়োজন হতে পারে।</p>
      </div>
    </div>
  );
};

export default LandServices;