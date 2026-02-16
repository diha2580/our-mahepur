
import React, { useEffect, useState } from 'react';
import { HeartPulse, MapPin, Phone, Hospital as HospIcon, UserRound, Search, ChevronRight, X } from 'lucide-react';
import { getPortalData } from '../lib/store';
import { formatPhoneForDialer } from '../lib/utils';

const Health: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [facilities, setFacilities] = useState<any[]>([]);

  useEffect(() => {
    const data = getPortalData();
    if (data) setFacilities(data.healthFacilities || []);
  }, []);

  const filteredHospitals = facilities.filter(h => {
    const matchesFilter = filter === 'All' || h.type === filter;
    const matchesSearch = 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      h.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const clearSearch = () => setSearchQuery('');

  return (
    <div className="animate-in slide-in-from-right duration-500 pb-16">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-2xl">
              <HeartPulse className="w-8 h-8 text-green-600" />
            </div>
            স্বাস্থ্য সেবা ডিরেক্টরি
          </h2>
          <p className="text-gray-500 font-medium mt-1">জেলার সকল হাসপাতাল ও ডাক্তারদের তথ্য এক জায়গায়</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar Implementation */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="হাসপাতাল বা এলাকা খুঁজুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-10 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-green-100 transition-all w-full sm:w-64 text-black"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
            {['All', 'Government', 'Private'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filter === type ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {type === 'All' ? 'সব' : type === 'Government' ? 'সরকারি' : 'বেসরকারি'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hospitals Grid */}
      {filteredHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.map((hospital: any) => (
            <div key={hospital.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className={`h-3 ${hospital.type === 'Government' ? 'bg-green-600' : 'bg-blue-600'}`}></div>
              
              <div className="p-8 flex-grow text-black">
                <div className="flex items-start justify-between mb-6">
                   <div className="bg-gray-50 p-4 rounded-2xl">
                      <HospIcon className="w-8 h-8 text-gray-700" />
                   </div>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                     hospital.type === 'Government' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                   }`}>
                     {hospital.type === 'Government' ? 'সরকারি (Govt)' : 'বেসরকারি (Private)'}
                   </span>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">{hospital.name}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start group">
                    <div className="bg-gray-50 p-2 rounded-lg mr-3 group-hover:bg-green-50 transition-colors">
                      <MapPin className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{hospital.location}</span>
                  </div>
                  
                  <a 
                    href={`tel:${formatPhoneForDialer(hospital.phone)}`}
                    className="flex items-center group p-3 bg-green-50 rounded-2xl hover:bg-green-600 transition-all active:scale-95"
                  >
                    <div className="bg-white p-2 rounded-xl mr-3 shadow-sm group-hover:text-green-600">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-green-800 group-hover:text-white/80 uppercase">সরাসরি কল করুন</span>
                      <span className="text-lg font-black text-green-900 group-hover:text-white leading-none">{hospital.phone}</span>
                    </div>
                    <ChevronRight className="ml-auto w-5 h-5 text-green-200 group-hover:text-white" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(hospital.speciality || []).map((s: string) => (
                    <span key={s} className="bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded-xl font-bold border border-gray-100 group-hover:border-green-100 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-8 pt-0 mt-auto">
                <button className="w-full py-4 bg-gray-900 text-white hover:bg-black rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200 active:scale-95">
                  <UserRound className="w-4 h-4" />
                  <span>ডাক্তারদের অ্যাপয়েন্টমেন্ট</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No Results Found Implementation */
        <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200 animate-in fade-in duration-500">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">দুঃখিত, কোনো হাসপাতাল খুঁজে পাওয়া যায়নি।</h3>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">"{searchQuery}" এর জন্য কোনো ফলাফল নেই। প্রতিষ্ঠানের নাম বা সঠিক এলাকা লিখে পুনরায় চেষ্টা করুন।</p>
          <button 
            onClick={() => {setFilter('All'); clearSearch();}} 
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95"
          >
            অনুসন্ধান মুছুন এবং পুনরায় দেখুন
          </button>
        </div>
      )}
    </div>
  );
};

export default Health;
