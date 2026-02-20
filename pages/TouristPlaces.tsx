import React, { useState, useRef, useMemo } from 'react';
import { MapPin, Info, ArrowRight, ArrowLeft, Plus, X, Camera, Video, Upload, Loader2, PlayCircle, Film, Image as ImageIcon, Search, Trash2 } from 'lucide-react';

interface TouristPlacesProps {
  spots: any[];
  user: any;
  onUpdate: (newSpots: any[]) => void;
  onBack: () => void;
}

const TouristPlaces: React.FC<TouristPlacesProps> = ({ spots, user, onUpdate, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [preview, setPreview] = useState<{ url: string, type: 'image' | 'video' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredSpots = useMemo(() => {
    if (!searchQuery.trim()) return spots;
    const query = searchQuery.toLowerCase();
    return spots.filter(spot => 
      spot.name.toLowerCase().includes(query) || 
      spot.location.toLowerCase().includes(query) ||
      spot.description.toLowerCase().includes(query)
    );
  }, [spots, searchQuery]);

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই পর্যটন কেন্দ্রটি ডিলিট করতে চান?')) {
      onUpdate(spots.filter(s => s.id !== id));
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    media: '',
    mediaType: 'image' as 'image' | 'video'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      
      // Limit file size for local storage simulation (max 5MB for video, 2MB for image)
      const maxSize = type === 'video' ? 5 * 1024 * 1024 : 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`ফাইলের আকার ${type === 'video' ? '৫' : '২'} মেগাবাইটের কম হতে হবে।`);
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview({ url: result, type });
        setFormData(prev => ({ ...prev, media: result, mediaType: type }));
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert('ফাইল পড়তে সমস্যা হয়েছে।');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.media) {
      alert('দয়া করে একটি ছবি বা ভিডিও আপলোড করুন।');
      return;
    }

    const newSpot = {
      id: Date.now().toString(),
      name: formData.name,
      location: formData.location,
      description: formData.description,
      image: formData.media,
      mediaType: formData.mediaType,
      contributor: user?.name || 'অজ্ঞাত নাগরিক'
    };

    onUpdate([newSpot, ...spots]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', location: '', description: '', media: '', mediaType: 'image' });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="animate-in fade-in slide-in-from-left duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 font-bold transition-colors group"
        >
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-orange-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          ফিরে যান
        </button>

        {user?.role === 'Admin' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> নতুন পর্যটন কেন্দ্র যোগ করুন
          </button>
        )}
      </div>

      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">মহেশপুরের সৌন্দর্য ও পর্যটন</h2>
        <p className="text-gray-500 font-bold text-lg leading-relaxed mb-8">আপনার প্রিয় স্থানগুলোর ছবি ও ভিডিও শেয়ার করে পর্যটকদের সাহায্য করুন।</p>
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="পর্যটন কেন্দ্র বা এলাকা খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-200 shadow-sm transition-all text-black font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot) => (
            <div key={spot.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative">
            {/* Admin Delete Button */}
            {user?.role === 'Admin' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(spot.id);
                }}
                className="absolute top-4 right-4 z-10 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all active:scale-90"
                title="ডিলিট করুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div 
              className="relative aspect-video overflow-hidden bg-gray-900 cursor-pointer"
              onClick={() => setSelectedSpot(spot)}
            >
              {spot.mediaType === 'video' ? (
                <div className="relative w-full h-full">
                  <video 
                    src={spot.image || undefined} 
                    className="w-full h-full object-cover" 
                    muted 
                    loop 
                    onMouseOver={e => e.currentTarget.play()} 
                    onMouseOut={e => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                       <Film className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1">
                    <Video className="w-3 h-3" /> VIDEO
                  </div>
                </div>
              ) : (
                <img 
                  src={spot.image || undefined} 
                  alt={spot.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[11px] font-black text-orange-600 flex items-center shadow-lg uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" />
                  {spot.location}
                </span>
              </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                 <div className="h-1 w-8 bg-orange-500 rounded-full"></div>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">পর্যটন কেন্দ্র</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">{spot.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-3 mb-8 font-medium leading-relaxed">{spot.description}</p>
              
              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-orange-600 overflow-hidden shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${spot.contributor || spot.id}` || null} className="w-full h-full object-cover" alt="Avatar" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">অবদানকারী</span>
                      <span className="text-xs font-black text-gray-700 leading-none">{spot.contributor || 'নাগরিক'}</span>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedSpot(spot)}
                  className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white transition-all active:scale-95 flex items-center gap-2 text-xs font-bold"
                >
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-400 font-bold text-xl">দুঃখিত, কোনো পর্যটন কেন্দ্র খুঁজে পাওয়া যায়নি।</p>
             <button 
               onClick={() => setSearchQuery('')}
               className="mt-4 text-orange-600 font-bold hover:underline"
             >
               সব পর্যটন কেন্দ্র দেখুন
             </button>
          </div>
        )}
      </div>

      {/* Contribution Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl animate-in zoom-in duration-300 overflow-hidden text-black flex flex-col my-8">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-2xl">
                  <Camera className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900">আপনার অভিজ্ঞতা শেয়ার করুন</h4>
                  <p className="text-sm text-gray-500 font-bold">ছবি বা ভিডিও আপলোড করুন</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-white p-3 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">পর্যটন কেন্দ্রের নাম</label>
                  <input 
                    required 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-200 transition-all font-bold text-gray-900" 
                    placeholder="যেমন: খালিশপুর নীল কুঠি"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">অবস্থান/ঠিকানা</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-200 transition-all font-bold text-gray-900" 
                      placeholder="উপজেলা বা গ্রাম"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">সংক্ষিপ্ত বর্ণনা</label>
                <textarea 
                  required 
                  rows={3}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-200 transition-all font-medium text-gray-700 resize-none" 
                  placeholder="এই স্থান সম্পর্কে আপনার অভিজ্ঞতা লিখুন..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">ছবি বা ভিডিও (ম্যাক্স ৫এমবি)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative min-h-[250px] border-4 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ${preview ? 'border-orange-500 bg-orange-50/20' : 'border-gray-100 hover:border-orange-300 bg-gray-50'}`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,video/*" 
                    onChange={handleFileChange} 
                  />
                  
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-4">
                       <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                       <span className="text-sm font-black text-orange-800">ফাইল আপলোড হচ্ছে...</span>
                    </div>
                  ) : preview ? (
                    <div className="relative w-full h-full p-4 animate-in fade-in zoom-in duration-500">
                      {preview.type === 'video' ? (
                        <video src={preview.url || undefined} className="w-full max-h-[300px] object-contain rounded-[1.5rem] shadow-2xl" autoPlay muted loop />
                      ) : (
                        <img src={preview.url || undefined} className="w-full max-h-[300px] object-contain rounded-[1.5rem] shadow-2xl" alt="Preview" />
                      )}
                      <div className="absolute top-6 right-6 flex gap-2">
                         <div className="bg-black/70 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-black text-white flex items-center gap-1">
                            {preview.type === 'video' ? <Video className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                            {preview.type.toUpperCase()}
                         </div>
                         <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); resetForm(); }}
                            className="bg-red-600 text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="bg-white w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 text-orange-600">
                        <Upload className="w-10 h-10" />
                      </div>
                      <p className="text-xl font-black text-gray-800 mb-2">ফাইল ড্রপ করুন বা ক্লিক করুন</p>
                      <p className="text-sm text-gray-500 font-bold mb-6">হাই-কোয়ালিটি ফটো বা ৫ সেকেন্ডের ছোট ভিডিও</p>
                      <div className="flex gap-4 justify-center">
                         <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm text-xs font-black text-gray-600">
                            <ImageIcon className="w-4 h-4 text-blue-500" /> PHOTOS
                         </div>
                         <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm text-xs font-black text-gray-600">
                            <Film className="w-4 h-4 text-purple-500" /> VIDEOS
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 py-5 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all active:scale-95"
                >
                  বাতিল করুন
                </button>
                <button 
                  type="submit" 
                  disabled={!formData.media}
                  className="flex-1 py-5 bg-orange-600 text-white rounded-2xl font-black shadow-2xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  পাবলিশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Detail View Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl animate-in zoom-in duration-300 overflow-hidden text-black flex flex-col max-h-[90vh]">
            <div className="relative h-64 md:h-96 bg-gray-900">
              {selectedSpot.mediaType === 'video' ? (
                <video src={selectedSpot.image || undefined} className="w-full h-full object-cover" controls autoPlay />
              ) : (
                <img src={selectedSpot.image || undefined} className="w-full h-full object-cover" alt={selectedSpot.name} />
              )}
              <button 
                onClick={() => setSelectedSpot(null)}
                className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition-all shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6">
                <span className="bg-orange-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                  {selectedSpot.location}
                </span>
              </div>
            </div>
            
            <div className="p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-1.5 w-12 bg-orange-500 rounded-full"></div>
                 <span className="text-xs font-black text-gray-400 uppercase tracking-widest">বিস্তারিত তথ্য</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{selectedSpot.name}</h3>
              <p className="text-lg text-gray-600 leading-relaxed font-medium mb-10 whitespace-pre-wrap">
                {selectedSpot.description}
              </p>
              
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center text-orange-600 overflow-hidden shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSpot.contributor || selectedSpot.id}` || undefined} className="w-full h-full object-cover" alt="Avatar" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">তথ্য প্রদানকারী</span>
                      <span className="text-xl font-black text-gray-800">{selectedSpot.contributor || 'অজ্ঞাত নাগরিক'}</span>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedSpot(null)}
                  className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristPlaces;