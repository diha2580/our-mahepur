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
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  // Mock Doctor Data - Linked to available facilities
  const doctors = useMemo(() => [
    { 
      id: 'd1', 
      name: 'ডাঃ তৌহিদুর রহমান', 
      specialty: 'Medicine', 
      degree: 'MBBS, BCS (Health), FCPS (Medicine)', 
      hospitalId: '1', 
      time: '০৪:০০ - ০৮:০০', 
      days: 'শনি - বৃহস্পতি',
      bio: 'ডাঃ তৌহিদুর রহমান একজন অভিজ্ঞ মেডিসিন বিশেষজ্ঞ। তিনি দীর্ঘ ১০ বছর ধরে সরকারি ও বেসরকারি পর্যায়ে চিকিৎসা সেবা প্রদান করছেন।'
    },
    { 
      id: 'd2', 
      name: 'ডাঃ মেহজাবিন আলম', 
      specialty: 'Pediatrics', 
      degree: 'MBBS, DCH (BSMMU), FCPS (Pediatrics)', 
      hospitalId: '1', 
      time: '০৫:০০ - ০৭:০০', 
      days: 'রবি, মঙ্গল, বৃহস্পতি',
      bio: 'শিশুরোগ বিশেষজ্ঞ হিসেবে ডাঃ মেহজাবিন আলম অত্যন্ত সুপরিচিত। তিনি শিশুদের শারীরিক ও মানসিক বিকাশে বিশেষ গুরুত্ব দিয়ে থাকেন।'
    },
    { 
      id: 'd3', 
      name: 'ডাঃ আসাদুজ্জামান', 
      specialty: 'Surgery', 
      degree: 'MBBS, MS (General Surgery), FRCS', 
      hospitalId: '2', 
      time: '০৬:০০ - ০৯:০০', 
      days: 'প্রতিদিন',
      bio: 'জেনারেল সার্জন হিসেবে ডাঃ আসাদুজ্জামান অসংখ্য সফল অপারেশন সম্পন্ন করেছেন। তিনি আধুনিক সার্জিক্যাল পদ্ধতিতে পারদর্শী।'
    },
    { 
      id: 'd4', 
      name: 'ডাঃ ফারজানা ইয়াসমিন', 
      specialty: 'Gynecology', 
      degree: 'MBBS, FCPS (Gynae), DGO', 
      hospitalId: '2', 
      time: '০৪:৩০ - ০৭:৩০', 
      days: 'শনি, সোম, বুধ',
      bio: 'স্ত্রী ও প্রসূতি রোগ বিশেষজ্ঞ ডাঃ ফারজানা ইয়াসমিন মাতৃত্বকালীন স্বাস্থ্য ও নারী স্বাস্থ্য সচেতনতায় কাজ করছেন।'
    },
    { 
      id: 'd5', 
      name: 'ডাঃ শাহরিয়ার আহমেদ', 
      specialty: 'Pathology', 
      degree: 'MBBS, MD (Pathology), DCP', 
      hospitalId: '2', 
      time: '১০:০০ - ০২:০০', 
      days: 'শনি - বৃহস্পতি',
      bio: 'প্যাথলজি বিশেষজ্ঞ হিসেবে ডাঃ শাহরিয়ার আহমেদ নির্ভুল রোগ নির্ণয়ে সহায়তা করেন। তিনি আধুনিক ল্যাবরেটরি প্রযুক্তিতে অভিজ্ঞ।'
    },
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
    
    let matchesAvailability = true;
    if (selectedAvailability === 'Weekdays') {
      matchesAvailability = d.days.includes('শনি - বৃহস্পতি') || d.days.includes('প্রতিদিন');
    } else if (selectedAvailability === 'Weekends') {
      matchesAvailability = d.days.includes('প্রতিদিন') || d.days.includes('শুক্র');
    } else if (selectedAvailability === 'Specific days') {
      matchesAvailability = d.days.includes(',') && !d.days.includes('প্রতিদিন');
    }

    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesHospital && matchesAvailability && matchesSearch;
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
              <div className="flex flex-col md:flex-row gap-6 flex-1">
                <div className="flex-1">
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

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 ml-1">
                    <CalendarCheck className="w-3.5 h-3.5 text-amber-600" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">উপলব্ধতা অনুযায়ী</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'All', label: 'সব দিন' },
                      { id: 'Weekdays', label: 'কর্মদিবস' },
                      { id: 'Weekends', label: 'ছুটির দিন' },
                      { id: 'Specific days', label: 'নির্দিষ্ট দিন' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedAvailability(opt.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedAvailability === opt.id 
                            ? 'bg-amber-600 border-amber-600 text-white shadow-md' 
                            : 'bg-white border-gray-100 text-gray-500 hover:border-amber-200 hover:text-amber-600'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
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
                <div 
                  key={doctor.id} 
                  onClick={() => setSelectedDoctor(doctor)}
                  className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative flex flex-col cursor-pointer"
                >
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

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative h-48 bg-gradient-to-br from-green-600 to-green-800 p-8 flex items-end">
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-6 translate-y-12">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-2xl">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedDoctor.id}`} 
                    className="w-full h-full rounded-[1.4rem] object-cover bg-green-50" 
                    alt={selectedDoctor.name} 
                  />
                </div>
                <div className="pb-4">
                  <h3 className="text-3xl font-black text-white leading-tight mb-1">{selectedDoctor.name}</h3>
                  <p className="text-green-100 font-bold uppercase tracking-widest text-sm">{selectedDoctor.specialty} Specialist</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 pt-20 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Stethoscope className="w-6 h-6" /></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ডিগ্রি ও যোগ্যতা</p>
                      <p className="text-sm font-bold text-gray-700">{selectedDoctor.degree}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600"><HospIcon className="w-6 h-6" /></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">চেম্বার/হাসপাতাল</p>
                      <p className="text-sm font-bold text-gray-700">
                        {facilities.find(h => h.id === selectedDoctor.hospitalId)?.name || 'অজ্ঞাত'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-50 p-3 rounded-2xl text-amber-600"><Clock className="w-6 h-6" /></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">রোগী দেখার সময়</p>
                      <p className="text-sm font-bold text-gray-700">{selectedDoctor.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-2xl text-green-600"><CalendarCheck className="w-6 h-6" /></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">উপলব্ধ দিনসমূহ</p>
                      <p className="text-sm font-bold text-gray-700">{selectedDoctor.days}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedDoctor.bio && (
                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">ডাক্তার সম্পর্কে</p>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedDoctor.bio}</p>
                </div>
              )}

              <div className="flex gap-4">
                <a 
                  href={`tel:${formatPhoneForDialer(facilities.find(h => h.id === selectedDoctor.hospitalId)?.phone || '')}`}
                  className="flex-1 bg-green-600 text-white py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:bg-green-700 transition-all active:scale-95"
                >
                  <Phone className="w-5 h-5" /> সিরিয়াল বুক করুন
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Health;