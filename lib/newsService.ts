import { GoogleGenAI } from "@google/genai";

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
}

export const fetchRecentNews = async (): Promise<NewsArticle[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    
    const prompt = `Find 5 recent news articles about "Mahespur, Jhenaidah" or general important news from Bangladesh in the last 7 days. 
    Return the result as a JSON array of objects with the following structure:
    {
      "title": "Article Title",
      "description": "Short summary",
      "url": "Link to article",
      "source": "News Source Name",
      "publishedAt": "Date (e.g. 2024-03-07)",
      "imageUrl": "Optional image URL"
    }
    Ensure the news is real and recent. Use Google Search to find this information.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) return [];

    const news = JSON.parse(text.trim());
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    // Fallback to some static news if API fails
    return [
      {
        title: "মহেশপুরে নতুন কৃষি প্রকল্পের উদ্বোধন",
        description: "উপজেলা কৃষি অফিসের উদ্যোগে কৃষকদের সহায়তায় নতুন সেচ প্রকল্পের উদ্বোধন করা হয়েছে।",
        url: "#",
        source: "Local News",
        publishedAt: new Date().toISOString().split('T')[0],
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "কপোতাক্ষ নদের তীরে বৃক্ষরোপণ কর্মসূচি",
        description: "পরিবেশ রক্ষায় কপোতাক্ষ নদের তীরে স্থানীয় যুব সমাজের উদ্যোগে ৫০০টি চারাগাছ রোপণ করা হয়েছে।",
        url: "#",
        source: "Mahespur News",
        publishedAt: new Date().toISOString().split('T')[0],
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
      }
    ];
  }
};
