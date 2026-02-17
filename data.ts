import { EmergencyContact, Official, Hospital, TouristPlace } from './types';

export const ADMIN_EMAIL = 'nahiannafiz07@gmail.com';

export const initialNavItems = [
  { id: 'home', label: 'হোম', icon: 'Home' },
  { id: 'emergency', label: 'জরুরি সেবা', icon: 'PhoneCall' },
  { id: 'health', label: 'স্বাস্থ্য', icon: 'HeartPulse' },
  { id: 'directory', label: 'ডিরেক্টরি', icon: 'Building2' },
  { id: 'land', label: 'ভূমি সেবা', icon: 'Landmark' },
  { id: 'education', label: 'শিক্ষা', icon: 'GraduationCap' },
  { id: 'tourism', label: 'পর্যটন', icon: 'MapPin' },
  { id: 'complaint', label: 'অভিযোগ', icon: 'MessageSquare' },
  { id: 'eapps', label: 'ই-আবেদন', icon: 'FileText' },
];

export const emergencyContacts: EmergencyContact[] = [
  { id: '1', name: 'ফায়ার সার্ভিস কন্ট্রোল রুম', type: 'Fire', phone: '০১৭৩০-৩৩৬৬৬৬', location: 'জেলা সদর' },
  { id: '2', name: 'পুলিশ কন্ট্রোল রুম', type: 'Police', phone: '৯৯৯', location: 'জেলা সদর' },
  { id: '3', name: 'সদর হাসপাতাল অ্যাম্বুলেন্স', type: 'Ambulance', phone: '০১৩২২-৪৪৫৫৬৬', location: 'সদর হাসপাতাল রোড' },
  { id: '4', name: 'পৌরসভা ফায়ার স্টেশন', type: 'Fire', phone: '০১৮১৮-১১২২৩৩', location: 'পৌর এলাকা' }
];

export const districtOfficials: Official[] = [
  { id: '1', name: 'মোঃ খোরশেদ আলম', designation: 'জেলা প্রশাসক (DC)', office: 'জেলা প্রশাসকের কার্যালয়', phone: '০১৫৫৬-১০২০৩০', email: 'dc@district.gov.bd' },
  { id: '2', name: 'হাসিবুল হাসান', designation: 'পুলিশ সুপার (SP)', office: 'পুলিশ সুপারের কার্যালয়', phone: '০১৬৭৮-৯০৯০৯০', email: 'sp@police.gov.bd' },
  { id: '3', name: 'ফারহানা ইসলাম', designation: 'উপজেলা নির্বাহী অফিসার (UNO)', office: 'উপজেলা পরিষদ', phone: '০১৭০০-১১২২৩৩', email: 'uno@district.gov.bd' }
];

export const healthFacilities: Hospital[] = [
  { id: '1', name: 'জেলা সদর হাসপাতাল', type: 'Government', location: 'হাসপাতাল মোড়', phone: '০১৭০০-০০০১১১', speciality: ['Medicine', 'Surgery', 'Pediatrics'] },
  { id: '2', name: 'পপুলার ডায়াগনস্টিক', type: 'Private', location: 'কলেজ রোড', phone: '০১৮৯৯-২২৩৩৪৪', speciality: ['Pathology', 'X-Ray', 'Consultancy'] },
  { id: '3', name: 'রেড ক্রিসেন্ট ব্লাড ব্যাংক', type: 'Government', location: 'শহর শাখা', phone: '০১৭২০-৯৯৮৮৭৭', speciality: ['Blood Donation'] }
];

export const touristSpots: TouristPlace[] = [
  { id: '1', name: 'ঐতিহাসিক রাজবাড়ি', description: 'জেলা শহরের কেন্দ্রস্থলে অবস্থিত ১৮শ শতাব্দীর একটি প্রাচীন স্থাপত্য।', image: 'https://picsum.photos/seed/palace/800/600', location: 'রাজবাড়ি রোড' },
  { id: '2', name: 'জেলা লেক ও পার্ক', description: 'পারিবারিক ভ্রমণের জন্য জেলার সবথেকে জনপ্রিয় ও মনোরম স্থান।', image: 'https://picsum.photos/seed/park/800/600', location: 'লেক ভিউ রোড' },
  { id: '3', name: 'কেন্দ্রীয় শহীদ মিনার', description: 'ভাষাসৈনিকদের স্মরণে নির্মিত জেলার প্রধান শহীদ মিনার প্রাঙ্গণ।', image: 'https://picsum.photos/seed/monument/800/600', location: 'শহর কেন্দ্র' }
];

export const educationData = [
  { id: '1', name: 'জেলা সরকারি উচ্চ বিদ্যালয়', type: 'School', location: 'শহর কেন্দ্র', phone: '০১৭০০-০০০০০০' },
  { id: '2', name: 'সদর সরকারি কলেজ', type: 'College', location: 'কলেজ রোড', phone: '০১৭০০-১১১১১১' },
  { id: '3', name: 'বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়', type: 'University', location: 'বিশ্ববিদ্যালয় ক্যাম্পাস', phone: '০১৭০০-২২২২২২' }
];

export const eApplications = [
  { id: '1', title: 'নাগরিক সনদ আবেদন', link: 'https://example.gov.bd/certificate' },
  { id: '2', title: 'ট্রেড লাইসেন্স আবেদন', link: 'https://example.gov.bd/trade' },
  { id: '3', title: 'ওয়ারিশ সনদ আবেদন', link: 'https://example.gov.bd/inheritance' },
  { id: '4', title: 'নতুন বিদ্যুৎ সংযোগ', link: 'https://example.gov.bd/electricity' }
];

export const landServicesData = [
  { id: '1', title: 'ই-নামজারি আবেদন (Mutation)', link: 'https://mutation.land.gov.bd/', desc: 'জমির মালিকানা পরিবর্তনের আবেদন' },
  { id: '2', title: 'ভূমি উন্নয়ন কর (Tax)', link: 'https://ldtax.gov.bd/', desc: 'অনলাইনে খাজনা বা ভূমি কর প্রদান' },
  { id: '3', title: 'খতিয়ান অনুসন্ধান (Khatian)', link: 'https://eporcha.gov.bd/', desc: 'জমির পর্চা বা খতিয়ান যাচাই' },
  { id: '4', title: 'মৌজা ম্যাপ (Maps)', link: 'https://eporcha.gov.bd/user/map-search', desc: 'অনলাইনে মৌজা ম্যাপ দেখা ও আবেদন' },
  { id: '5', title: 'উত্তরাধিকার ক্যালকুলেটর', link: 'http://inheritance.gov.bd/', desc: 'সম্পদ বন্টন বা মিরাস ক্যালকুলেটর' }
];