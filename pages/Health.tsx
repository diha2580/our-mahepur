import React, { useState, useMemo } from 'react';
import { HeartPulse, MapPin, Phone, Hospital as HospIcon, UserRound, Search, ChevronRight, X, ArrowLeft, Stethoscope, Clock, CalendarCheck, ShieldCheck, Filter } from 'lucide-react';
import { formatPhoneForDialer } from '../lib/utils';

interface HealthProps {
  facilities: any[];
  onBack: () => void;
}

const Health: React.FC<HealthProps> = ({ facilities, onBack }) => {
  const [viewMode, setViewMode] = useState<'hospitals' | 'doctors'>('hospitals');
  const [filter, setFilter] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedHospitalId, setSelectedHospitalId] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Doctor Data - Linked to available facilities
  const doctors = useMemo(() => [
    { id: 'd1', name: 'ডাঃ তৌহিদুর রহমান', specialty: 'Medicine', degree: 'MBBS, BCS (Health), FCPS', hospitalId: '1', time: '০৪:০০ - ০৮:০০', days: 'শনি - বৃহস্পতি' },
    { id: 'd2', name: 'ডাঃ মেহজাবিন আলম', specialty: 'Pediatrics', degree: 'MBBS, DCH (BSMMU)', hospitalId: '1', time: '০৫:০০ - ০৭:০০', days: 'রবি, মঙ্গল, বৃহস্পতি' },
    { id: 'd3', name: 'ডাঃ আসাদুজ্জামান', specialty: 'Surgery', degree: 'MBBS, MS (General Surgery)', hospitalId: '2', time: '০৬:০০ - ০৯:০০', days: 'প্রতিদিন' },
    { id: 'd4', name: 'ডাঃ ফারজানা ইয়াসমিন', specialty: 'Gynecology', degree: 'MBBS, FCPS (Gynae)', hospitalId: '2', time: '০৪:৩০ - ০৭:৩০', days: 'শনি, সোম, বুধ' },
    { id: 'd5', name: 'ডাঃ শাহরিয়ার আহমেদ', specialty: 'Pathology', degree: 'MBBS, MD (Pathology)', hospitalId: '2', time: '১০:০০ - ০২:০০', days: 'শনি - বৃহস্পতি' },
  ], []);

  // Extract unique specialties
  const allSpecialties = useMemo(() => {
    const specs = new Set<string>();
    facilities.forEach(h => h.speciality?.forEach((s: string) => specs.add(s)));
    doctors.forEach(d => specs.add(d.specialty));
    return ['All', ...Array.from(specs)];
  }, [facilities, doctors]);

  const filteredHospitals = facilities.filter(h => {
    const matchesFilter = filter === 'All' || h.type === filter;
    const matchesSpecialty = selectedSpecialty === 'All' || h.speciality?.includes(selectedSpecialty);
    const matchesSearch = 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      h.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSpecialty && matchesSearch;
  });

  const filteredDoctors = doctors.filter(d => {
    const hospital = facilities.find(h => h.id === d.hospitalId);
    const matchesSpecialty = selectedSpecialty === 'All' || d.specialty === selectedSpecialty;
    const matchesHospital = selectedHospitalId === 'All' || d.hospitalId === selectedHospitalId;
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesHospital && matchesSearch;
  });

  const clearSearch = () => setSearchQuery('');

  return (
    <div className="animate-in fade-in slide-in-from-right duration-500 pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition-colors group"
          >
            <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-green-50 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            ফিরে যান
          </button>
          <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              স্বাস্থ্য সেবা পোর্টাল
            </h2>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
          <button 
            onClick={() => { setViewMode('hospitals'); setSelectedHospitalId('All'); clearSearch(); }}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${viewMode === 'hospitals' ? 'bg-white text-green-700 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
          >
            <HospIcon className="w-4 h-4" /> হাসপাতাল
          </button>
          <button 
            onClick={() => { setViewMode('doctors'); setSelectedHospitalId('All'); clearSearch(); }}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${viewMode === 'doctors' ? 'bg-white text-green-700 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
          >
            <UserRound className="w-4 h-4" /> বিশেষজ্ঞ ডাক্তার
          </button>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Bar */}
          <div className="flex-grow">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder={viewMode === 'hospitals' ? "হাসপাতাল বা এলাকা খুঁজুন..." : "ডাক্তারের নাম বা বিশেষজ্ঞতা খুঁজুন..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-green-50 focus:bg-white transition-all w-full text-black font-medium"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Type Filter (Hospitals Only) */}
          {viewMode === 'hospitals' && (
            <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 shrink-0 overflow-x-auto">
              {['All', 'Government', 'Private'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-widest whitespace-nowrap ${
                    filter === type ? 'bg-green-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white'
                  }`}
                >
                  {type === 'All' ? 'সব' : type === 'Government' ? 'সরকারি' : 'বেসরকারি'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Filters Section */}
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Specialty Pills Filter */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 ml-1">
                <Filter className="w-3.5 h-3.5 text-green-600" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">বিভাগ অনুযায়ী</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {allSpecialties.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedSpecialty === spec 
                        ? 'bg-green-600 border-green-600 text-white shadow-md' 
                        : 'bg-white border-gray-100 text-gray-500 hover:border-green-200 hover:text-green-600'
                    }`}
                  >
                    {spec === 'All' ? 'সব বিভাগ' : spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Hospital Filter (Available in Doctor View) */}
            {viewMode === 'doctors' && (
              <div className="flex-1 lg:max-w-md">
                <div className="flex items-center gap-2 mb-3 ml-1">
                  <HospIcon className="w-3.5 h-3.5 text-blue-600" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">হাসপাতাল অনুযায়ী</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedHospitalId('All')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedHospitalId === 'All' 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                        : 'bg-white border-gray-100 text-gray-500 hover:border-blue-200 hover:text-blue-600'
                    }`}
                  >
                    সব হাসপাতাল
                  </button>
                  {facilities.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHospitalId(h.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        selectedHospitalId === h.id 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                          : 'bg-white border-gray-100 text-gray-500 hover:border-blue-200 hover:text-blue-600'
                      }`}
                    >
                      {h.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {viewMode === 'hospitals' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital: any) => (
              <div key={hospital.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className={`h-3 ${hospital.type === 'Government' ? 'bg-green-600' : 'bg-blue-600'}`}></div>
                <div className="p-8 flex-grow">
                  <div className="flex items-start justify-between mb-6">
                     <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-green-50 transition-colors"><HospIcon className="w-8 h-8 text-gray-700 group-hover:text-green-600" /></div>
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                       hospital.type === 'Government' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                     }`}>
                       {hospital.type === 'Government' ? 'সরকারি (Govt)' : 'বেসরকারি (Private)'}
                     </span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">{hospital.name}</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start group/loc">
                      <div className="bg-gray-50 p-2 rounded-lg mr-3 group-hover/loc:bg-green-50 transition-colors"><MapPin className="w-4 h-4 text-gray-400 group-hover/loc:text-green-600" /></div>
                      <span className="text-sm font-medium text-gray-600">{hospital.location}</span>
                    </div>
                    <a href={`tel:${formatPhoneForDialer(hospital.phone)}`} className="flex items-center group/call p-3 bg-green-50/50 rounded-2xl hover:bg-green-600 transition-all active:scale-95">
                      <div className="bg-white p-2 rounded-xl mr-3 shadow-sm group-hover/call:text-green-600"><Phone className="w-5 h-5 text-green-600" /></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-green-800 group-hover/call:text-white/80 uppercase">সরাসরি কল করুন</span>
                        <span className="text-lg font-black text-green-900 group-hover/call:text-white leading-none">{hospital.phone}</span>
                      </div>
                      <ChevronRight className="ml-auto w-5 h-5 text-green-200 group-hover/call:text-white" />
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(hospital.speciality || []).map((s: string) => (
                      <span key={s} className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-colors ${selectedSpecialty === s ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-600 border-gray-100 group-hover:border-green-100'}`}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className="p-8 pt-0 mt-auto">
                  <button onClick={() => {setViewMode('doctors'); setSelectedHospitalId(hospital.id); clearSearch();}} className="w-full py-4 bg-gray-900 text-white hover:bg-black rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200 active:scale-95">
                    <UserRound className="w-4 h-4" /><span>ডাক্তারদের তালিকা দেখুন</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
               <HospIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
               <p className="text-gray-400 font-bold">দুঃখিত, কোনো হাসপাতাল খুঁজে পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom duration-500">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => {
              const hospital = facilities.find(h => h.id === doctor.hospitalId);
              return (
                <div key={doctor.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative flex flex-col">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 border-2 border-white shadow-xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.id}`} className="w-full h-full object-cover" alt={doctor.name} />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 p-1.5 rounded-lg border-2 border-white shadow-lg">
                        <ShieldCheck className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 leading-tight mb-1">{doctor.name}</h3>
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">{doctor.specialty} Specialist</p>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                         <Stethoscope className="w-3 h-3 text-gray-400" />
                         <span className="text-[11px] font-bold text-gray-500">{doctor.degree}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-start gap-3">
                       <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><HospIcon className="w-4 h-4" /></div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">চেম্বার/হাসপাতাল</span>
                          <span className="text-sm font-bold text-gray-700">{hospital?.name || 'অজ্ঞাত'}</span>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                       <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                             <Clock className="w-3 h-3" />
                             <span className="text-[9px] font-black uppercase tracking-widest">সময়</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">{doctor.time}</span>
                       </div>
                       <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                             <CalendarCheck className="w-3 h-3" />
                             <span className="text-[9px] font-black uppercase tracking-widest">দিন</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">{doctor.days}</span>
                       </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href={`tel:${formatPhoneForDialer(hospital?.phone || '')}`}
                      className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95"
                    >
                      <Phone className="w-4 h-4" /> কল করুন
                    </a>
                    <button className="px-5 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all active:scale-95">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
               <Stethoscope className="w-16 h-16 text-gray-200 mx-auto mb-4" />
               <p className="text-gray-400 font-bold">দুঃখিত, কোনো ডাক্তার খুঁজে পাওয়া যায়নি।</p>
               <button onClick={() => {setSearchQuery(''); setSelectedSpecialty('All'); setSelectedHospitalId('All');}} className="mt-4 text-green-600 font-bold hover:underline">সব ডাক্তার দেখুন</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Health;