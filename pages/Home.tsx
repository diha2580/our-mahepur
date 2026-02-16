import React from 'react';
import { PhoneCall, HeartPulse, Building2, MapPin, MessageSquare, FileText, GraduationCap, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const services = [
    { id: 'emergency', label: 'জরুরি সেবা', icon: PhoneCall, color: 'bg-red-500', shadow: 'shadow-red-100', desc: 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স' },
    { id: 'health', label: 'স্বাস্থ্য সেবা', icon: HeartPulse, color: 'bg-green-500', shadow: 'shadow-green-100', desc: 'হাসপাতাল, ডাক্তার ও ব্লাড ব্যাংক' },
    { id: 'directory', label: 'জেলা ডিরেক্টরি', icon: Building2, color: 'bg-blue-500', shadow: 'shadow-blue-100', desc: 'অফিস কর্মকর্তাদের তালিকা ও ফোন' },
    { id: 'education', label: 'শিক্ষা প্রতিষ্ঠান', icon: GraduationCap, color: 'bg-indigo-500', shadow: 'shadow-indigo-100', desc: 'স্কুল, কলেজ ও ভার্সিটির তথ্য' },
    { id: 'tourism', label: 'দর্শনীয় স্থান', icon: MapPin, color: 'bg-orange-500', shadow: 'shadow-orange-100', desc: 'জেলার পর্যটন ও ম্যাপ লোকেশন' },
    { id: 'complaint', label: 'অভিযোগ বক্স', icon: MessageSquare, color: 'bg-purple-500', shadow: 'shadow-purple-100', desc: 'সরাসরি অভিযোগ ও পরামর্শ পাঠান' },
    { id: 'eapps', label: 'ই-আবেদন', icon: FileText, color: 'bg-teal-500', shadow: 'shadow-teal-100', desc: 'অনলাইন ফরম ও সার্টিফিকেটের লিংক' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section with Logo Inspiration */}
      <section className="relative rounded-[2.5rem] overflow-hidden min-h-[450px] flex items-center bg-gray-900 text-white shadow-2xl">
        {/* Decorative background image - can be logo.png with low opacity */}
        <div className="absolute inset-0 opacity-40 bg-[url('logo.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-900/80 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-4xl px-8 md:px-16 py-12">
          <div className="inline-flex items-center gap-3 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-green-500/30 mb-6 animate-in slide-in-from-left duration-500">
             <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]"></div>
             <span className="text-xs font-black uppercase tracking-widest text-green-300">আপনার ডিজিটাল মহেশপুর</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            সেবা এখন <br />
            <span className="text-green-400">আপনার আঙুলের ডগায়</span>
          </h1>
          
          <p className="text-lg md:text-xl font-medium opacity-80 max-w-xl mb-10 leading-relaxed">
            সরকারি সকল তথ্য, জরুরি কন্টাক্ট এবং ই-সেবা নাগরিকের কাছে পৌঁছে দিতে আমাদের এই ক্ষুদ্র প্রয়াস।
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <div className="flex-1 max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 flex shadow-2xl focus-within:ring-2 focus-within:ring-green-400 transition-all">
                <input type="text" placeholder="কী সেবা খুঁজছেন?" className="flex-1 px-5 py-3 bg-transparent text-white placeholder-white/50 outline-none font-bold" />
                <button className="bg-green-500 hover:bg-green-400 text-green-950 px-8 py-3 rounded-xl transition-all font-black shadow-lg shadow-green-500/20 active:scale-95">খুঁজুন</button>
             </div>
             <button onClick={() => onNavigate('emergency')} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-red-600/20 active:scale-95">
                <PhoneCall className="w-5 h-5" /> জরুরি কল
             </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
           <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">সেবাসমূহ</h2>
              <div className="h-1.5 w-24 bg-green-500 rounded-full mt-2"></div>
           </div>
           <p className="text-gray-500 font-bold max-w-xs md:text-right">নাগরিক জীবন সহজ করতে আমাদের সকল ডিজিটাল সার্ভিস</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onNavigate(service.id)}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left group flex flex-col h-full"
            >
              <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl ${service.shadow} group-hover:rotate-12 transition-transform duration-500`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{service.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium flex-grow mb-6">{service.desc}</p>
              <div className="flex items-center text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-green-600 transition-colors">
                 বিস্তারিত প্রবেশ করুন <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Highlights / Stats */}
      <section className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-10 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16"></div>
         <div className="text-center relative z-10">
            <div className="text-5xl font-black text-green-600 mb-2">৫০০+</div>
            <div className="text-sm text-gray-900 font-black uppercase tracking-widest opacity-60">নিবন্ধিত চিকিৎসক</div>
         </div>
         <div className="text-center border-x border-gray-100 relative z-10 px-4">
            <div className="text-5xl font-black text-green-600 mb-2">২০+</div>
            <div className="text-sm text-gray-900 font-black uppercase tracking-widest opacity-60">সরকারি কার্যালয়</div>
         </div>
         <div className="text-center relative z-10">
            <div className="text-5xl font-black text-green-600 mb-2">১০০%</div>
            <div className="text-sm text-gray-900 font-black uppercase tracking-widest opacity-60">ডিজিটাল সেবা সুবিধা</div>
         </div>
      </section>
    </div>
  );
};

export default Home;