import React, { useState, useEffect } from 'react';
import { getPortalData, updatePortalData, getComplaints, deleteComplaint, updateComplaint, updateAdminPassword } from '../lib/store';
import { 
  Settings, Plus, Edit2, Trash2, Save, X, Phone, MapPin, 
  User, Mail, FileText, Calendar, MessageSquareText, Send, Loader2, 
  ShieldCheck, Layout, HeartPulse, GraduationCap, Eye, EyeOff, Lock, 
  Database, ArrowLeft 
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { formatPhoneForDialer } from '../lib/utils';

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [data, setData] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('emergencyContacts');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const portalData = getPortalData();
      const storedComplaints = await getComplaints();
      setData(portalData);
      setComplaints(storedComplaints);
    };
    loadData();
  }, []);

  if (!data) return <div className="p-10 text-center text-black">লোড হচ্ছে...</div>;

  const handleSaveAll = async () => {
    await updatePortalData(data);
    alert('তথ্য সফলভাবে সেভ করা হয়েছে!');
    window.dispatchEvent(new Event('storage'));
  };

  const handlePasswordUpdate = () => {
    if (newPassword.length < 6) { alert('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!'); return; }
    setIsUpdatingPassword(true);
    setTimeout(() => {
      updateAdminPassword(newPassword);
      setIsUpdatingPassword(false);
      setNewPassword('');
      alert('অ্যাডমিন পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে!');
    }, 800);
  };

  const handleDelete = async (category: string, id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) return;
    const newData = { ...data };
    newData[category] = newData[category].filter((item: any) => item.id !== id);
    setData(newData);
    await updatePortalData(newData);
  };

  const handleDeleteComplaint = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই অভিযোগটি ডিলিট করতে চান?')) return;
    await deleteComplaint(id);
    setComplaints(await getComplaints());
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedComplaint) return;
    setIsReplying(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `A citizen named ${selectedComplaint.name} made a complaint about "${selectedComplaint.subject}". Admin's brief note for reply: "${replyText}". Write a professional reply in Bengali.`,
      });
      const professionalReply = response.text || replyText;
      const updated = await updateComplaint(selectedComplaint.id, { reply: professionalReply, repliedAt: new Date().toLocaleString('bn-BD'), status: 'Resolved' });
      if (updated) {
        setReplyText('');
        setSelectedComplaint(null);
        setComplaints(await getComplaints());
      }
    } catch (error) {
      alert("উত্তর পাঠাতে সমস্যা হয়েছে।");
    } finally { setIsReplying(false); }
  };

  const startEdit = (item: any) => setEditingItem({ ...item });
  const getInitialItem = (tab: string) => {
    switch (tab) {
      case 'eApplications': return { id: Date.now().toString(), title: '', link: '' };
      case 'districtOfficials': return { id: Date.now().toString(), name: '', designation: '', office: '', phone: '', email: '' };
      case 'healthFacilities': return { id: Date.now().toString(), name: '', type: 'Government', location: '', phone: '', speciality: [] };
      case 'touristSpots': return { id: Date.now().toString(), name: '', description: '', image: '', location: '' };
      case 'educationData': return { id: Date.now().toString(), name: '', type: 'School', location: '', phone: '' };
      case 'navItems': return { id: '', label: '', icon: 'Home' };
      default: return { id: Date.now().toString(), name: '', phone: '', location: '', type: 'Fire' };
    }
  };

  const saveEdit = async () => {
    const newData = { ...data };
    const currentList = newData[activeTab] || [];
    const index = currentList.findIndex((i: any) => i.id === editingItem.id);
    if (index > -1) currentList[index] = editingItem;
    else currentList.push(editingItem);
    newData[activeTab] = currentList;
    setData(newData);
    await updatePortalData(newData);
    setEditingItem(null);
  };

  const tabs = [
    { id: 'emergencyContacts', label: 'জরুরি সেবা', icon: Phone },
    { id: 'districtOfficials', label: 'কর্মকর্তা', icon: User },
    { id: 'healthFacilities', label: 'স্বাস্থ্য সেবা', icon: HeartPulse },
    { id: 'educationData', label: 'শিক্ষা', icon: GraduationCap },
    { id: 'touristSpots', label: 'পর্যটন', icon: MapPin },
    { id: 'eApplications', label: 'ই-আবেদন', icon: FileText },
    { id: 'navItems', label: 'মেনু বার', icon: Layout },
    { id: 'complaints', label: 'অভিযোগ', icon: MessageSquareText },
    { id: 'settings', label: 'সেটিংস', icon: Settings },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px] border border-gray-100 text-black flex flex-col">
      <div className="bg-gray-900 text-white p-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-xl transition-colors text-blue-400">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold">অ্যাডমিন কন্ট্রোল প্যানেল</h2>
          </div>
        </div>
        {activeTab !== 'settings' && activeTab !== 'complaints' && (
          <button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all text-white"><Save className="w-4 h-4 text-white" /> তথ্য সেভ করুন</button>
        )}
      </div>

      <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto shrink-0">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${activeTab === tab.id ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-black hover:text-gray-700'}`}><tab.icon className="w-4 h-4" />{tab.label}</button>
        ))}
      </div>

      <div className="p-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-black">{tabs.find(t => t.id === activeTab)?.label}</h3>
          {activeTab !== 'complaints' && activeTab !== 'settings' && (
            <button onClick={() => setEditingItem(getInitialItem(activeTab))} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 font-bold transition-all active:scale-95"><Plus className="w-4 h-4 text-white" /> নতুন যোগ করুন</button>
          )}
        </div>

        {activeTab === 'settings' ? (
          <div className="max-w-md mx-auto space-y-8 animate-in slide-in-from-bottom duration-300">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6"><div className="bg-blue-100 p-2 rounded-xl"><Lock className="w-6 h-6 text-blue-600" /></div><h4 className="text-lg font-bold">অ্যাডমিন পাসওয়ার্ড পরিবর্তন</h4></div>
              <div className="space-y-4">
                <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /><input type={showNewPassword ? "text" : "password"} placeholder="নতুন পাসওয়ার্ড লিখুন" className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-black" value={newPassword} onChange={e => setNewPassword(e.target.value)} /><button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">{showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div>
                <button onClick={handlePasswordUpdate} disabled={isUpdatingPassword || !newPassword} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">{isUpdatingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}<span>পাসওয়ার্ড আপডেট করুন</span></button>
              </div>
            </div>
          </div>
        ) : activeTab === 'complaints' ? (
          <div className="grid grid-cols-1 gap-4 text-black">
            {complaints.length === 0 ? <div className="py-20 text-center text-gray-400 italic bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">এখনো কোনো অভিযোগ জমা পড়েনি।</div> :
              complaints.map((c) => (
                <div key={c.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2"><span className={`text-xs font-bold px-2 py-1 rounded-md ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>{c.status === 'Resolved' ? 'সমাধানকৃত' : c.subject}</span><span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.date}</span></div>
                      <h4 className="text-lg font-bold text-black mb-3">{c.message}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-sm"><User className="w-4 h-4 text-gray-400" /><b>{c.name}</b></div>
                        <a href={`tel:${formatPhoneForDialer(c.phone)}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><Phone className="w-4 h-4 text-gray-400" />{c.phone}</a>
                        <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-gray-400" />{c.email}</div>
                      </div>
                    </div>
                    <div className="flex md:flex-col justify-end gap-2"><button onClick={() => setSelectedComplaint(c)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-sm font-bold"><MessageSquareText className="w-4 h-4" /> উত্তর দিন</button><button onClick={() => handleDeleteComplaint(c.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button></div>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-black text-xs uppercase font-bold"><th className="px-4 py-3">{activeTab === 'navItems' ? 'আইডি' : 'নাম/শিরোনাম'}</th><th className="px-4 py-3">{activeTab === 'navItems' ? 'লেবেল' : 'তথ্য/অবস্থান'}</th><th className="px-4 py-3 text-right">অ্যাকশন</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-black">
                {(data[activeTab] || []).map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 font-bold">{item.id || item.name || item.title}</td>
                    <td className="px-4 py-4 text-sm opacity-70">{item.label || item.location || item.office || item.link}</td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <button onClick={() => startEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(activeTab, item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-200 overflow-hidden text-black flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0"><h4 className="text-xl font-bold">তথ্য সংশোধন/সংযোজন</h4><button onClick={() => setEditingItem(null)}><X className="w-6 h-6 text-gray-400" /></button></div>
            <div className="p-8 space-y-4 overflow-y-auto max-h-[70vh]">
              {activeTab === 'emergencyContacts' && (<><input placeholder="নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} /><input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} /><input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} /><select className="w-full p-3 border rounded-xl" value={editingItem.type} onChange={e => setEditingItem({...editingItem, type: e.target.value})}><option value="Fire">ফায়ার সার্ভিস</option><option value="Police">পুলিশ</option><option value="Ambulance">অ্যাম্বুলেন্স</option></select></>)}
              {activeTab === 'districtOfficials' && (<><input placeholder="নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} /><input placeholder="পদবি" className="w-full p-3 border rounded-xl" value={editingItem.designation} onChange={e => setEditingItem({...editingItem, designation: e.target.value})} /><input placeholder="অফিস" className="w-full p-3 border rounded-xl" value={editingItem.office} onChange={e => setEditingItem({...editingItem, office: e.target.value})} /><input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} /><input placeholder="ইমেইল" className="w-full p-3 border rounded-xl" value={editingItem.email} onChange={e => setEditingItem({...editingItem, email: e.target.value})} /></>)}
              {activeTab === 'educationData' && (<><input placeholder="প্রতিষ্ঠানের নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} /><input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} /><input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} /><select className="w-full p-3 border rounded-xl" value={editingItem.type} onChange={e => setEditingItem({...editingItem, type: e.target.value})}><option value="School">স্কুল</option><option value="College">কলেজ</option><option value="University">বিশ্ববিদ্যালয়</option></select></>)}
              {activeTab === 'navItems' && (<><input placeholder="আইডি" className="w-full p-3 border rounded-xl" value={editingItem.id} onChange={e => setEditingItem({...editingItem, id: e.target.value})} /><input placeholder="লেবেল" className="w-full p-3 border rounded-xl" value={editingItem.label} onChange={e => setEditingItem({...editingItem, label: e.target.value})} /><input placeholder="আইকন" className="w-full p-3 border rounded-xl" value={editingItem.icon} onChange={e => setEditingItem({...editingItem, icon: e.target.value})} /></>)}
            </div>
            <div className="p-6 bg-gray-50 flex gap-3 shrink-0"><button onClick={() => setEditingItem(null)} className="flex-1 py-3 bg-white border rounded-xl font-bold">বাতিল</button><button onClick={saveEdit} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">সেভ করুন</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;