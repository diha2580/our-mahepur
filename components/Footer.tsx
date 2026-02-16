import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-800 pb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-500">পরিকল্পনা ও বাস্তবায়নে</h3>
            <p className="text-sm text-gray-400">
              মহেশপুর উপজেলা প্রশাসন ও আইসিটি সেল। <br />
              যেকোনো প্রয়োজনে আমাদের ইমেইল করুন অথবা কল করুন।
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-500">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white">জাতীয় তথ্য বাতায়ন</a></li>
              <li><a href="#" className="hover:text-white">ই-নামজারি আবেদন</a></li>
              <li><a href="#" className="hover:text-white">পাসপোর্ট আবেদন</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-500">যোগাযোগ</h3>
            <p className="text-sm text-gray-400">
              ইমেইল: info@moheshpur.gov.bd <br />
              হেল্পলাইন: ৩৩৩, ৯৯৯ (জরুরি)
            </p>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} আমাদের মহেশপুর। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;