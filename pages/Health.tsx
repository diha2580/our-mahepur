import React, { useState, useMemo } from 'react';
import { MapPin, Phone, Hospital as HospIcon, UserRound, Search, ChevronRight, X, ArrowLeft, Stethoscope, Clock, ShieldCheck, Filter, LayoutDashboard, Pill, Activity } from 'lucide-react';
import { formatPhoneForDialer } from '../lib/utils';

interface HealthProps {
  facilities: any[];
  pharmacies: any[];
  onBack: () => void;
}

const Health: React.FC<HealthProps> = ({ facilities, pharmacies, onBack }) => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'hospitals' | 'doctors'>('dashboard');
  const [filter, setFilter] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedHospitalId, setSelectedHospitalId] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  // Derive Doctor Data from facilities
  const doctors = useMemo(() => {
    const allDoctors: any[] = [];
    facilities.forEach(h => {
      if (h.doctors && Array.isArray(h.doctors)) {
        h.doctors.forEach((d: any) => {
          allDoctors.push({
            ...d,
            hospitalId: h.id,
            specialty: d.specialist // Map specialist to specialty for consistency with existing UI
          });
        });
      }
    });
    return allDoctors;
  }, [facilities]);

  // Extract unique specialties
  const allSpecialties = useMemo(() => {
    const specs = new Set<string>();
    facilities.forEach(h => h.speciality?.forEach((s: string) => specs.add(s)));
    doctors.forEach(d => {
      if (d.specialist) specs.add(d.specialist);
      if (d.specialty) specs.add(d.specialty);
    });
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
            aria-label="আগের পৃষ্ঠায় ফিরে যান"
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
            onClick={() => { setViewMode('dashboard'); clearSearch(); }}
            aria-pressed={viewMode === 'dashboard'}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${viewMode === 'dashboard' ? 'bg-white text-green-700 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> ড্যাশবোর্ড
          </button>
          <button 
            onClick={() => { setViewMode('hospitals'); setSelectedHospitalId('All'); clearSearch(); }}
            aria-pressed={viewMode === 'hospitals'}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${viewMode === 'hospitals' ? 'bg-white text-green-700 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
          >
            <HospIcon className="w-4 h-4" /> হাসপাতাল
          </button>
          <button 
            onClick={() => { setViewMode('doctors'); setSelectedHospitalId('All'); clearSearch(); }}
            aria-pressed={viewMode === 'doctors'}
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
                <button onClick={clearSearch} aria-label="অনুসন্ধান মুছুন" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
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
              </div>
            )}
          </div>
        </div>
      </div>

      {viewMode === 'dashboard' ? (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
              <div className="bg-green-50 p-4 rounded-2xl text-green-600"><HospIcon className="w-8 h-8" /></div>
              <div>
                <div className="text-3xl font-black text-gray-900">{facilities.length}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">হাসপাতাল</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><UserRound className="w-8 h-8" /></div>
              <div>
                <div className="text-3xl font-black text-gray-900">{doctors.length}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">বিশেষজ্ঞ ডাক্তার</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
              <div className="bg-purple-50 p-4 rounded-2xl text-purple-600"><Pill className="w-8 h-8" /></div>
              <div>
                <div className="text-3xl font-black text-gray-900">{pharmacies.length}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">ফার্মেসি</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
              <div className="bg-orange-50 p-4 rounded-2xl text-orange-600"><Activity className="w-8 h-8" /></div>
              <div>
                <div className="text-3xl font-black text-gray-900">{allSpecialties.length - 1}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">চিকিৎসা বিভাগ</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Nearby Hospitals */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-gray-900">নিকটস্থ হাসপাতালসমূহ</h3>
                <button onClick={() => setViewMode('hospitals')} className="text-green-600 font-bold text-sm hover:underline">সব দেখুন</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {facilities.slice(0, 4).map(hospital => (
                  <div key={hospital.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-green-50 transition-colors"><HospIcon className="w-6 h-6 text-gray-400 group-hover:text-green-600" /></div>
                      <div>
                        <h4 className="font-black text-gray-900 leading-tight">{hospital.name}</h4>
                        <p className="text-xs text-gray-400 font-bold">{hospital.location}</p>
                      </div>
                    </div>
                    <a href={`tel:${formatPhoneForDialer(hospital.phone)}`} className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 hover:text-white transition-all">
                      <Phone className="w-4 h-4" /> {hospital.phone}
                    </a>
                  </div>
                ))}
              </div>

              {/* Specialties Grid */}
              <div className="pt-6">
                <div className="flex items-center justify-between px-2 mb-6">
                  <h3 className="text-2xl font-black text-gray-900">বিশেষজ্ঞ বিভাগসমূহ</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {allSpecialties.filter(s => s !== 'All').map(spec => {
                    const count = doctors.filter(d => d.specialty === spec).length;
                    return (
                      <button 
                        key={spec}
                        onClick={() => { setViewMode('doctors'); setSelectedSpecialty(spec); }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-lg transition-all text-center group"
                      >
                        <div className="text-2xl font-black text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{count}</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{spec}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pharmacies Sidebar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-gray-900">ফার্মেসি</h3>
              </div>
              <div className="space-y-4">
                {pharmacies.map(pharmacy => (
                  <div key={pharmacy.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-purple-50 p-3 rounded-xl text-purple-600"><Pill className="w-6 h-6" /></div>
                      <div className="flex gap-2">
                        {pharmacy.isOpen24Hours && <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-[8px] font-black uppercase">24/7</span>}
                        {pharmacy.deliveryAvailable && <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[8px] font-black uppercase">Delivery</span>}
                      </div>
                    </div>
                    <h4 className="font-black text-gray-900 mb-1">{pharmacy.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-bold mb-4">
                      <MapPin className="w-3 h-3" /> {pharmacy.location}
                    </div>
                    <a href={`tel:${formatPhoneForDialer(pharmacy.phone)}`} className="w-full py-3 border border-gray-100 text-gray-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-purple-600 hover:text-white transition-all">
                      <Phone className="w-4 h-4" /> কল করুন
                    </a>
                  </div>
                ))}
              </div>

              {/* Emergency Banner */}
              <div className="bg-red-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="relative z-10">
                  <h4 className="text-xl font-black mb-2">জরুরি অ্যাম্বুলেন্স?</h4>
                  <p className="text-red-100 text-sm font-bold mb-6 opacity-80">যেকোনো জরুরি প্রয়োজনে দ্রুত অ্যাম্বুলেন্স কল করুন।</p>
                  <a href="tel:999" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-black text-sm hover:bg-red-50 transition-all">
                    <Phone className="w-4 h-4" /> কল করুন ৯৯৯
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : viewMode === 'hospitals' ? (
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
                             <span className="text-[9px] font-black uppercase tracking-widest">রোগী দেখার সময়</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">{doctor.viewingTime}</span>
                       </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href={`tel:${formatPhoneForDialer(doctor.phone || '')}`}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-5xl rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] animate-in zoom-in slide-in-from-bottom-12 duration-700 flex flex-col md:flex-row h-full max-h-[85vh]">
            {/* Profile Section */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto bg-gradient-to-br from-green-600 via-green-700 to-green-900 p-12 flex flex-col justify-end overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-white blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-green-400 blur-3xl"></div>
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="w-40 h-40 rounded-[3rem] bg-white p-1.5 shadow-2xl rotate-[-3deg] group-hover:rotate-0 transition-transform duration-700">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedDoctor.id}`} 
                    className="w-full h-full rounded-[2.6rem] object-cover bg-green-50" 
                    alt={selectedDoctor.name} 
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 mb-4">
                    <ShieldCheck className="w-3 h-3 text-green-300" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Verified Specialist</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white leading-[0.9] tracking-tighter mb-4">{selectedDoctor.name}</h3>
                  <p className="text-green-100 font-bold text-lg opacity-80">{selectedDoctor.specialty} বিশেষজ্ঞ</p>
                </div>
              </div>
            </div>
            
            {/* Info Section */}
            <div className="w-full md:w-3/5 flex flex-col h-full bg-white relative">
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-8 right-8 z-10 bg-gray-100 hover:bg-red-50 p-4 rounded-full text-gray-400 hover:text-red-500 transition-all shadow-sm active:scale-90"
                aria-label="বন্ধ করুন"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-grow overflow-y-auto p-8 md:p-16 custom-scrollbar">
                <div className="grid grid-cols-1 gap-12">
                  <div className="space-y-10">
                    <div className="flex items-center gap-4">
                       <div className="h-1 w-16 bg-green-600 rounded-full"></div>
                       <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em]">Doctor Profile</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ডিগ্রি ও যোগ্যতা</p>
                        <div className="flex items-start gap-3">
                          <Stethoscope className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                          <p className="text-lg font-bold text-gray-800 leading-tight">{selectedDoctor.degree}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">চেম্বার/হাসপাতাল</p>
                        <div className="flex items-start gap-3">
                          <HospIcon className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                          <p className="text-lg font-bold text-gray-800 leading-tight">
                            {facilities.find(h => h.id === selectedDoctor.hospitalId)?.name || 'অজ্ঞাত'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">রোগী দেখার সময়</p>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                          <p className="text-lg font-bold text-gray-800 leading-tight">{selectedDoctor.viewingTime}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">সিরিয়াল নম্বর</p>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                          <p className="text-lg font-bold text-gray-800 leading-tight">{selectedDoctor.phone}</p>
                        </div>
                      </div>
                    </div>

                    {selectedDoctor.bio && (
                      <div className="bg-green-50/50 p-10 rounded-[3rem] border border-green-100/50">
                        <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-4">ডাক্তার সম্পর্কে</p>
                        <p className="text-lg text-gray-700 leading-relaxed font-medium italic">"{selectedDoctor.bio}"</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`tel:${formatPhoneForDialer(selectedDoctor.phone)}`}
                      className="flex-1 bg-green-600 text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-green-100 hover:bg-green-700 transition-all active:scale-[0.98]"
                    >
                      <Phone className="w-6 h-6" /> সিরিয়াল বুক করুন
                    </a>
                    <button 
                      onClick={() => setSelectedDoctor(null)}
                      className="px-10 py-6 bg-gray-100 text-gray-600 rounded-[2rem] font-black text-lg hover:bg-gray-200 transition-all active:scale-[0.98]"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Health;