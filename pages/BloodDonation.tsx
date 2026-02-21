import React, { useState, useMemo } from 'react';
import { Droplets, Search, Phone, MapPin, Calendar, Filter, ArrowLeft, UserPlus, Heart, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { BloodDonor } from '../types';
import { formatPhoneForDialer } from '../lib/utils';

interface BloodDonationProps {
  donors: BloodDonor[];
  onBack: () => void;
  onRegister: (donor: BloodDonor) => void;
}

const BloodDonation: React.FC<BloodDonationProps> = ({ donors, onBack, onRegister }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'O+' as BloodDonor['bloodGroup'],
    phone: '',
    location: '',
  });

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.location) {
      alert('সবগুলো ঘর পূরণ করুন');
      return;
    }

    const newDonor: BloodDonor = {
      id: Date.now().toString(),
      name: formData.name,
      bloodGroup: formData.bloodGroup,
      phone: formData.phone,
      location: formData.location,
      lastDonationDate: 'এখনো দান করেননি',
      isAvailable: true
    };

    onRegister(newDonor);
    setIsModalOpen(false);
    setFormData({ name: '', bloodGroup: 'O+', phone: '', location: '' });
    alert('রক্তদাতা হিসেবে আপনার নাম সফলভাবে নিবন্ধিত হয়েছে!');
  };

  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           donor.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup === 'All' || donor.bloodGroup === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [donors, searchQuery, selectedGroup]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-90"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
              <Droplets className="w-8 h-8 text-red-600 animate-pulse" />
              রক্তদান সেবা
            </h2>
            <p className="text-gray-500 font-bold mt-1">জরুরি প্রয়োজনে রক্তদাতার সন্ধান করুন</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="bg-red-50 px-6 py-3 rounded-2xl border border-red-100 flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <span className="text-red-800 font-black">মোট দাতা: {donors.length}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input 
              type="text"
              placeholder="দাতার নাম বা এলাকা দিয়ে খুঁজুন..."
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all font-bold text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select 
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all font-bold text-gray-900 appearance-none cursor-pointer"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group === 'All' ? 'সব গ্রুপ' : group}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Donors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <div 
              key={donor.id}
              className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Blood Group Badge */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-[4rem] flex items-center justify-center group-hover:bg-red-600 transition-colors duration-500">
                <span className="text-2xl font-black text-red-600 group-hover:text-white transition-colors duration-500">{donor.bloodGroup}</span>
              </div>

              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{donor.name}</h3>
                  <div className="flex items-center gap-2">
                    {donor.isAvailable ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                        <CheckCircle2 className="w-3 h-3" /> Available
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                        <AlertCircle className="w-3 h-3" /> Not Available
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="font-bold">{donor.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="font-bold">সর্বশেষ দান: {donor.lastDonationDate}</span>
                  </div>
                </div>

                <a 
                  href={`tel:${formatPhoneForDialer(donor.phone)}`}
                  className="mt-auto w-full py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-gray-100"
                >
                  <Phone className="w-5 h-5" /> কল করুন
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-bold text-xl">দুঃখিত, কোনো রক্তদাতা খুঁজে পাওয়া যায়নি।</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-br from-red-600 to-red-800 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden shadow-2xl shadow-red-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">আপনি কি রক্তদাতা হতে চান?</h3>
          <p className="text-red-100 text-lg md:text-xl font-bold mb-10 opacity-90">আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি মূল্যবান প্রাণ। আজই আমাদের রক্তদাতা তালিকায় যুক্ত হোন।</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-red-50 transition-all active:scale-95 shadow-2xl shadow-black/10 flex items-center gap-3 mx-auto"
          >
            <UserPlus className="w-6 h-6" /> দাতা হিসেবে নাম লেখান
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-red-50">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-2 rounded-xl">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-black text-gray-900">রক্তদাতা নিবন্ধন</h4>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">আপনার নাম</label>
                <input 
                  required
                  type="text" 
                  placeholder="পুরো নাম লিখুন" 
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all font-bold"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">রক্তের গ্রুপ</label>
                  <select 
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all font-bold appearance-none cursor-pointer"
                    value={formData.bloodGroup}
                    onChange={e => setFormData({...formData, bloodGroup: e.target.value as any})}
                  >
                    {bloodGroups.filter(g => g !== 'All').map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">ফোন নম্বর</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="০১XXX-XXXXXX" 
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all font-bold"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">বর্তমান ঠিকানা / এলাকা</label>
                <input 
                  required
                  type="text" 
                  placeholder="যেমন: মহেশপুর সদর" 
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all font-bold"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-5 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all active:scale-95"
                >
                  বাতিল
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> নিবন্ধন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodDonation;
