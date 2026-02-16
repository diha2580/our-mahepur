
import { emergencyContacts, districtOfficials, healthFacilities, touristSpots, eApplications } from '../data';

const CACHE_KEY = 'district_portal_cache_v1';

export const syncDataToCache = () => {
  const dataToCache = {
    emergencyContacts,
    districtOfficials,
    healthFacilities,
    touristSpots,
    eApplications,
    lastSynced: new Date().toISOString()
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
  console.log('Data synced to offline cache');
};

export const getCachedData = () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }
  return null;
};

export const hasCache = () => {
  return localStorage.getItem(CACHE_KEY) !== null;
};
