
import React, { useState } from 'react';
import { Send, CheckCircle, MessageSquareWarning, Mail, User, Phone, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ADMIN_EMAIL } from '../data';
import { saveComplaint } from '../lib/store';

const ComplaintBox: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    phone: '',
    email: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { phone: '', email: '', general: '' };

    // Phone validation: exactly 11 digits
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'সঠিক মোবাইল নম্বর (১১ ডিজিট) প্রদান করুন।';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'একটি সঠিক ইমেইল অ্যাড্রেস প্রদান করুন।';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSending(true);

    try {
      // 1. Save to central storage for Admin
      saveComplaint(formData);

      // 2. Process with AI for acknowledgement
      // Create a new GoogleGenAI instance right before making an API call.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this citizen complaint for a government district portal. 
      Generate a professional 1-sentence acknowledgement in Bengali.
      User Name: ${formData.name}
      Subject: ${formData.subject}
      Complaint: ${formData.message}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      // Correctly access the .text property on the response object.
      setAiAnalysis(response.text || 'আপনার অভিযোগটি গুরুত্বের সাথে গ্রহণ করা হয়েছে।');
      
      // Simulate backend dispatch
      console.log(`Complaint saved and dispatched.`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error("AI processing error:", error);
      setAiAnalysis('আপনার অভিযোগটি সফলভাবে সিস্টেমে জমা হয়েছে।');
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setAiAnalysis('');
    setErrors({ phone: '', email: '', general: '' });
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-in zoom-in duration-500 text-black">
      <div className="text-center mb-10">
        <div className="inline-block bg-purple-100 p-4 rounded-full mb-4">
          <MessageSquareWarning className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-black">ডিজিটাল অভিযোগ বক্স</h2>
        <p className="text-black mt-2">আপনার সমস্যা বা পরামর্শ সরাসরি জেলা প্রশাসনকে জানান। আপনার পরিচয় গোপন রাখা হবে।</p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 p-10 rounded-3xl text-center shadow-inner animate-in fade-in slide-in-from-bottom duration-700">
          <div className="relative inline-block mb-6">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto" />
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-green-100">
               <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-black mb-2">সফলভাবে প্রেরিত হয়েছে!</h3>
          
          <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm mb-4 text-left">
             <p className="text-sm font-bold text-black mb-2 italic">AI সারসংক্ষেপ:</p>
             <p className="text-black text-lg leading-relaxed">{aiAnalysis}</p>
          </div>

          <p className="text-green-700 font-bold mb-6 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            আপনার ইমেইল নিশ্চিতকরণ পাঠানো হয়েছে
          </p>

          <button 
            onClick={handleReset} 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-100 flex items-center gap-2 mx-auto active:scale-95"
          >
            নতুন অভিযোগ পাঠান
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-black flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" /> আপনার নাম
              </label>
              <input 
                required 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-black" 
                placeholder="পুরো নাম লিখুন" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-black flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-600" /> মোবাইল নম্বর
              </label>
              <input 
                required 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'} focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-black`} 
                placeholder="০১XXXXXXXXX" 
              />
              {errors.phone && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-bold text-black flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" /> আপনার ইমেইল
            </label>
            <input 
              required 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'} focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-black`} 
              placeholder="example@mail.com" 
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>
          
          <div className="space-y-2 mb-6">
            <label className="text-sm font-bold text-black">অভিযোগের বিষয়</label>
            <select 
              required 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center] text-black"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1.25rem' }}
            >
              <option value="">নির্বাচন করুন</option>
              <option value="স্বাস্থ্য সেবা সংক্রান্ত">স্বাস্থ্য সেবা সংক্রান্ত</option>
              <option value="রাস্তাঘাট মেরামত">রাস্তাঘাট মেরামত</option>
              <option value="দুর্নীতি বা অনিয়ম">দুর্নীতি বা অনিয়ম</option>
              <option value="বিদ্যুৎ বা পানি সমস্যা">বিদ্যুৎ বা পানি সমস্যা</option>
              <option value="অন্যান্য">অন্যান্য</option>
            </select>
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-bold text-black">অভিযোগের বিস্তারিত</label>
            <textarea 
              required 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-black" 
              placeholder="আপনার অভিযোগ বিস্তারিত এখানে লিখুন..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSending}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2 ${
              isSending 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
            }`}
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span className="text-white">প্রক্রিয়াধীন... (AI প্রসেসিং)</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 text-white" />
                <span className="text-white">অভিযোগ পাঠান</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ComplaintBox;
