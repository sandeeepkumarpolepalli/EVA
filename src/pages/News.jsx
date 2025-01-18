import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const NewsModal = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-blue-900 rounded-lg z-50 m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Hero image */}
        <div className="relative w-full h-[40vh]">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-blue-900 px-3 py-1 rounded-full text-sm text-white">
              {news.category}
            </span>
            <span className="text-gray-400">{news.date}</span>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-white">{news.title}</h2>

          <div className="flex items-center space-x-4 mb-6 text-gray-400">
            <span>By {news.author}</span>
            <span>•</span>
            <span>{news.readTime}</span>
          </div>

          <div className="prose prose-invert max-w-none text-white">
            {news.content}
          </div>

          {/* Share buttons */}
          <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-800">
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Share
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [categories, setCategories] = useState([
    "Latest",
    "Gaming",
    "Tech",
    "Reviews",
  ]);
  const [activeCategory, setActiveCategory] = useState("Latest");

  const CategoryTabs = () => (
    <div className="flex space-x-4 mb-6 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );

  const NewsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {newsData.slice(1, 7).map((news) => (
        <div
          key={news.id}
          className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
          onClick={() => setSelectedNews(news)}
        >
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-900 px-2 py-1 rounded-full text-xs text-white">
                {news.category}
              </span>
              <span className="text-xs text-gray-400">{news.date}</span>
            </div>
            <h3 className="text-white font-semibold mb-2 line-clamp-2">
              {news.title}
            </h3>
            <div className="flex items-center text-xs text-gray-400">
              <span>{news.author}</span>
              <span className="mx-2">•</span>
              <span>{news.readTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    
      const fetchNews = async () => {
        try {
          const API_KEY = "3ea93115b3b0aee4b406773d62a99227"; // Replace with your NewsAPI key
          const response = await fetch(
            `https://gnews.io/api/v4/search?q=esports&token=${API_KEY}`
          );
          const data = await response.json();
  
          const transformedData = data.articles.map((article, index) => ({
            id: index,
            title: article.title,
            date: new Date(article.publishedAt).toLocaleDateString(),
            category: article.source.name,
            readTime: `${Math.ceil(
              article.content?.length / 1000 || 3
            )} min read`,
            // author: article.author || "Unknown",
            image: article.image || "/api/placeholder/800/400",
            content: article.content,
          }));
  
          setNewsData(transformedData);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch news");
          setLoading(false);
        }
      };
  
      fetchNews();
    }, []);
  

  useEffect(() => {
    let interval;
    if (isAutoScrolling && newsData.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, newsData.length]);

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto bg-black text-white px-4 py-8">
        <CategoryTabs />
        <div className="relative w-full max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-blue-500">Latest News</h1>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newsData.map((news) => (
                <div key={news.id} className="w-full flex-shrink-0">
                  <div className="relative bg-black border border-blue-900">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-96 object-cover opacity-80"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-blue-900 px-3 py-1 rounded-full text-sm">
                          {news.category}
                        </span>
                        <span className="text-sm text-gray-300">
                          {news.date}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2 text-white">
                        {news.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>By {news.author}</span>
                        <span>{news.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-blue-900/75 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-blue-900/75 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {newsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoScrolling(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-500" : "bg-blue-900"
                }`}
              />
            ))}
          </div>
        </div>
        <NewsGrid />
      </div>
      {/* Modal */}
      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}

      {/* View More button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View More News
        </button>
      </div>
    </>
  );
};

export default News;
