
export const formatPhoneForDialer = (phone: string): string => {
  const bengaliToEnglish: { [key: string]: string } = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };

  // Convert Bengali digits to English
  const standardPhone = phone.split('').map(char => bengaliToEnglish[char] || char).join('');
  
  // Remove everything except numbers and '+'
  return standardPhone.replace(/[^\d+]/g, '');
};
