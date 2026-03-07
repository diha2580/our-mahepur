import React from 'react';
import { Building2, Phone, MapPin, Globe, User, ArrowLeft } from 'lucide-react';
import { formatPhoneForDialer } from '../lib/utils';
import { UnionDetail } from '../types';

interface UnionPorisodProps {
  data: UnionDetail[];
  onBack: () => void;
}

const UnionPorisod: React.FC<UnionPorisodProps> = ({ data, onBack }) => {
  return (
    <div className="animate-in slide-in-from-top duration-500">
      <button 
        onClick={onBack}
        aria-label="আগের পৃষ্ঠায় ফিরে যান"
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-blue-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        ফিরে যান
      </button>

      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-3xl font-bold text-gray-900">ইউনিয়ন পরিষদ</h2>
        <p className="text-gray-500">উপজেলার সকল ইউনিয়ন পরিষদের তথ্য ও যোগাযোগ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data || []).map((union) => (
          <div key={union.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="bg-green-800 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{union.name}</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">চেয়ারম্যান</div>
                  <div className="font-bold">{union.chairman}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">ফোন</div>
                  <a href={`tel:${formatPhoneForDialer(union.phone)}`} className="font-bold hover:text-green-600 transition-colors">{union.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">অবস্থান</div>
                  <div className="font-bold">{union.location}</div>
                </div>
              </div>

              {union.website && (
                <div className="pt-2">
                  <a 
                    href={union.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-50 text-green-700 rounded-xl font-bold hover:bg-green-100 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    ওয়েবসাইট ভিজিট করুন
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {(data || []).length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <Building2 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold">কোনো ইউনিয়ন পরিষদের তথ্য পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  );
};

export default UnionPorisod;
