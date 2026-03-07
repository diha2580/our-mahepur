import React, { useState, useEffect } from 'react';
import { getPortalData, updatePortalData, getComplaints, deleteComplaint, updateAdminPassword } from '../lib/store';
import { 
  Settings, Plus, Edit2, Trash2, Save, X, Phone, MapPin, 
  User, Mail, Calendar, MessageSquareText, Loader2, 
  Layout, HeartPulse, GraduationCap, Eye, EyeOff, Lock, 
  ArrowLeft, Camera, Droplets, Pill, Landmark
} from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { formatPhoneForDialer } from '../lib/utils';

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [data, setData] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('emergencyContacts');
  const [editingItem, setEditingItem] = useState<any>(null);
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
    newData[category] = newData[category].filter((item: any) => String(item.id) !== String(id));
    setData(newData);
    await updatePortalData(newData);
  };

  const handleDeleteComplaint = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই অভিযোগটি ডিলিট করতে চান?')) return;
    await deleteComplaint(id);
    setComplaints(await getComplaints());
  };

  const startEdit = (item: any) => setEditingItem({ ...item });
  const getInitialItem = (tab: string) => {
    switch (tab) {
      case 'districtOfficials': return { id: Date.now().toString(), name: '', designation: '', office: '', phone: '', email: '' };
      case 'healthFacilities': return { id: Date.now().toString(), name: '', type: 'Government', location: '', phone: '', speciality: [], doctors: [] };
      case 'touristSpots': return { id: Date.now().toString(), name: '', description: '', image: '', location: '' };
      case 'educationData': return { id: Date.now().toString(), name: '', type: 'School', location: '', phone: '' };
      case 'navItems': return { id: '', label: '', icon: 'Home' };
      case 'bloodDonors': return { id: Date.now().toString(), name: '', bloodGroup: 'O+', phone: '', location: '', lastDonationDate: new Date().toISOString().split('T')[0], isAvailable: true };
      case 'pharmacies': return { id: Date.now().toString(), name: '', location: '', phone: '', isOpen24Hours: false, deliveryAvailable: false };
      case 'landServices': return { id: Date.now().toString(), title: '', link: '', desc: '' };
      case 'unionData': return { id: Date.now().toString(), name: '', chairman: '', phone: '', location: '', website: '' };
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
    { id: 'bloodDonors', label: 'রক্তদান', icon: Droplets },
    { id: 'pharmacies', label: 'ফার্মেসি', icon: Pill },
    { id: 'landServices', label: 'ভূমি সেবা', icon: Landmark },
    { id: 'unionData', label: 'ইউনিয়ন পরিষদ', icon: Landmark },
    { id: 'navItems', label: 'মেনু বার', icon: Layout },
    { id: 'contactInfo', label: 'যোগাযোগ তথ্য', icon: Phone },
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
          {activeTab !== 'complaints' && activeTab !== 'settings' && activeTab !== 'contactInfo' && (
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
        ) : activeTab === 'contactInfo' ? (
          <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom duration-300">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-black opacity-60">ঠিকানা</label>
                <input className="w-full p-3 border rounded-xl" value={data.contactInfo?.address || ''} onChange={e => setData({...data, contactInfo: {...data.contactInfo, address: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black opacity-60">ইমেইল</label>
                <input className="w-full p-3 border rounded-xl" value={data.contactInfo?.email || ''} onChange={e => setData({...data, contactInfo: {...data.contactInfo, email: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black opacity-60">ফোন</label>
                <input className="w-full p-3 border rounded-xl" value={data.contactInfo?.phone || ''} onChange={e => setData({...data, contactInfo: {...data.contactInfo, phone: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black opacity-60">সহায়তা টেক্সট</label>
                <textarea className="w-full p-3 border rounded-xl" rows={3} value={data.contactInfo?.supportText || ''} onChange={e => setData({...data, contactInfo: {...data.contactInfo, supportText: e.target.value}})} />
              </div>
              <button onClick={handleSaveAll} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                <span>তথ্য সেভ করুন</span>
              </button>
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
                    <div className="flex md:flex-col justify-end gap-2"><button onClick={() => handleDeleteComplaint(c.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button></div>
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
          <div className={`bg-white rounded-3xl w-full ${activeTab === 'healthFacilities' ? 'max-w-2xl' : 'max-w-lg'} shadow-2xl animate-in zoom-in duration-200 overflow-hidden text-black flex flex-col`}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0"><h4 className="text-xl font-bold">তথ্য সংশোধন/সংযোজন</h4><button onClick={() => setEditingItem(null)}><X className="w-6 h-6 text-gray-400" /></button></div>
            <div className="p-8 space-y-4 overflow-y-auto max-h-[70vh]">
              {activeTab === 'emergencyContacts' && (<><input placeholder="নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} /><input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} /><input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} /><select className="w-full p-3 border rounded-xl" value={editingItem.type} onChange={e => setEditingItem({...editingItem, type: e.target.value})}><option value="Fire">ফায়ার সার্ভিস</option><option value="Police">পুলিশ</option><option value="Ambulance">অ্যাম্বুলেন্স</option></select></>)}
              {activeTab === 'districtOfficials' && (<><input placeholder="নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} /><input placeholder="পদবি" className="w-full p-3 border rounded-xl" value={editingItem.designation} onChange={e => setEditingItem({...editingItem, designation: e.target.value})} /><input placeholder="অফিস" className="w-full p-3 border rounded-xl" value={editingItem.office} onChange={e => setEditingItem({...editingItem, office: e.target.value})} /><input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} /><input placeholder="ইমেইল" className="w-full p-3 border rounded-xl" value={editingItem.email} onChange={e => setEditingItem({...editingItem, email: e.target.value})} /></>)}
              {activeTab === 'healthFacilities' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h5 className="font-bold text-blue-600 border-b pb-2">হাসপাতাল তথ্য</h5>
                    <input placeholder="হাসপাতালের নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                    <input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} />
                    <input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} />
                    <select className="w-full p-3 border rounded-xl" value={editingItem.type} onChange={e => setEditingItem({...editingItem, type: e.target.value})}>
                      <option value="Government">সরকারি</option>
                      <option value="Private">বেসরকারি</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h5 className="font-bold text-blue-600">ডাক্তারদের তালিকা</h5>
                      <button 
                        onClick={() => {
                          const newDoctor = { id: Date.now().toString(), name: '', phone: '', specialist: '', degree: '', viewingTime: '' };
                          setEditingItem({ ...editingItem, doctors: [...(editingItem.doctors || []), newDoctor] });
                        }}
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold hover:bg-blue-100"
                      >
                        + ডাক্তার যোগ করুন
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {(editingItem.doctors || []).map((doc: any, idx: number) => (
                        <div key={doc.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 relative">
                          <button 
                            onClick={() => {
                              const newDocs = editingItem.doctors.filter((_: any, i: number) => i !== idx);
                              setEditingItem({ ...editingItem, doctors: newDocs });
                            }}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <input placeholder="ডাক্তারের নাম" className="w-full p-2 text-sm border rounded-lg" value={doc.name} onChange={e => {
                            const newDocs = [...editingItem.doctors];
                            newDocs[idx].name = e.target.value;
                            setEditingItem({ ...editingItem, doctors: newDocs });
                          }} />
                          <div className="grid grid-cols-2 gap-2">
                            <input placeholder="স্পেশালিস্ট" className="w-full p-2 text-sm border rounded-lg" value={doc.specialist} onChange={e => {
                              const newDocs = [...editingItem.doctors];
                              newDocs[idx].specialist = e.target.value;
                              setEditingItem({ ...editingItem, doctors: newDocs });
                            }} />
                            <input placeholder="ডিগ্রি" className="w-full p-2 text-sm border rounded-lg" value={doc.degree} onChange={e => {
                              const newDocs = [...editingItem.doctors];
                              newDocs[idx].degree = e.target.value;
                              setEditingItem({ ...editingItem, doctors: newDocs });
                            }} />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input placeholder="ফোন" className="w-full p-2 text-sm border rounded-lg" value={doc.phone} onChange={e => {
                              const newDocs = [...editingItem.doctors];
                              newDocs[idx].phone = e.target.value;
                              setEditingItem({ ...editingItem, doctors: newDocs });
                            }} />
                            <input placeholder="রোগী দেখার সময়" className="w-full p-2 text-sm border rounded-lg" value={doc.viewingTime} onChange={e => {
                              const newDocs = [...editingItem.doctors];
                              newDocs[idx].viewingTime = e.target.value;
                              setEditingItem({ ...editingItem, doctors: newDocs });
                            }} />
                          </div>
                        </div>
                      ))}
                      {(editingItem.doctors || []).length === 0 && (
                        <p className="text-center text-xs text-gray-400 py-4">কোনো ডাক্তার যোগ করা হয়নি</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'educationData' && (<><input placeholder="প্রতিষ্ঠানের নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} /><input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} /><input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} /><select className="w-full p-3 border rounded-xl" value={editingItem.type} onChange={e => setEditingItem({...editingItem, type: e.target.value})}><option value="School">স্কুল</option><option value="College">কলেজ</option><option value="University">বিশ্ববিদ্যালয়</option></select></>)}
              {activeTab === 'navItems' && (<><input placeholder="আইডি" className="w-full p-3 border rounded-xl" value={editingItem.id} onChange={e => setEditingItem({...editingItem, id: e.target.value})} /><input placeholder="লেবেল" className="w-full p-3 border rounded-xl" value={editingItem.label} onChange={e => setEditingItem({...editingItem, label: e.target.value})} /><input placeholder="আইকন" className="w-full p-3 border rounded-xl" value={editingItem.icon} onChange={e => setEditingItem({...editingItem, icon: e.target.value})} /></>)}
              {activeTab === 'touristSpots' && (
                <div className="space-y-4">
                  <input placeholder="নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                  <textarea placeholder="বর্ণনা" className="w-full p-3 border rounded-xl" rows={3} value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
                  <input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} />
                  <input placeholder="অবদানকারী (ঐচ্ছিক)" className="w-full p-3 border rounded-xl" value={editingItem.contributor || ''} onChange={e => setEditingItem({...editingItem, contributor: e.target.value})} />
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 flex items-center gap-2"><Camera className="w-4 h-4" /> ছবি আপলোড করুন</label>
                    <input 
                      type="file" 
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const type = file.type.startsWith('video') ? 'video' : 'image';
                          const maxSize = type === 'video' ? 5 * 1024 * 1024 : 2 * 1024 * 1024;
                          
                          if (file.size > maxSize) {
                            alert(`ফাইলের আকার ${type === 'video' ? '৫' : '২'} মেগাবাইটের কম হতে হবে।`);
                            return;
                          }

                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditingItem({
                              ...editingItem, 
                              image: reader.result as string,
                              mediaType: type
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full p-2 border rounded-xl text-sm"
                    />
                    {editingItem.image && (
                      <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border">
                        {editingItem.mediaType === 'video' ? (
                          <VideoPlayer src={editingItem.image || ''} className="w-full h-full" />
                        ) : (
                          <img src={editingItem.image || undefined} className="w-full h-full object-cover" alt="Preview" referrerPolicy="no-referrer" />
                        )}
                        <button 
                          onClick={() => setEditingItem({...editingItem, image: ''})}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeTab === 'bloodDonors' && (
                <div className="space-y-4">
                  <input placeholder="দাতার নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="w-full p-3 border rounded-xl" value={editingItem.bloodGroup} onChange={e => setEditingItem({...editingItem, bloodGroup: e.target.value})}>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                    <input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} />
                  </div>
                  <input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400">সর্বশেষ রক্তদানের তারিখ</label>
                      <input type="date" className="w-full p-3 border rounded-xl" value={editingItem.lastDonationDate} onChange={e => setEditingItem({...editingItem, lastDonationDate: e.target.value})} />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input type="checkbox" id="isAvailable" checked={editingItem.isAvailable} onChange={e => setEditingItem({...editingItem, isAvailable: e.target.checked})} className="w-5 h-5" />
                      <label htmlFor="isAvailable" className="font-bold">উপলব্ধ আছেন?</label>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'pharmacies' && (
                <div className="space-y-4">
                  <input placeholder="ফার্মেসির নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                  <input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} />
                  <input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="isOpen24Hours" checked={editingItem.isOpen24Hours} onChange={e => setEditingItem({...editingItem, isOpen24Hours: e.target.checked})} className="w-5 h-5" />
                      <label htmlFor="isOpen24Hours" className="font-bold">২৪ ঘণ্টা খোলা?</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="deliveryAvailable" checked={editingItem.deliveryAvailable} onChange={e => setEditingItem({...editingItem, deliveryAvailable: e.target.checked})} className="w-5 h-5" />
                      <label htmlFor="deliveryAvailable" className="font-bold">ডেলিভারি সুবিধা?</label>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'landServices' && (
                <div className="space-y-4">
                  <input placeholder="সেবার শিরোনাম" className="w-full p-3 border rounded-xl" value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
                  <input placeholder="লিঙ্ক" className="w-full p-3 border rounded-xl" value={editingItem.link} onChange={e => setEditingItem({...editingItem, link: e.target.value})} />
                  <textarea placeholder="সংক্ষিপ্ত বর্ণনা" className="w-full p-3 border rounded-xl" rows={3} value={editingItem.desc} onChange={e => setEditingItem({...editingItem, desc: e.target.value})} />
                </div>
              )}
              {activeTab === 'unionData' && (
                <div className="space-y-4">
                  <input placeholder="ইউনিয়নের নাম" className="w-full p-3 border rounded-xl" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                  <input placeholder="চেয়ারম্যানের নাম" className="w-full p-3 border rounded-xl" value={editingItem.chairman} onChange={e => setEditingItem({...editingItem, chairman: e.target.value})} />
                  <input placeholder="ফোন" className="w-full p-3 border rounded-xl" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} />
                  <input placeholder="অবস্থান" className="w-full p-3 border rounded-xl" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} />
                  <input placeholder="ওয়েবসাইট (ঐচ্ছিক)" className="w-full p-3 border rounded-xl" value={editingItem.website} onChange={e => setEditingItem({...editingItem, website: e.target.value})} />
                </div>
              )}
            </div>
            <div className="p-6 bg-gray-50 flex gap-3 shrink-0"><button onClick={() => setEditingItem(null)} className="flex-1 py-3 bg-white border rounded-xl font-bold">বাতিল</button><button onClick={saveEdit} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">সেভ করুন</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;