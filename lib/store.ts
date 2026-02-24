import { emergencyContacts, districtOfficials, healthFacilities, touristSpots, eApplications, educationData, landServicesData, historyData, initialNavItems, contactInfo, bloodDonors, pharmacies } from '../data';
import { supabase } from './supabase';

const DATA_KEY = 'portal_app_data_v1';
const CURRENT_USER_KEY = 'portal_current_user';
const COMPLAINTS_KEY = 'portal_complaints_v1';
const CONTACT_MESSAGES_KEY = 'portal_contact_messages_v1';
const ADMIN_PWD_KEY = 'portal_admin_password';

// Observer Pattern for Real-time Updates
type Listener = (data: any) => void;
const listeners: Set<Listener> = new Set();
const broadcastChannel = new BroadcastChannel('portal_sync_channel');

export const subscribeToData = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const notifyListeners = (newData: any) => {
  listeners.forEach(l => l(newData));
};

// Handle cross-tab/cross-process updates via BroadcastChannel
broadcastChannel.onmessage = (event) => {
  if (event.data.type === 'DATA_UPDATE') {
    notifyListeners(event.data.payload);
  }
};

export const getAdminPassword = () => {
  return localStorage.getItem(ADMIN_PWD_KEY) || 'Nahian685372@@';
};

export const updateAdminPassword = (newPassword: string) => {
  localStorage.setItem(ADMIN_PWD_KEY, newPassword);
  // Note: In a real Supabase setup, you'd update the user's password via supabase.auth.updateUser
};

export const initStorage = async () => {
  try {
    // Check if portal data exists in Supabase
    const { data: existingData, error: fetchError } = await supabase
      .from('portal_data')
      .select('data')
      .eq('id', 'main')
      .single();

    if (fetchError || !existingData) {
      throw new Error(fetchError?.message || 'No data found');
    }
    localStorage.setItem(DATA_KEY, JSON.stringify(existingData.data));
  } catch (e) {
    console.error("Supabase fetch failed, using local/initial data", e);
    if (!localStorage.getItem(DATA_KEY)) {
      const initialData = {
        appIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/512x512.png',
        emergencyContacts,
        districtOfficials,
        healthFacilities,
        touristSpots,
        eApplications,
        educationData,
        historyData,
        landServices: landServicesData,
        navItems: initialNavItems,
        contactInfo,
        bloodDonors,
        pharmacies
      };
      localStorage.setItem(DATA_KEY, JSON.stringify(initialData));
    }
  }
  
  // Initialize local storage for other keys if needed
  if (!localStorage.getItem(COMPLAINTS_KEY)) {
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(CONTACT_MESSAGES_KEY)) {
    localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify([]));
  }
};

export const getPortalData = () => {
  const data = localStorage.getItem(DATA_KEY);
  return data ? JSON.parse(data) : null;
};

export const updatePortalData = async (newData: any) => {
  try {
    localStorage.setItem(DATA_KEY, JSON.stringify(newData));
    
    // Sync with Supabase
    try {
      await supabase.from('portal_data').upsert({ id: 'main', data: newData });
    } catch (supabaseError) {
      console.error("Supabase sync failed, but local data updated", supabaseError);
    }

    // Notify same-tab listeners
    notifyListeners(newData);
    // Notify other-tab listeners
    broadcastChannel.postMessage({ type: 'DATA_UPDATE', payload: newData });
    // Global storage event for legacy support
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error("Failed to update portal data", e);
    throw e;
  }
};

export const getComplaints = async () => {
  try {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (e) {
    console.error("Error fetching complaints from Supabase", e);
    const localData = localStorage.getItem(COMPLAINTS_KEY);
    return localData ? JSON.parse(localData) : [];
  }
};

export const saveComplaint = async (complaint: any) => {
  const newComplaint = { 
    ...complaint, 
    status: 'Pending', 
    date: new Date().toLocaleString('bn-BD') 
  };

  try {
    const { data, error } = await supabase
      .from('complaints')
      .insert([newComplaint])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (e) {
    console.error("Error saving complaint to Supabase, falling back to local", e);
    const complaints = JSON.parse(localStorage.getItem(COMPLAINTS_KEY) || '[]');
    const localComplaint = { ...newComplaint, id: Date.now().toString() };
    complaints.unshift(localComplaint);
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
    return localComplaint;
  }
};

export const updateComplaint = async (id: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('complaints')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (e) {
    console.error("Error updating complaint in Supabase", e);
    return null;
  }
};

export const deleteComplaint = async (id: string) => {
  try {
    const { error } = await supabase
      .from('complaints')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (e) {
    console.error("Error deleting complaint from Supabase", e);
  }
};

export const getContactMessages = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (e) {
    console.error("Error fetching messages from Supabase", e);
    const localData = localStorage.getItem(CONTACT_MESSAGES_KEY);
    return localData ? JSON.parse(localData) : [];
  }
};

export const saveContactMessage = async (message: any) => {
  const newMessage = { 
    ...message, 
    date: new Date().toLocaleString('bn-BD') 
  };

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([newMessage])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (e) {
    console.error("Error saving message to Supabase, falling back to local", e);
    const messages = JSON.parse(localStorage.getItem(CONTACT_MESSAGES_KEY) || '[]');
    const localMsg = { ...newMessage, id: Date.now().toString() };
    messages.unshift(localMsg);
    localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(messages));
    return localMsg;
  }
};

export const getUsers = async () => {
  const { data, error } = await supabase.from('profiles').select('*');
  return error ? [] : data;
};

export const saveUser = async (user: any) => {
  // This is now handled by Supabase Auth in Auth.tsx
  // But we might need to create the profile
  const { data, error } = await supabase.from('profiles').insert([user]);
  if (error) console.error("Error saving user profile", error);
  return data;
};

export const updateUser = async (updatedUser: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updatedUser)
    .eq('id', updatedUser.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating user profile", error);
    return null;
  }
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data));
  return data;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const loginUser = async (email: string, pass: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) throw error;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profile) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
    return profile;
  }
  return null;
};

export const logoutUser = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem(CURRENT_USER_KEY);
};
