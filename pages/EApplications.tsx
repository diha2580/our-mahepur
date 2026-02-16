
import React from 'react';
import { FileText, ArrowRight, MousePointer2, Info } from 'lucide-react';
import { eApplications } from '../data';

const EApplications: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="bg-teal-600 p-10 rounded-3xl text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">অনলাইন ই-আবেদন পোর্টাল</h2>
          <p className="opacity-90">এখন থেকে যেকোনো সনদের জন্য আবেদন করুন সরাসরি আপনার স্মার্টফোন থেকে। কোনো লাইনে দাঁড়ানোর প্রয়োজন নেই।</p>
        </div>
        <FileText className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eApplications.map((app) => (
          <a 
            key={app.id} 
            href={app.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 group transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-teal-50 text-teal-600 p-3 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
                 <MousePointer2 className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-800">{app.title}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
          </a>
        ))}
      </div>
      
      <div className="mt-12 bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-full">
               <Info className="w-6 h-6" />
            </div>
            <div className="text-sm">
               <div className="font-bold text-gray-800">আবেদনের আগে যা জানতে হবে?</div>
               <div className="text-gray-500">প্রয়োজনীয় কাগজপত্র স্ক্যান করে রাখুন।</div>
            </div>
         </div>
         <button className="bg-gray-100 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">গাইড দেখুন</button>
      </div>
    </div>
  );
};

export default EApplications;
