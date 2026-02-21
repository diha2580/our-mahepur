import React, { useState } from 'react';
import { 
  Phone, MapPin, Siren, ShieldAlert, Truck, AlertTriangle, 
  Plus, Edit2, Trash2, X, Save, AlertCircle, ArrowLeft 
} from 'lucide-react';
import { formatPhoneForDialer } from '../lib/utils';

interface EmergencyProps {
  user: any;
  contacts: any[];
  onUpdate: (newContacts: any[]) => void;
  onBack: () => void;
}

const Emergency: React.FC<EmergencyProps> = ({ user, contacts, onUpdate, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);

  const isAdmin = user?.role === 'admin';

  const quickSOS = [
    { label: 'জাতীয় হেল্পলাইন', phone: '৯৯৯', icon: ShieldAlert, color: 'bg-red-600' },
    { label: 'ফায়ার সার্ভিস', phone: '১০১', icon: Truck, color: 'bg-orange-600' },
    { label: 'অ্যাম্বুলেন্স', phone: '০১৩২২-৪৪৫৫৬৬', icon: Siren, color: 'bg-blue-600' },
  ];

  const handleOpenModal = (contact: any = null) => {
    setEditingContact(contact || { id: Date.now().toString(), name: '', phone: '', location: '', type: 'Fire' });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedPhone = editingContact.phone.replace(/[-\s]/g, '');
    const contactToSave = { ...editingContact, phone: sanitizedPhone };
    const newContacts = [...contacts];
    const index = newContacts.findIndex(c => c.id === contactToSave.id);
    if (index > -1) {
      newContacts[index] = contactToSave;
    } else {
      newContacts.push(contactToSave);
    }
    onUpdate(newContacts);
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই কন্টাক্টটি ডিলিট করতে চান?')) {
      const newContacts = contacts.filter(c => c.id !== id);
      onUpdate(newContacts);
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom duration-500 pb-20">
      <button 
        onClick={onBack}
        aria-label="আগের পৃষ্ঠায় ফিরে যান"
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold transition-colors group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-red-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        ফিরে যান
      </button>

      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 p-4 rounded-2xl">
            <AlertTriangle className="w-10 h-10 text-red-600 animate-pulse" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-gray-900">জরুরি সেবা কেন্দ্র</h2>
            <p className="text-gray-500 font-medium">যেকোনো বিপদে এক ক্লিকেই কল করুন</p>
          </div>
        </div>
        {isAdmin && (
          <button 
            onClick={() => handleOpenModal()}
            className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-red-100 hover:bg-red-700 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> কন্টাক্ট যোগ করুন
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {quickSOS.map((sos, idx) => (
          <a
            key={idx}
            href={`tel:${formatPhoneForDialer(sos.phone)}`}
            aria-label={`${sos.label} এ কল করুন: ${sos.phone}`}
            className={`${sos.color} p-6 rounded-3xl text-white shadow-xl shadow-red-100 hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center text-center gap-3 group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <sos.icon className="w-12 h-12 mb-1" />
            <div>
              <div className="text-sm font-bold opacity-80 uppercase tracking-wider">{sos.label}</div>
              <div className="text-3xl font-black">{sos.phone}</div>
            </div>
            <div className="mt-2 bg-white/20 px-4 py-1 rounded-full text-xs font-bold backdrop-blur-sm">সরাসরি কল করুন</div>
          </a>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <div className="w-2 h-8 bg-red-600 rounded-full"></div>
          জেলা ভিত্তিক কন্টাক্ট লিস্ট
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact: any) => (
            <div key={contact.id} className="bg-white p-1 rounded-3xl shadow-sm border border-gray-100 flex items-center group hover:border-red-200 transition-all hover:shadow-md">
              <div className={`p-6 rounded-2xl m-2 ${
                contact.type === 'Fire' ? 'bg-orange-50 text-orange-600' : 
                contact.type === 'Police' ? 'bg-blue-50 text-blue-600' : 
                'bg-red-50 text-red-600'
              }`}>
                {contact.type === 'Fire' ? <Truck className="w-8 h-8" /> : contact.type === 'Police' ? <ShieldAlert className="w-8 h-8" /> : <Siren className="w-8 h-8" />}
              </div>
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{contact.name}</h3>
                <div className="flex items-center text-sm text-gray-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {contact.location}
                </div>
              </div>
              <div className="flex items-center gap-2 mr-4">
                {isAdmin && (
                  <div className="flex flex-col gap-1 mr-2">
                    <button onClick={() => handleOpenModal(contact)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="এডিট করুন"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(contact.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="ডিলিট করুন"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )}
                <a href={`tel:${formatPhoneForDialer(contact.phone)}`} aria-label={`${contact.name} এ কল করুন`} className="p-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-90" title="সরাসরি কল করুন"><Phone className="w-6 h-6" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in duration-200 overflow-hidden text-black">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h4 className="text-xl font-bold flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-red-600" />কন্টাক্ট তথ্য যোগ/সংশোধন</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">নাম/টাইটেল</label>
                <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-red-100 text-black" value={editingContact.name} onChange={e => setEditingContact({...editingContact, name: e.target.value})} placeholder="যেমন: ফায়ার সার্ভিস কন্ট্রোল রুম" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">ফোন নম্বর</label>
                <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-red-100 text-black" value={editingContact.phone} onChange={e => setEditingContact({...editingContact, phone: e.target.value})} placeholder="যেমন: ০১৭০০-০০০০০০" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">অবস্থান</label>
                <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-red-100 text-black" value={editingContact.location} onChange={e => setEditingContact({...editingContact, location: e.target.value})} placeholder="যেমন: সদর হাসপাতাল রোড" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">সেবার ধরণ</label>
                <select className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-red-100 text-black" value={editingContact.type} onChange={e => setEditingContact({...editingContact, type: e.target.value})}>
                  <option value="Fire">ফায়ার সার্ভিস</option>
                  <option value="Police">পুলিশ</option>
                  <option value="Ambulance">অ্যাম্বুলেন্স</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200 transition-colors">বাতিল</button>
                <button type="submit" className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-100 transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4" /> সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <a href={`tel:999`} aria-label="জরুরি ৯৯৯ এ কল করুন (SOS)" className="fixed bottom-8 right-8 z-[100] bg-red-600 text-white w-20 h-20 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-white animate-bounce md:hidden">
        <ShieldAlert className="w-8 h-8" />
        <span className="text-[10px] font-bold uppercase">SOS</span>
      </a>
    </div>
  );
};

export default Emergency;