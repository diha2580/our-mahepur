import React, { useState, useRef } from 'react';
import { User, Mail, Phone, Camera, Save, LogOut, Edit3, Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { updateUser } from '../lib/store';

interface ProfileProps {
  user: any;
  onUpdate: (user: any) => void;
  onLogout: () => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressAndResizeImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;
        if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } }
        else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
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
        setFormData({ ...formData, profile_pic: compressed });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await updateUser(formData);
      if (updated) {
        onUpdate(updated);
        setIsEditing(false);
        alert('প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
      }
    } catch {
      alert('প্রোফাইল আপডেট করতে সমস্যা হয়েছে।');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 text-black">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition-colors group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-green-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        ফিরে যান
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-black">আমার প্রোফাইল</h2>
          <p className="text-black opacity-60">আপনার ব্যক্তিগত তথ্য পরিচালনা করুন</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"><LogOut className="w-5 h-5" /> লগআউট</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center sticky top-24">
            <div className="relative inline-block mb-6">
              <img src={(isEditing ? formData.profile_pic : user.profile_pic) || null} className="w-32 h-32 rounded-full border-4 border-green-50 object-cover bg-gray-50 shadow-md mx-auto" alt="Profile" />
              {isEditing && <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-green-600 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform"><Camera className="w-5 h-5 text-white" /></button>}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">{user.name}</h3>
            <p className="text-green-600 font-bold text-sm mb-4 flex items-center justify-center gap-1">{user.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}{user.role === 'admin' ? 'অ্যাডমিন' : 'সাধারণ ইউজার'}</p>
            <div className="bg-gray-50 p-4 rounded-2xl text-left space-y-3 mb-6">
               <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-gray-400" /><span className="truncate">{user.email}</span></div>
               <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-gray-400" /><span>{user.phone}</span></div>
            </div>
            {!isEditing && <button onClick={() => setIsEditing(true)} className="w-full bg-black text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"><Edit3 className="w-4 h-4 text-white" /> প্রোফাইল এডিট করুন</button>}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <h4 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100">অ্যাকাউন্ট তথ্য</h4>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black opacity-60">পুরো নাম</label>
                  <input disabled={!isEditing} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-100 disabled:bg-gray-50 transition-all text-black" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black opacity-60">মোবাইল নম্বর</label>
                  <input disabled={!isEditing} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-100 disabled:bg-gray-50 transition-all text-black" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black opacity-60">ইমেইল অ্যাড্রেস</label>
                <input disabled className="w-full border border-gray-200 p-3 rounded-xl outline-none bg-gray-50 opacity-60 text-black" value={user.email} />
              </div>
              {isEditing && (
                <div className="flex gap-3 pt-6 border-t border-gray-100">
                  <button onClick={() => {setIsEditing(false); setFormData({...user});}} className="flex-1 bg-gray-100 text-black py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all">বাতিল</button>
                  <button onClick={handleSave} disabled={isSaving} className="flex-1 bg-green-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg shadow-green-100 transition-all disabled:opacity-50">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4 text-white" />}
                    {isSaving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;