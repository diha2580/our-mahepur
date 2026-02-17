import React from 'react';
import { MapPin, Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { touristSpots } from '../data';

interface TouristPlacesProps {
  onBack: () => void;
}

const TouristPlaces: React.FC<TouristPlacesProps> = ({ onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-left duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-orange-600 font-bold transition-colors group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-orange-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        ফিরে যান
      </button>

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">দর্শনীয় স্থান ও পর্যটন</h2>
        <p className="text-gray-500">আপনার জেলার সৌন্দর্য উপভোগ করতে এই স্থানগুলো ভিজিট করুন।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {touristSpots.map((spot) => (
          <div key={spot.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="relative h-60 overflow-hidden">
              <img src={spot.image} alt={spot.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-600 flex items-center shadow-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {spot.location}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{spot.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6">{spot.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="text-orange-600 text-sm font-bold flex items-center hover:translate-x-1 transition-transform">
                  বিস্তারিত দেখুন <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => <img key={i} className="w-8 h-8 rounded-full border-2 border-white object-cover" src={`https://picsum.photos/seed/user${i}/100/100`} />)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristPlaces;