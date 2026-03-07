import React from 'react';
import { PhoneCall, HeartPulse, Building2, MapPin, MessageSquare, GraduationCap, ArrowRight, Map, BookOpen, Droplets, Landmark } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const services = [
    { 
      id: 'history', 
      label: 'মহেশপুরের ইতিহাস', 
      icon: BookOpen, 
      theme: 'indigo',
      desc: 'জেলার প্রাচীন ইতিহাস ও ঐতিহ্য জানুন' 
    },
    { 
      id: 'emergency', 
      label: 'জরুরি সেবা', 
      icon: PhoneCall, 
      theme: 'red',
      desc: 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স' 
    },
    { 
      id: 'health', 
      label: 'স্বাস্থ্য সেবা', 
      icon: HeartPulse, 
      theme: 'emerald',
      desc: 'হাসপাতাল, ডাক্তার ও ব্লাড ব্যাংক' 
    },
    { 
      id: 'directory', 
      label: 'জেলা ডিরেক্টরি', 
      icon: Building2, 
      theme: 'blue',
      desc: 'অফিস কর্মকর্তাদের তালিকা ও ফোন' 
    },
    { 
      id: 'land', 
      label: 'ভূমি সেবা', 
      icon: Map, 
      theme: 'amber',
      desc: 'নামজারি আবেদন, খতিয়ান ও খাজনা' 
    },
    { 
      id: 'education', 
      label: 'শিক্ষা প্রতিষ্ঠান', 
      icon: GraduationCap, 
      theme: 'violet',
      desc: 'স্কুল, কলেজ ও ভার্সিটির তথ্য' 
    },
    { 
      id: 'tourism', 
      label: 'দর্শনীয় স্থান', 
      icon: MapPin, 
      theme: 'orange',
      desc: 'জেলার পর্যটন ও ম্যাপ লোকেশন' 
    },
    { 
      id: 'blood', 
      label: 'রক্তদান সেবা', 
      icon: Droplets, 
      theme: 'rose',
      desc: 'জরুরি প্রয়োজনে রক্তদাতার সন্ধান করুন' 
    },
    { 
      id: 'complaint', 
      label: 'অভিযোগ বক্স', 
      icon: MessageSquare, 
      theme: 'purple',
      desc: 'সরাসরি অভিযোগ ও পরামর্শ পাঠান' 
    },
    { 
      id: 'contact', 
      label: 'যোগাযোগ', 
      icon: PhoneCall, 
      theme: 'sky',
      desc: 'আমাদের সাথে সরাসরি যোগাযোগ করুন' 
    },
    { 
      id: 'union', 
      label: 'ইউনিয়ন পরিষদ', 
      icon: Landmark, 
      theme: 'teal',
      desc: 'উপজেলার সকল ইউনিয়ন পরিষদের তথ্য' 
    },
  ];

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'indigo': return { bg: 'bg-indigo-50', icon: 'bg-indigo-600', text: 'text-indigo-700', border: 'border-indigo-100', shadow: 'shadow-indigo-100/50', hover: 'hover:border-indigo-300' };
      case 'red': return { bg: 'bg-red-50', icon: 'bg-red-600', text: 'text-red-700', border: 'border-red-100', shadow: 'shadow-red-100/50', hover: 'hover:border-red-300' };
      case 'emerald': return { bg: 'bg-emerald-50', icon: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-100', shadow: 'shadow-emerald-100/50', hover: 'hover:border-emerald-300' };
      case 'blue': return { bg: 'bg-blue-50', icon: 'bg-blue-600', text: 'text-blue-700', border: 'border-blue-100', shadow: 'shadow-blue-100/50', hover: 'hover:border-blue-300' };
      case 'amber': return { bg: 'bg-amber-50', icon: 'bg-amber-600', text: 'text-amber-700', border: 'border-amber-100', shadow: 'shadow-amber-100/50', hover: 'hover:border-amber-300' };
      case 'violet': return { bg: 'bg-violet-50', icon: 'bg-violet-600', text: 'text-violet-700', border: 'border-violet-100', shadow: 'shadow-violet-100/50', hover: 'hover:border-violet-300' };
      case 'orange': return { bg: 'bg-orange-50', icon: 'bg-orange-600', text: 'text-orange-700', border: 'border-orange-100', shadow: 'shadow-orange-100/50', hover: 'hover:border-orange-300' };
      case 'rose': return { bg: 'bg-rose-50', icon: 'bg-rose-600', text: 'text-rose-700', border: 'border-rose-100', shadow: 'shadow-rose-100/50', hover: 'hover:border-rose-300' };
      case 'purple': return { bg: 'bg-purple-50', icon: 'bg-purple-600', text: 'text-purple-700', border: 'border-purple-100', shadow: 'shadow-purple-100/50', hover: 'hover:border-purple-300' };
      case 'sky': return { bg: 'bg-sky-50', icon: 'bg-sky-600', text: 'text-sky-700', border: 'border-sky-100', shadow: 'shadow-sky-100/50', hover: 'hover:border-sky-300' };
      case 'teal': return { bg: 'bg-teal-50', icon: 'bg-teal-600', text: 'text-teal-700', border: 'border-teal-100', shadow: 'shadow-teal-100/50', hover: 'hover:border-teal-300' };
      default: return { bg: 'bg-gray-50', icon: 'bg-gray-600', text: 'text-gray-700', border: 'border-gray-100', shadow: 'shadow-gray-100/50', hover: 'hover:border-gray-300' };
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center bg-gray-900 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/1200px-Government_Seal_of_Bangladesh.svg.png')] bg-contain bg-no-repeat bg-center mix-blend-overlay"></div>
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
             <button onClick={() => onNavigate('union')} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-green-600/20 active:scale-95">
                <Landmark className="w-5 h-5" /> ইউনিয়ন পরিষদ
             </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section>
        <div className="flex flex-col mb-10">
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">ডিজিটাল সেবাসমূহ</h2>
           <div className="h-1.5 w-16 bg-green-500 rounded-full mt-2"></div>
           <p className="text-gray-500 font-bold mt-4">নাগরিক জীবন সহজ করতে আমাদের সকল অনলাইন সার্ভিস</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const theme = getThemeClasses(service.theme);
            return (
              <button
                key={service.id}
                onClick={() => onNavigate(service.id)}
                aria-label={`${service.label} সেবায় যান: ${service.desc}`}
                className={`${theme.bg} p-6 md:p-8 rounded-[2.5rem] shadow-sm border ${theme.border} ${theme.hover} hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 text-left group flex items-center gap-6`}
              >
                <div className={`${theme.icon} shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl ${theme.shadow} group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                     <h3 className={`text-xl md:text-2xl font-black ${theme.text} truncate`}>{service.label}</h3>
                     <ArrowRight className={`w-5 h-5 ${theme.text} opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 line-clamp-2 font-medium">{service.desc}</p>
                </div>
              </button>
            );
          })}
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