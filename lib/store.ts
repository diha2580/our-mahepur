
import { emergencyContacts, districtOfficials, healthFacilities, touristSpots, eApplications, educationData, initialNavItems, ADMIN_EMAIL } from '../data';

const DATA_KEY = 'portal_app_data_v1';
const USERS_KEY = 'portal_users_v1';
const CURRENT_USER_KEY = 'portal_current_user';
const COMPLAINTS_KEY = 'portal_complaints_v1';
const ADMIN_PWD_KEY = 'portal_admin_password';

export const getAdminPassword = () => {
  return localStorage.getItem(ADMIN_PWD_KEY) || 'Nahian685372@@';
};

export const updateAdminPassword = (newPassword: string) => {
  localStorage.setItem(ADMIN_PWD_KEY, newPassword);
  // Also update the password in the users list for the admin user
  const users = getUsers();
  const adminIndex = users.findIndex((u: any) => u.email === ADMIN_EMAIL);
  if (adminIndex !== -1) {
    users[adminIndex].password = newPassword;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

// Initialize data if not exists
export const initStorage = () => {
  try {
    if (!localStorage.getItem(DATA_KEY)) {
      localStorage.setItem(DATA_KEY, JSON.stringify({
        emergencyContacts,
        districtOfficials,
        healthFacilities,
        touristSpots,
        eApplications,
        educationData,
        navItems: initialNavItems
      }));
    }
    
    // Always check/update admin user on init
    const users = getUsers();
    const adminIndex = users.findIndex((u: any) => u.email === ADMIN_EMAIL);
    
    const adminUser = {
      id: 'admin-1',
      name: 'অ্যাডমিন ইউজার',
      email: ADMIN_EMAIL,
      phone: '01700000000',
      profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      role: 'admin',
      password: getAdminPassword()
    };

    if (adminIndex === -1) {
      users.push(adminUser);
    } else {
      // Ensure password in users list matches current stored admin password
      users[adminIndex].password = getAdminPassword();
    }
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    if (!localStorage.getItem(COMPLAINTS_KEY)) {
      localStorage.setItem(COMPLAINTS_KEY, JSON.stringify([]));
    }
  } catch (e) {
    console.error("Storage initialization failed", e);
  }
};

export const getPortalData = () => {
  const data = localStorage.getItem(DATA_KEY);
  return data ? JSON.parse(data) : null;
};

export const updatePortalData = (newData: any) => {
  try {
    localStorage.setItem(DATA_KEY, JSON.stringify(newData));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error("Failed to update portal data", e);
    throw e;
  }
};

export const getComplaints = () => {
  const data = localStorage.getItem(COMPLAINTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveComplaint = (complaint: any) => {
  const complaints = getComplaints();
  const newComplaint = { 
    ...complaint, 
    id: Date.now().toString(), 
    status: 'Pending', 
    date: new Date().toLocaleString('bn-BD') 
  };
  complaints.unshift(newComplaint);
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
  return newComplaint;
};

export const updateComplaint = (id: string, updates: any) => {
  const complaints = getComplaints();
  const index = complaints.findIndex((c: any) => c.id === id);
  if (index !== -1) {
    complaints[index] = { ...complaints[index], ...updates };
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
    return complaints[index];
  }
  return null;
};

export const deleteComplaint = (id: string) => {
  const complaints = getComplaints();
  const filtered = complaints.filter((c: any) => c.id !== id);
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(filtered));
};

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: any) => {
  const users = getUsers();
  const newUser = { ...user, id: Date.now().toString(), role: user.email === ADMIN_EMAIL ? 'admin' : 'user' };
  users.push(newUser);
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Quota exceeded while saving user", e);
    throw e;
  }
};

export const updateUser = (updatedUser: any) => {
  const users = getUsers();
  const index = users.findIndex((u: any) => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    } catch (e) {
      console.error("Quota exceeded while updating user", e);
      throw e;
    }
  }
  return null;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const loginUser = (email: string, pass: string) => {
  const users = getUsers();
  const user = users.find((u: any) => u.email === email && u.password === pass);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
