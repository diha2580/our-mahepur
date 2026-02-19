import React from 'react';
import { Building2, Mail, Phone, ExternalLink, UserCircle2, ArrowLeft, Gavel, Shield, Landmark, Briefcase } from 'lucide-react';
import { formatPhoneForDialer } from '../lib/utils';

interface DirectoryProps {
  officials: any[];
  onBack: () => void;
}

const getDesignationIcon = (designation: string) => {
  const d = designation.toLowerCase();
  if (d.includes('dc') || d.includes('uno') || d.includes('executive') || d.includes('commissioner')) return <Landmark className="w-3 h-3 mr-1" />;
  if (d.includes('sp') || d.includes('police') || d.includes('security')) return <Shield className="w-3 h-3 mr-1" />;
  if (d.includes('judge') || d.includes('magistrate') || d.includes('justice')) return <Gavel className="w-3 h-3 mr-1" />;
  if (d.includes('officer') || d.includes('manager')) return <Briefcase className="w-3 h-3 mr-1" />;
  return <Building2 className="w-3 h-3 mr-1" />;
};

const Directory: React.FC<DirectoryProps> = ({ officials, onBack }) => {
  return (
    <div className="animate-in slide-in-from-top duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-blue-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        ফিরে যান
      </button>

      <div className="mb-8 border-b border-gray-100 pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">জেলা ডিরেক্টরি</h2>
          <p className="text-gray-500">গুরুত্বপূর্ণ সরকারি অফিস ও কর্মকর্তাদের তালিকা</p>
        </div>
        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-100 transition-colors">
          <ExternalLink className="w-4 h-4" />
          সবগুলো ডাউনলোড করুন
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm font-bold">
              <th className="px-6 py-4">কর্মকর্তার নাম</th>
              <th className="px-6 py-4">পদবি ও অফিস</th>
              <th className="px-6 py-4 hidden md:table-cell">যোগাযোগ</th>
              <th className="px-6 py-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(officials || []).map((official: any) => (
              <tr key={official.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full group-hover:scale-110 transition-transform">
                      <UserCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{official.name}</div>
                      <div className="text-xs text-blue-600 font-bold uppercase flex items-center">
                        {getDesignationIcon(official.designation)}
                        {official.designation}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                   <div className="text-sm font-medium text-gray-700">{official.office}</div>
                </td>
                <td className="px-6 py-5 hidden md:table-cell">
                   <div className="flex flex-col space-y-1">
                      <a href={`tel:${formatPhoneForDialer(official.phone)}`} className="flex items-center text-xs text-gray-500 hover:text-blue-600">
                        <Phone className="w-3 h-3 mr-1" /> {official.phone}
                      </a>
                      <div className="flex items-center text-xs text-gray-500">
                        <Mail className="w-3 h-3 mr-1" /> {official.email}
                      </div>
                   </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <a href={`tel:${formatPhoneForDialer(official.phone)}`} className="inline-flex p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm">
                    <Phone className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Directory;
