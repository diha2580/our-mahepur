import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { saveContactMessage } from '../lib/store';

interface ContactProps {
  contactInfo?: {
    address: string;
    email: string;
    phone: string;
    supportText: string;
  };
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ contactInfo, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveContactMessage(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending message", error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-700 pb-16">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition-colors group"
        >
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-green-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          ফিরে যান
        </button>
        <div className="h-8 w-px bg-gray-200"></div>
        <h2 className="text-3xl font-black text-gray-900">যোগাযোগ করুন</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-6">যোগাযোগের ঠিকানা</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-2xl text-green-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ঠিকানা</p>
                  <p className="text-sm font-bold text-gray-700">{contactInfo?.address || 'উপজেলা পরিষদ কমপ্লেক্স, মহেশপুর, ঝিনাইদহ'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ইমেইল</p>
                  <p className="text-sm font-bold text-gray-700">{contactInfo?.email || 'info@moheshpur.gov.bd'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ফোন</p>
                  <p className="text-sm font-bold text-gray-700">{contactInfo?.phone || '০১৭০০-০০০০০০'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-600 p-8 rounded-[2.5rem] shadow-xl text-white">
            <h3 className="text-xl font-black mb-4">সহায়তা প্রয়োজন?</h3>
            <p className="text-sm font-medium opacity-80 mb-6">{contactInfo?.supportText || 'আমাদের সাপোর্ট টিম ২৪/৭ আপনার সেবায় নিয়োজিত। যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।'}</p>
            <button className="w-full py-4 bg-white text-green-600 rounded-2xl font-black text-sm hover:bg-green-50 transition-all">
              সরাসরি কল করুন
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            {isSuccess ? (
              <div className="py-12 text-center space-y-6 animate-in zoom-in duration-500">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center text-green-600 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">বার্তা পাঠানো হয়েছে!</h3>
                <p className="text-gray-500 font-bold max-w-md mx-auto">আপনার বার্তার জন্য ধন্যবাদ। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">আপনার নাম</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="নাম লিখুন"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-green-50 focus:bg-white transition-all text-black font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">ইমেইল ঠিকানা</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ইমেইল লিখুন"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-green-50 focus:bg-white transition-all text-black font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">বিষয়</label>
                  <input 
                    required
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="বার্তার বিষয়"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-green-50 focus:bg-white transition-all text-black font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">আপনার বার্তা</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="আপনার বিস্তারিত বার্তা এখানে লিখুন..."
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-green-50 focus:bg-white transition-all text-black font-medium resize-none"
                  ></textarea>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-5 bg-green-600 text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <>বার্তা পাঠানো হচ্ছে...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      বার্তা পাঠান
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
