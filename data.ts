import { EmergencyContact, Official, Hospital, TouristPlace } from './types';

export const initialNavItems = [
  { id: 'home', label: 'হোম', icon: 'Home' },
  { id: 'history', label: 'ইতিহাস', icon: 'BookOpen' },
  { id: 'emergency', label: 'জরুরি সেবা', icon: 'PhoneCall' },
  { id: 'health', label: 'স্বাস্থ্য', icon: 'HeartPulse' },
  { id: 'directory', label: 'ডিরেক্টরি', icon: 'Building2' },
  { id: 'land', label: 'ভূমি সেবা', icon: 'Landmark' },
  { id: 'education', label: 'শিক্ষা', icon: 'GraduationCap' },
  { id: 'tourism', label: 'পর্যটন', icon: 'MapPin' },
  { id: 'complaint', label: 'অভিযোগ', icon: 'MessageSquare' },
  { id: 'contact', label: 'যোগাযোগ', icon: 'PhoneCall' },
  { id: 'eapps', label: 'ই-আবেদন', icon: 'FileText' },
];

export const historyData = {
  title: 'মহেশপুরের ইতিহাস ও ঐতিহ্য',
  description: 'ঝিনাইদহ জেলার দক্ষিণ-পশ্চিমে অবস্থিত একটি প্রাচীন জনপদ মহেশপুর। কপোতাক্ষ নদের তীরে অবস্থিত এই অঞ্চলের ইতিহাস অতি প্রাচীন ও গৌরবময়।',
  sections: [
    {
      id: 'ancient',
      title: 'নামকরণের ইতিহাস ও প্রাচীনত্ব',
      content: 'জনশ্রুতি আছে যে, রাজা মহেশচন্দ্রের নামানুসারে এই অঞ্চলের নাম মহেশপুর রাখা হয়। প্রাচীনকালে এটি একটি সমৃদ্ধ নদী বন্দর ছিল। কপোতাক্ষ নদের গতিপথ পরিবর্তনের সাথে সাথে এই জনপদ তার রূপ পরিবর্তন করে।'
    },
    {
      id: 'british',
      title: 'ব্রিটিশ আমল ও নীল বিদ্রোহ',
      content: 'মহেশপুরের খালিশপুর ছিল নীলকরদের অন্যতম প্রধান আস্তানা। ১৮৬০-এর দশকে নীলকরদের নির্যাতনের বিরুদ্ধে এখানকার কৃষকরা তীব্র বিদ্রোহ গড়ে তোলে। আজও সেই নীল কুঠির ধ্বংসাবশেষ ইতিহাসের সাক্ষ্য বহন করছে।'
    },
    {
      id: 'liberation',
      title: 'মুক্তিযুদ্ধ ও মহেশপুর',
      content: '১৯৭১ সালের মহান মুক্তিযুদ্ধে মহেশপুর ছিল ৮নং সেক্টরের অধীনে। এই অঞ্চলের বীর যোদ্ধারা পাকিস্তানি বাহিনীর বিরুদ্ধে সম্মুখ যুদ্ধে অংশ নেন। মহেশপুরের মান্দারতলার যুদ্ধ ইতিহাসের এক অবিস্মরণীয় অংশ।'
    }
  ],
  timeline: [
    { year: '১৮৬৩', event: 'মহেশপুর থানা হিসেবে প্রতিষ্ঠিত হয়।' },
    { year: '১৯৭১', event: '১৬ই ডিসেম্বর মহেশপুর হানাদার মুক্ত হয়।' },
    { year: '১৯৮৩', event: 'উপজেলা হিসেবে প্রশাসনিক কার্যক্রম শুরু।' }
  ]
};

export const emergencyContacts: EmergencyContact[] = [
  { id: '1', name: 'ফায়ার সার্ভিস কন্ট্রোল রুম', type: 'Fire', phone: '০১৭৩০-৩একে৬৬৬', location: 'জেলা সদর' },
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
  { 
    id: '1', 
    name: 'জেলা সদর হাসপাতাল', 
    type: 'Government', 
    location: 'হাসপাতাল মোড়', 
    phone: '০১৭০০-০০০১১১', 
    speciality: ['Medicine', 'Surgery', 'Pediatrics'],
    doctors: [
      { id: 'd1', name: 'ডাঃ মোঃ আব্দুর রহমান', phone: '০১৭০০-১১২২৩৩', specialist: 'মেডিসিন বিশেষজ্ঞ', degree: 'MBBS, BCS (Health), FCPS', viewingTime: 'বিকাল ৪টা - রাত ৮টা' },
      { id: 'd2', name: 'ডাঃ ফাতেমা জোহরা', phone: '০১৭০০-৪৪৫৫৬৬', specialist: 'স্ত্রী ও প্রসূতি রোগ বিশেষজ্ঞ', degree: 'MBBS, DGO, MCPS', viewingTime: 'সকাল ১০টা - দুপুর ২টা' }
    ]
  },
  { 
    id: '2', 
    name: 'পপুলার ডায়াগনস্টিক', 
    type: 'Private', 
    location: 'কলেজ রোড', 
    phone: '০১৮৯৯-২২৩৩৪৪', 
    speciality: ['Pathology', 'X-Ray', 'Consultancy'],
    doctors: [
      { id: 'd3', name: 'ডাঃ এস. এম. কবির', phone: '০১৮৯৯-৭৭৮৮৯৯', specialist: 'হৃদরোগ বিশেষজ্ঞ', degree: 'MBBS, MD (Cardiology)', viewingTime: 'সন্ধ্যা ৬টা - রাত ৯টা' }
    ]
  },
  { 
    id: '3', 
    name: 'রেড ক্রিসেন্ট ব্লাড ব্যাংক', 
    type: 'Government', 
    location: 'শহর শাখা', 
    phone: '০১৭২০-৯৯৮৮৭৭', 
    speciality: ['Blood Donation'],
    doctors: []
  }
];

export const touristSpots: TouristPlace[] = [
  { id: '1', name: 'ঐতিহাসিক রাজবাড়ি', description: 'জেলা শহরের কেন্দ্রস্থলে অবস্থিত ১৮শ শতাব্দীর একটি প্রাচীন স্থাপত্য।', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a594?auto=format&fit=crop&q=80&w=800', location: 'রাজবাড়ি রোড', mediaType: 'image' },
  { id: '2', name: 'জেলা লেক ও পার্ক', description: 'পারিবারিক ভ্রমণের জন্য জেলার সবথেকে জনপ্রিয় ও মনোরম স্থান।', image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800', location: 'লেক ভিউ রোড', mediaType: 'image' },
  { id: '3', name: 'কেন্দ্রীয় শহীদ মিনার', description: 'ভাষাসৈনিকদের স্মরণে নির্মিত জেলার প্রধান শহীদ মিনার প্রাঙ্গণ।', image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800', location: 'শহর কেন্দ্র', mediaType: 'image' }
];

export const educationData = [
  { id: '1', name: 'জেলা সরকারি উচ্চ বিদ্যালয়', type: 'School', location: 'শহর কেন্দ্র', phone: '০১৭০০-০০০০০০' },
  { id: '2', name: 'সদর সরকারি কলেজ', type: 'College', location: 'কলেজ রোড', phone: '০১৭০০-১১১১১১' },
  { id: '3', name: 'বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়', type: 'University', location: 'বিশ্ববিদ্যালয় ক্যাম্পাস', phone: '০১৭০০-২২২২২২' },
  { id: '4', name: 'মহেশপুর সরকারি ডিগ্রি কলেজ', type: 'College', location: 'মহেশপুর পৌরসভা, মহেশপুর, ঝিনাইদহ', phone: '০১৩০৯-১১৬৭৫২' }
];

export const eApplications = [
  { id: '1', title: 'নাগরিক সনদ আবেদন', link: 'https://eprottoyon.com/' },
  { id: '2', title: 'ট্রেড লাইসেন্স আবেদন', link: 'https://www.etradelicense.gov.bd/' },
  { id: '3', title: 'ওয়ারিশ সনদ আবেদন', link: 'https://lgoms.org/ci_apply.php' },
  { id: '4', title: 'নতুন বিদ্যুৎ সংযোগ', link: 'https://newconnection.bpdb.gov.bd/' }
];

export const landServicesData = [
  { id: '1', title: 'ই-নামজারি আবেদন (Mutation)', link: 'https://mutation.land.gov.bd/', desc: 'জমির মালিকানা পরিবর্তনের আবেদন' },
  { id: '2', title: 'ভূমি উন্নয়ন কর (Tax)', link: 'https://ldtax.gov.bd/', desc: 'অনলাইনে খাজনা বা ভূমি কর প্রদান' },
  { id: '3', title: 'খতিয়ান অনুসন্ধান (Khatian)', link: 'https://eporcha.gov.bd/', desc: 'জমির পর্চা বা খতিয়ান যাচাই' },
  { id: '4', title: 'মৌজা ম্যাপ (Maps)', link: 'https://eporcha.gov.bd/user/map-search', desc: 'অনলাইনে মৌজা ম্যাপ দেখা ও আবেদন' },
  { id: '5', title: 'উত্তরাধিকার ক্যালকুলেটর', link: 'http://inheritance.gov.bd/', desc: 'সম্পদ বন্টন বা মিরাস ক্যালকুলেটর' }
];

export const contactInfo = {
  address: 'উপজেলা পরিষদ কমপ্লেক্স, মহেশপুর, ঝিনাইদহ',
  email: 'info@moheshpur.gov.bd',
  phone: '০১৭০০-০০০০০০',
  supportText: 'আমাদের সাপোর্ট টিম ২৪/৭ আপনার সেবায় নিয়োজিত। যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।'
};
