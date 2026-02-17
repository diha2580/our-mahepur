import React, { useEffect, useState } from 'react';
import { GraduationCap, MapPin, Phone, Search, Building, BookOpen, School, ArrowLeft } from 'lucide-react';
import { getPortalData } from '../lib/store';
import { formatPhoneForDialer } from '../lib/utils';

interface EducationProps {
  onBack: () => void;
}

const Education: React.FC<EducationProps> = ({ onBack }) => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const data = getPortalData();
    if (data && data.educationData) {
      setInstitutions(data.educationData);
    }
  }, []);

  const filtered = institutions.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in slide-in-from-right duration-500 pb-16">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-indigo-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        ফিরে যান
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 flex items-center gap-3">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              < GraduationCap className="w-8 h-8 text-indigo-600" />
            </div>
            শিক্ষা প্রতিষ্ঠান ডিরেক্টরি
          </h2>
          <p className="text-gray-500 font-medium mt-1">জেলার স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের তথ্য</p>
        </div>
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
          <input type="text" placeholder="প্রতিষ্ঠানের নাম খুঁজুন..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-100 transition-all w-full text-black" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all p-8 flex flex-col group">
            <div className="flex items-start justify-between mb-6">
               <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-600 transition-all">
                  {item.type === 'University' ? <Building className="w-8 h-8 text-indigo-600 group-hover:text-white" /> : 
                   item.type === 'College' ? <BookOpen className="w-8 h-8 text-indigo-600 group-hover:text-white" /> : 
                   <School className="w-8 h-8 text-indigo-600 group-hover:text-white" />}
               </div>
               <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{item.type}</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">{item.name}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start"><MapPin className="w-4 h-4 text-gray-400 mr-2 mt-1" /><span className="text-sm font-medium text-gray-600">{item.location}</span></div>
              <a href={`tel:${formatPhoneForDialer(item.phone)}`} className="flex items-center text-indigo-600 font-bold hover:underline"><Phone className="w-4 h-4 mr-2" /><span>{item.phone}</span></a>
            </div>
            <button className="mt-auto w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all">বিস্তারিত প্রোফাইল</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;