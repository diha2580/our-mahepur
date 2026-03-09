import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, Calendar, RefreshCw, Loader2, ArrowRight } from 'lucide-react';
import { fetchRecentNews, NewsArticle } from '../lib/newsService';
import { motion } from 'framer-motion';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const data = await fetchRecentNews();
      setNews(data);
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1.5 w-12 bg-green-500 rounded-full"></div>
            <span className="text-xs font-black text-green-600 uppercase tracking-[0.3em]">Recent Updates</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-green-600" />
            সাম্প্রতিক খবর ও আপডেট
          </h2>
        </div>
        
        <button 
          onClick={() => loadNews(true)}
          disabled={loading || refreshing}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-green-600 hover:border-green-200 shadow-sm transition-all active:scale-95 disabled:opacity-50"
        >
          {refreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          রিফ্রেশ করুন
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm animate-pulse">
              <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-6"></div>
              <div className="h-6 bg-gray-100 rounded-full w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-100 rounded-full w-full mb-2"></div>
              <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              {article.imageUrl && (
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-green-600 shadow-lg uppercase tracking-wider">
                      {article.source}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-bold">{article.publishedAt}</span>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-green-600 transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-sm text-gray-500 line-clamp-3 mb-8 font-medium leading-relaxed">
                  {article.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 font-bold hover:underline group/link"
                  >
                    বিস্তারিত পড়ুন
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="mt-12 text-center">
        <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95">
          সকল খবর দেখুন
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default NewsSection;
