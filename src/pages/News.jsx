import React, { useEffect, useState } from "react";

// SVG Icons components
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// NewsModal component with social sharing
const NewsModal = ({ news, onClose }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(news?.title || '');

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setShowShareOptions(false);
  };

  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-blue-900 rounded-lg z-50 m-4">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors z-10">
          <CloseIcon />
        </button>
        <div className="relative w-full h-[40vh]">
          <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-blue-900 px-3 py-1 rounded-full text-sm text-white">{news.category}</span>
            <span className="text-gray-400">{news.date}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">{news.title}</h2>
          <div className="flex items-center space-x-4 mb-6 text-gray-400">
            <span>By {news.author}</span>
            <span>•</span>
            <span>{news.readTime}</span>
          </div>
          <div className="prose prose-invert max-w-none text-white">{news.content}</div>
          <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-800">
            <div className="relative">
              <button 
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Share
              </button>
              {showShareOptions && (
                <div className="absolute bottom-full left-0 mb-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-700 text-white"
                  >
                    <WhatsAppIcon />
                    <span>WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-700 text-white"
                  >
                    <FacebookIcon />
                    <span>Facebook</span>
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-700 text-white"
                  >
                    <TwitterIcon />
                    <span>Twitter</span>
                  </button>
                </div>
              )}
            </div>
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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isCardAutoScrolling, setIsCardAutoScrolling] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const cardsPerPage = 3;

  const NewsGrid = () => {
    const totalCards = newsData.slice(1).length;
    const maxStartIndex = Math.max(0, totalCards - cardsPerPage);
    const visibleCards = newsData
      .slice(1)
      .slice(currentCardIndex, currentCardIndex + cardsPerPage);

    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentCardIndex * 100) / cardsPerPage}%)`,
            }}
          >
            {newsData.slice(1).map((news) => (
              <div
                key={news.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-3"
                onClick={() => setSelectedNews(news)}
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                  <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-900 px-2 py-1 rounded-full text-xs text-white">{news.category}</span>
                      <span className="text-xs text-gray-400">{news.date}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{news.title}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>{news.author}</span>
                      <span className="mx-2">•</span>
                      <span>{news.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => {
            setIsCardAutoScrolling(false);
            setCurrentCardIndex((prev) => prev === 0 ? maxStartIndex : prev - 1);
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-blue-900/75 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={() => {
            setIsCardAutoScrolling(false);
            setCurrentCardIndex((prev) => prev >= maxStartIndex ? 0 : prev + 1);
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-blue-900/75 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronRightIcon />
        </button>
      </div>
    );
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_KEY = "ca0078c8431dc2f3d98547353f13f9ac";
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=esports&token=${API_KEY}`
        );
        const data = await response.json();

        const transformedData = data.articles.map((article, index) => ({
          id: index,
          title: article.title,
          date: new Date(article.publishedAt).toLocaleDateString(),
          category: article.source.name,
          readTime: `${Math.ceil(article.content?.length / 1000 || 3)} min read`,
          image: article.image || "/api/placeholder/800/400",
          content: article.content,
          author: article.author || 'Unknown'
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
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling, newsData.length]);

  useEffect(() => {
    let interval;
    if (isCardAutoScrolling && newsData.length > 0) {
      interval = setInterval(() => {
        setCurrentCardIndex((prevIndex) => {
          const maxStartIndex = Math.max(0, newsData.length - 1 - cardsPerPage);
          return prevIndex >= maxStartIndex ? 0 : prevIndex + 1;
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isCardAutoScrolling, newsData.length]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading news...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto bg-black text-white px-4 py-8">
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
                  <img src={news.image} alt={news.title} className="w-full h-96 object-cover opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-900 px-3 py-1 rounded-full text-sm">{news.category}</span>
                      <span className="text-sm text-gray-300">{news.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">{news.title}</h2>
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
            <ChevronLeftIcon />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-blue-900/75 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRightIcon />
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
      <div className="mt-8">
        <NewsGrid />
      </div>
      {selectedNews && <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />}
    </div>
  );
};

export default News;