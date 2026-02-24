import React, { useState } from 'react';
import { Map, ArrowRight, Landmark, Layers, Share2, Mail, Facebook, MessageCircle, Copy, Check, X, ArrowLeft, Play, ChevronDown, ChevronUp, MonitorPlay, Info } from 'lucide-react';
import { getPortalData } from '../lib/store';

interface LandServicesProps {
  onBack: () => void;
}

const LandServices: React.FC<LandServicesProps> = ({ onBack }) => {
  const data = getPortalData();
  const services = data?.landServices || [];
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedTutorialId, setExpandedTutorialId] = useState<string | null>(null);

  const shareUrl = window.location.href;
  const shareTitle = "Our Mahespur - ডিজিটাল ভূমি সেবা পোর্টাল";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTutorial = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedTutorialId(expandedTutorialId === id ? null : id);
  };

  const shareOptions = [
    { 
      name: 'ফেসবুক', 
      icon: Facebook, 
      color: 'bg-[#1877F2]', 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` 
    },
    { 
      name: 'হোয়াটসঅ্যাপ', 
      icon: MessageCircle, 
      color: 'bg-[#25D366]', 
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}` 
    },
    { 
      name: 'ইমেইল', 
      icon: Mail, 
      color: 'bg-gray-600', 
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}` 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            aria-label="হোম পেজে ফিরে যান"
            className="flex items-center gap-2 text-gray-500 hover:text-amber-700 font-bold transition-colors group"
          >
            <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-amber-50 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            ফিরে যান
          </button>
          <div>
            <h2 id="page-title" className="text-3xl font-black text-gray-900">ভূমি সেবা পোর্টাল</h2>
            <div className="h-1.5 w-16 bg-amber-500 rounded-full mt-1"></div>
          </div>
        </div>
        <button 
          onClick={() => setShowShareModal(true)}
          aria-haspopup="dialog"
          aria-expanded={showShareModal}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-all shadow-sm active:scale-95"
        >
          <Share2 className="w-4 h-4" /> শেয়ার করুন
        </button>
      </div>

      <div className="bg-amber-600 p-10 rounded-3xl text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">ডিজিটাল ভূমি সেবা</h2>
          <p className="opacity-90 font-medium leading-relaxed">নামজারি আবেদন, খতিয়ান অনুসন্ধান এবং ভূমি উন্নয়ন কর এখন ঘরে বসেই সম্পাদন করুন। দালালের হয়রানি মুক্ত আধুনিক ভূমি সেবা।</p>
        </div>
        <Map className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {services.map((app: any) => (
          <div 
            key={app.id} 
            className={`bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl ${expandedTutorialId === app.id ? 'ring-2 ring-amber-500/20' : ''}`}
          >
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl">
                     <Landmark className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{app.title}</h3>
                    <p className="text-sm text-gray-500 font-bold mt-1 uppercase tracking-wider">ভূমি মন্ত্রণালয় কর্তৃক অনুমোদিত</p>
                  </div>
                </div>
                
                <p className="text-gray-600 font-medium leading-relaxed mb-8">
                  {app.desc}. এই সেবার মাধ্যমে আপনি সরাসরি অনলাইনে আপনার জমির যাবতীয় কার্যাদি সম্পন্ন করতে পারবেন।
                </p>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href={app.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-amber-600/20 active:scale-95 group"
                  >
                    সেবা গ্রহণ করুন <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button 
                    onClick={(e) => toggleTutorial(app.id, e)}
                    aria-expanded={expandedTutorialId === app.id}
                    className={`inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-black transition-all active:scale-95 ${
                      expandedTutorialId === app.id 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MonitorPlay className="w-5 h-5" /> 
                    {expandedTutorialId === app.id ? 'টিউটোরিয়াল বন্ধ করুন' : 'কিভাবে করবেন? (ভিডিও)'}
                    {expandedTutorialId === app.id ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Tutorial Section */}
              {expandedTutorialId === app.id && (
                <div className="md:w-[350px] animate-in slide-in-from-right duration-500 flex flex-col gap-4">
                   <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl group/video">
                      <iframe 
                        className="w-full h-full"
                        src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=1&autoplay=0" 
                        title={`${app.title} Tutorial`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none group-hover/video:bg-black/20 transition-colors">
                        <div className="w-16 h-16 bg-amber-600/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                           <Play className="w-8 h-8 fill-current" />
                        </div>
                      </div>
                   </div>
                   <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg text-amber-600 shadow-sm"><Info className="w-4 h-4" /></div>
                      <p className="text-[11px] font-bold text-amber-800 leading-tight">
                        ভিডিওটি মনোযোগ দিয়ে দেখুন। আবেদনের সময় সঠিক তথ্য ও এনআইডি কপি সাথে রাখুন।
                      </p>
                   </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-white p-10 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center space-x-6">
            <div className="bg-amber-100 text-amber-700 p-6 rounded-[1.5rem] shadow-inner shadow-amber-200/50">
               <Layers className="w-10 h-10" />
            </div>
            <div>
               <div className="text-2xl font-black text-gray-800">নামজারি আবেদনের পূর্ণাঙ্গ নির্দেশিকা</div>
               <div className="text-base text-gray-500 font-medium">আবেদন করার আগে প্রয়োজনীয় সকল শর্তাবলী ও ধাপগুলো বিস্তারিত দেখে নিন।</div>
            </div>
         </div>
         <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl text-lg font-black hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200">পিডিএফ ডাউনলোড করুন</button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
          role="presentation"
        >
          <div 
            className="bg-white rounded-[2.5rem] w-full max-w-sm shadow-2xl animate-in zoom-in duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h4 id="share-modal-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-600" />
                শেয়ার করুন
              </h4>
              <button 
                onClick={() => setShowShareModal(false)} 
                aria-label="বন্ধ করুন"
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <a 
                    key={option.name} 
                    href={option.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col items-center gap-2 group"
                    aria-label={`${option.name} এ শেয়ার করুন`}
                  >
                    <div className={`${option.color} text-white p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform active:scale-95`}>
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-600">{option.name}</span>
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                <label htmlFor="share-link-input" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">লিঙ্ক কপি করুন</label>
                <div className="flex items-center gap-2 p-1 bg-gray-50 border border-gray-200 rounded-2xl focus-within:ring-2 focus-within:ring-amber-100 transition-all">
                  <input 
                    id="share-link-input"
                    type="text" 
                    readOnly 
                    value={shareUrl} 
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-500 outline-none font-medium truncate" 
                  />
                  <button 
                    onClick={handleCopyLink} 
                    aria-label={copied ? "লিঙ্ক কপি হয়েছে" : "লিঙ্ক কপি করুন"}
                    className={`${copied ? 'bg-green-600' : 'bg-amber-600 hover:bg-amber-700'} text-white p-2.5 rounded-xl transition-all active:scale-90`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandServices;
