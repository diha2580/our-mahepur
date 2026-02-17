export enum ServiceCategory {
  EMERGENCY = 'জরুরি সেবা',
  DIRECTORY = 'জেলা ডিরেক্টরি',
  HEALTH = 'স্বাস্থ্য সেবা',
  EDUCATION = 'শিক্ষা প্রতিষ্ঠান',
  TOURISM = 'পর্যটন কেন্দ্র',
  COMPLAINT = 'অভিযোগ বক্স',
  E_APPLICATION = 'ই-আবেদন',
  LAND = 'ভূমি সেবা'
}

export interface EmergencyContact {
  id: string;
  name: string;
  type: 'Fire' | 'Police' | 'Ambulance';
  phone: string;
  location: string;
}

export interface Official {
  id: string;
  name: string;
  designation: string;
  office: string;
  phone: string;
  email: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: 'Government' | 'Private';
  location: string;
  phone: string;
  speciality: string[];
}

export interface TouristPlace {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
}

export interface Complaint {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Reviewing' | 'Resolved';
  date: string;
}