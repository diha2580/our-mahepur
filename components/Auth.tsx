import React, { useState, useRef, useMemo } from 'react';
import { User, Mail, Phone, Lock, Camera, ArrowRight, Loader2, LogIn, Upload, ShieldCheck, ShieldAlert, Shield, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { loginUser, saveUser } from '../lib/store';
import { supabase } from '../lib/supabase';

interface AuthProps {
  onSuccess: (user: any) => void;
  onSwitch: () => void;
  mode: 'login' | 'signup';
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess, onSwitch, mode, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random()
  });

  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (pwd.length > 6) score += 1;
    if (pwd.length > 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    if (score <= 2) return { score: 33, label: 'দুর্বল (Weak)', color: 'bg-red-500', text: 'text-red-500', icon: ShieldAlert };
    if (score <= 4) return { score: 66, label: 'মাঝারি (Medium)', color: 'bg-yellow-500', text: 'text-yellow-500', icon: Shield };
    return { score: 100, label: 'শক্তিশালী (Strong)', color: 'bg-green-500', text: 'text-green-500', icon: ShieldCheck };
  }, [formData.password]);

  const compressAndResizeImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 200;
        let w = img.width, h = img.height;
        if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
        else { if (h > MAX) { w *= MAX / h; h = MAX; } }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressAndResizeImage(reader.result as string);
        setFormData({ ...formData, profilePic: compressed });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'signup') {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (authError) throw authError;

        if (authData.user) {
          const { error: profileError } = await supabase.from('profiles').insert([{
            id: authData.user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            profile_pic: formData.profilePic,
            role: 'user'
          }]);

          if (profileError) throw profileError;
          
          alert('সফল হয়েছে! আপনার ইমেইল যাচাই করুন (যদি প্রয়োজন হয়) এবং লগইন করুন।');
          onSwitch();
        }
      } else {
        const user = await loginUser(formData.email, formData.password);
        if (user) onSuccess(user);
        else setError('ইমেইল বা পাসওয়ার্ড ভুল!');
      }
    } catch (err: any) { 
      console.error(err);
      let msg = err.message || 'সমস্যা হয়েছে।';
      if (msg.includes('User already registered')) {
        msg = 'এই ইমেইলটি ইতিমধ্যে নিবন্ধিত। অনুগ্রহ করে লগইন করুন।';
      } else if (msg.includes('Invalid login credentials')) {
        msg = 'ইমেইল বা পাসওয়ার্ড ভুল!';
      }
      setError(msg); 
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-md mx-auto animate-in zoom-in duration-300 text-black">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        ফিরে যান
      </button>

      <div className="text-center mb-8">
        <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
          {mode === 'login' ? <LogIn className="w-10 h-10 text-green-600" /> : <User className="w-10 h-10 text-green-600" />}
        </div>
        <h2 className="text-3xl font-bold text-black">{mode === 'login' ? 'লগইন করুন' : 'নতুন অ্যাকাউন্ট'}</h2>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in shake duration-500"><AlertCircle className="w-5 h-5 text-red-600" /><p className="text-sm font-bold text-red-600">{error}</p></div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === 'signup' && (
          <><div className="flex justify-center mb-6"><div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}><img src={formData.profilePic || undefined} className="w-24 h-24 rounded-full border-4 border-green-50 object-cover bg-gray-50 shadow-md" alt="Profile" /><button type="button" className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-lg"><Camera className="w-4 h-4 text-white" /></button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} /></div></div>
            <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /><input required type="text" placeholder="পুরো নাম" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-100 transition-all text-black" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
            <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /><input required type="tel" placeholder="ফোন নম্বর" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-100 transition-all text-black" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div></>
        )}
        <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /><input required type="email" placeholder="ইমেইল অ্যাড্রেস" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-100 transition-all text-black" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
        <div className="space-y-2"><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /><input required type={showPassword ? "text" : "password"} placeholder="পাসওয়ার্ড" className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-100 transition-all text-black" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
        <button disabled={loading} type="submit" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : (mode === 'login' ? <span className="text-white">প্রবেশ করুন</span> : <span className="text-white">নিবন্ধন সম্পন্ন করুন</span>)}
          {!loading && <ArrowRight className="w-5 h-5 text-white" />}
        </button>
      </form>
      <div className="mt-8 text-center text-sm text-black opacity-60">{mode === 'login' ? 'নতুন ইউজার?' : 'ইতিমধ্যেই অ্যাকাউন্ট আছে?'} <button onClick={onSwitch} className="ml-2 text-green-600 font-bold hover:underline">{mode === 'login' ? 'নিবন্ধন করুন' : 'লগইন করুন'}</button></div>
    </div>
  );
};

export default Auth;