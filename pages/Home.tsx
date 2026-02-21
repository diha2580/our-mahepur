import React from 'react';
import { PhoneCall, HeartPulse, Building2, MapPin, MessageSquare, FileText, GraduationCap, ArrowRight, Map, BookOpen, Droplets } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const services = [
    { id: 'history', label: 'মহেশপুরের ইতিহাস', icon: BookOpen, color: 'bg-indigo-600', shadow: 'shadow-indigo-100', desc: 'জেলার প্রাচীন ইতিহাস ও ঐতিহ্য জানুন' },
    { id: 'emergency', label: 'জরুরি সেবা', icon: PhoneCall, color: 'bg-red-500', shadow: 'shadow-red-100', desc: 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স' },
    { id: 'health', label: 'স্বাস্থ্য সেবা', icon: HeartPulse, color: 'bg-green-500', shadow: 'shadow-green-100', desc: 'হাসপাতাল, ডাক্তার ও ব্লাড ব্যাংক' },
    { id: 'directory', label: 'জেলা ডিরেক্টরি', icon: Building2, color: 'bg-blue-500', shadow: 'shadow-blue-100', desc: 'অফিস কর্মকর্তাদের তালিকা ও ফোন' },
    { id: 'land', label: 'ভূমি সেবা', icon: Map, color: 'bg-amber-600', shadow: 'shadow-amber-100', desc: 'নামজারি আবেদন, খতিয়ান ও খাজনা' },
    { id: 'education', label: 'শিক্ষা প্রতিষ্ঠান', icon: GraduationCap, color: 'bg-indigo-500', shadow: 'shadow-indigo-100', desc: 'স্কুল, কলেজ ও ভার্সিটির তথ্য' },
    { id: 'tourism', label: 'দর্শনীয় স্থান', icon: MapPin, color: 'bg-orange-500', shadow: 'shadow-orange-100', desc: 'জেলার পর্যটন ও ম্যাপ লোকেশন' },
    { id: 'blood', label: 'রক্তদান সেবা', icon: Droplets, color: 'bg-red-600', shadow: 'shadow-red-100', desc: 'জরুরি প্রয়োজনে রক্তদাতার সন্ধান করুন' },
    { id: 'complaint', label: 'অভিযোগ বক্স', icon: MessageSquare, color: 'bg-purple-500', shadow: 'shadow-purple-100', desc: 'সরাসরি অভিযোগ ও পরামর্শ পাঠান' },
    { id: 'contact', label: 'যোগাযোগ', icon: PhoneCall, color: 'bg-blue-600', shadow: 'shadow-blue-100', desc: 'আমাদের সাথে সরাসরি যোগাযোগ করুন' },
    { id: 'eapps', label: 'ই-আবেদন', icon: FileText, color: 'bg-teal-500', shadow: 'shadow-teal-100', desc: 'অনলাইন ফরম ও সার্টিফিকেটের লিংক' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center bg-gray-900 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-40 bg-[url('logo.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-900/80 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-4xl px-8 md:px-16 py-12">
          <div className="inline-flex items-center gap-3 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-green-500/30 mb-6">
             <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
             <span className="text-xs font-black uppercase tracking-widest text-green-300">আপনার ডিজিটাল মহেশপুর</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            সেবা এখন <br />
            <span className="text-green-400">আপনার হাতের মুঠোয়</span>
          </h1>
          
          <p className="text-base md:text-lg font-medium opacity-80 max-w-xl mb-10 leading-relaxed">
            সরকারি তথ্য, জরুরি যোগাযোগ এবং ই-সেবা নাগরিকের দ্বারে পৌঁছে দিতে আমাদের এই ডিজিটাল প্ল্যাটফর্ম।
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <button onClick={() => onNavigate('emergency')} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-red-600/20 active:scale-95">
                <PhoneCall className="w-5 h-5" /> জরুরি কল করুন
             </button>
          </div>
        </div>
      </section>

      {/* Services Grid - Forced Two Columns Side-by-Side */}
      <section>
        <div className="flex flex-col mb-10">
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">ডিজিটাল সেবাসমূহ</h2>
           <div className="h-1.5 w-16 bg-green-500 rounded-full mt-2"></div>
           <p className="text-gray-500 font-bold mt-4">নাগরিক জীবন সহজ করতে আমাদের সকল অনলাইন সার্ভিস</p>
        </div>
        
        {/* Responsive Grid: 1 column on tiny phones, 2 columns on tablets and desktops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onNavigate(service.id)}
              aria-label={`${service.label} সেবায় যান: ${service.desc}`}
              className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 text-left group flex items-center gap-6"
            >
              <div className={`${service.color} shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl ${service.shadow} group-hover:scale-110 transition-transform duration-500`}>
                <service.icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                   <h3 className="text-xl md:text-2xl font-black text-gray-900 truncate">{service.label}</h3>
                   <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-2 font-medium">{service.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-8">
         <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-green-600 mb-1">১০০০+</div>
            <div className="text-[10px] md:text-xs text-gray-900 font-black uppercase tracking-widest opacity-60">সেবা গ্রহীতা</div>
         </div>
         <div className="text-center border-y sm:border-y-0 sm:border-x border-gray-100 py-6 sm:py-0 px-4">
            <div className="text-4xl md:text-5xl font-black text-green-600 mb-1">২৫+</div>
            <div className="text-[10px] md:text-xs text-gray-900 font-black uppercase tracking-widest opacity-60">সরকারি বিভাগ</div>
         </div>
         <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-green-600 mb-1">২৪/৭</div>
            <div className="text-[10px] md:text-xs text-gray-900 font-black uppercase tracking-widest opacity-60">অনলাইন সহায়তা</div>
         </div>
      </section>
    </div>
  );
};

export default Home;