import React from 'react';
import { RefreshCcw } from 'lucide-react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in duration-700">
      <div className="relative">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
          <RefreshCcw className="w-12 h-12 text-green-600 animate-spin" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-bounce"></div>
      </div>
      
      <div className="space-y-4 flex flex-col items-center w-full max-w-md">
        <div className="h-8 w-64 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 w-40 bg-gray-100 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-3xl border border-gray-100 p-8 space-y-6 shadow-sm">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-5 w-3/4 bg-gray-100 rounded-full animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-50 rounded-full animate-pulse"></div>
            </div>
            <div className="pt-4 flex gap-2">
              <div className="h-10 flex-grow bg-gray-50 rounded-xl animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-50 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
