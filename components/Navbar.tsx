import React from 'react';
import { 
  Home, PhoneCall, HeartPulse, Building2, MapPin, 
  MessageSquare, Menu, LogIn, LogOut, ShieldCheck, 
  UserCircle, FileText, GraduationCap, Landmark, Droplets
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Home, PhoneCall, HeartPulse, Building2, MapPin, 
  MessageSquare, FileText, GraduationCap, Landmark, Droplets
};

interface NavbarProps {
  onNavigate: (page: string) => void;
  activePage: string;
  isOnline: boolean;
  user: any;
  onLogout: () => void;
  navItems: Array<{ id: string, label: string, icon: string }>;
  appIcon?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage, isOnline, user, onLogout, navItems, appIcon }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <nav className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')} role="link" aria-label="হোম পেজে যান">
            <div className="bg-black rounded-full p-0.5 border-2 border-green-400 overflow-hidden logo-glow group-hover:scale-110 transition-transform">
               <img 
                 src={appIcon || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/1200px-Government_Seal_of_Bangladesh.svg.png'} 
                 className="w-10 h-10 object-contain" 
                 alt="Our Mahespur Logo"
                 referrerPolicy="no-referrer"
                 onError={(e) => {
                   // Fallback if primary icon fails
                   (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/1024px-Government_Seal_of_Bangladesh.svg.png';
                 }}
               />
            </div>
            <div>
               <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold leading-none tracking-tight">Our Mahespur</h1>
                  <div title={isOnline ? "অনলাইন" : "অফলাইন"} className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-red-500 animate-pulse'}`}></div>
               </div>
               <span className="text-[10px] opacity-80 font-medium uppercase tracking-widest">Digital Service Portal</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || Home;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  aria-current={activePage === item.id ? 'page' : undefined}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    activePage === item.id 
                    ? 'bg-green-900 text-green-300 shadow-inner' 
                    : 'hover:bg-green-700 text-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activePage === item.id ? 'text-green-400' : 'text-gray-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Auth/Profile */}
            <div className="ml-4 pl-4 border-l border-green-700 flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    aria-expanded={showProfileMenu}
                    aria-haspopup="true"
                    className="flex items-center gap-2 hover:bg-green-700 p-1.5 rounded-full pr-4 transition-colors bg-green-900/50"
                  >
                    <img src={user.profilePic || undefined} className="w-8 h-8 rounded-full border border-green-400 bg-white/10" alt="Profile" referrerPolicy="no-referrer" />
                    <span className="text-sm font-bold max-w-[100px] truncate">{user.name}</span>
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 text-gray-800 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-black/5">
                      <div className="px-4 py-3 border-b border-gray-100 mb-2">
                        <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">নাগরিক প্রোফাইল</div>
                        <div className="text-sm font-black truncate text-green-800">{user.email}</div>
                      </div>
                      <button onClick={() => {onNavigate('profile'); setShowProfileMenu(false);}} className="w-full text-left px-4 py-2.5 hover:bg-green-50 flex items-center gap-3 text-gray-700 font-bold transition-colors">
                        <UserCircle className="w-4 h-4 text-green-600" /> আমার প্রোফাইল
                      </button>
                      {user.role === 'admin' && (
                        <button onClick={() => {onNavigate('admin'); setShowProfileMenu(false);}} className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center gap-3 text-blue-600 font-bold transition-colors">
                          <ShieldCheck className="w-4 h-4" /> অ্যাডমিন প্যানেল
                        </button>
                      )}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button onClick={() => {onLogout(); setShowProfileMenu(false);}} className="w-full text-left px-4 py-2.5 hover:bg-red-50 flex items-center gap-3 text-red-600 font-bold transition-colors">
                          <LogOut className="w-4 h-4" /> লগআউট
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => onNavigate('login')}
                  className="bg-green-400 text-green-950 px-5 py-2 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-green-300 transition-all shadow-lg shadow-green-950/20 active:scale-95"
                >
                  <LogIn className="w-4 h-4" /> লগইন
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="মেনু খুলুন"
              className="inline-flex items-center justify-center p-2 rounded-xl bg-green-900/50 hover:bg-green-700 focus:outline-none transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-900 border-t border-green-800 animate-in slide-in-from-top duration-300">
          <div className="px-3 pt-2 pb-6 space-y-1">
            {user && (
              <div className="flex items-center gap-4 px-4 py-5 border-b border-green-800 mb-3 bg-green-950/30 rounded-2xl mx-1">
                <img src={user.profilePic || undefined} className="w-12 h-12 rounded-full border-2 border-green-400" alt="Profile" referrerPolicy="no-referrer" />
                <div>
                  <div className="font-black text-lg">{user.name}</div>
                  <div className="text-xs text-green-400 font-bold">{user.email}</div>
                </div>
              </div>
            )}
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || Home;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-4 rounded-xl text-base font-bold transition-all ${
                    activePage === item.id 
                    ? 'bg-green-800 text-green-400 shadow-inner border-l-4 border-green-400' 
                    : 'hover:bg-green-800 text-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 space-y-2 px-1">
              {user && (
                <button onClick={() => {onNavigate('profile'); setIsOpen(false);}} className="flex items-center space-x-3 w-full px-4 py-4 rounded-xl text-base font-bold text-gray-200 bg-green-800/40">
                  <UserCircle className="w-5 h-5 text-green-400" />
                  <span>আমার প্রোফাইল</span>
                </button>
              )}
              {user?.role === 'admin' && (
                <button onClick={() => {onNavigate('admin'); setIsOpen(false);}} className="flex items-center space-x-3 w-full px-4 py-4 rounded-xl text-base font-bold text-blue-300 bg-blue-900/20">
                  <ShieldCheck className="w-5 h-5" />
                  <span>অ্যাডমিন প্যানেল</span>
                </button>
              )}
              {!user ? (
                 <button onClick={() => {onNavigate('login'); setIsOpen(false);}} className="flex items-center space-x-3 w-full px-4 py-4 rounded-xl text-base font-black text-green-950 bg-green-400 mt-4 shadow-lg active:scale-95">
                    <LogIn className="w-5 h-5" />
                    <span>লগইন / নিবন্ধন</span>
                 </button>
              ) : (
                 <button onClick={() => {onLogout(); setIsOpen(false);}} className="flex items-center space-x-3 w-full px-4 py-4 rounded-xl text-base font-bold text-red-400 bg-red-900/20 mt-4">
                    <LogOut className="w-5 h-5" />
                    <span>লগআউট</span>
                 </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;