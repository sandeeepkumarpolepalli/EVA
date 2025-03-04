import React, { useEffect, useState } from "react";

const DeveloperInterviews = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getFallbackArticles = () => [
    {
      id: '1',
      developerName: "John Carmack",
      thumbnailUrl: "/api/placeholder/320/180",
      articleUrl: "https://www.washingtonpost.com/video-games/2023/08/17/john-carmack-interview-ai/",
      description: "John Carmack discusses his transition from VR to AI development, reflecting on his time at id Software and Meta, while sharing insights about the future of game technology and artificial intelligence",
      date: "2023-08-17T12:00:00Z",
      type: "article",
      role: "Industry Professional",
      company: "Keen Technologies"
    },
    {
      id: '2',
      developerName: "Jade Raymond",
      thumbnailUrl: "/api/placeholder/320/180",
      articleUrl: "https://www.gamesindustry.biz/haven-studios-jade-raymond-on-building-a-studio-during-the-pandemic",
      description: "Haven Studios founder discusses building a new development studio during challenging times and their partnership with PlayStation for cloud-native games",
      date: "2023-06-15T14:30:00Z",
      type: "article",
      role: "Studio Head",
      company: "Haven Studios"
    },
    {
      id: '3',
      developerName: "Todd Howard",
      thumbnailUrl: "/api/placeholder/320/180",
      articleUrl: "https://www.ign.com/articles/starfield-todd-howard-interview-bethesda",
      description: "Bethesda's Todd Howard reflects on Starfield's development, discussing the challenges and innovations in creating their first new universe in 25 years",
      date: "2023-09-05T09:15:00Z",
      type: "article",
      role: "Game Director",
      company: "Bethesda Game Studios"
    }
  ];
  const fetchYouTubeVideos = async () => {
    // First check if API key exists
    const apiKey = "AIzaSyA8PoUo9dLqEqQIQ3Q4zrYTkqG5uyeH0vM";
    if (!apiKey) {
      console.warn("YouTube API key not found, using fallback data");
      return [];
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=game%20developer%20interviews&type=video&maxResults=9&key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API responded with status ${response.status}`);
      }

      const data = await response.json();
      
      // Check if data and items exist before mapping
      if (!data?.items?.length) {
        console.warn("No YouTube videos found");
        return [];
      }

      return data.items.map((item) => ({
        id: item.id.videoId,
        developerName: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails?.medium?.url || "/api/placeholder/320/180",
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        description: item.snippet.description,
        date: item.snippet.publishedAt,
        type: "video",
        role: "Game Developer",
        company: "Various",
      }));
    } catch (err) {
      console.error("Error fetching YouTube videos:", err);
      return []; // Return empty array on error
    }
  };

  const fetchArticles = async () => {
    // Always use fallback in production
    if (process.env.NODE_ENV === 'production') {
      return getFallbackArticles();
    }

    const newsapiKey = "4950f6e4f34a4150a7330523ab479f27";
    if (!newsapiKey) {
      console.warn("News API key not found, using fallback data");
      return getFallbackArticles();
    }

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=game%20developer%20interviews&apiKey=${newsapiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`News API responded with status ${response.status}`);
      }

      const data = await response.json();
      
      // Check if articles exist before processing
      if (!data?.articles?.length) {
        console.warn("No articles found, using fallback data");
        return getFallbackArticles();
      }

      return data.articles.slice(0, 9).map((article) => ({
        id: article.url,
        developerName: article.author || "Unknown Author",
        thumbnailUrl: article.urlToImage || "/api/placeholder/320/180",
        articleUrl: article.url,
        description: article.description || article.content || "No description available",
        date: article.publishedAt,
        type: "article",
        role: "Industry Professional",
        company: article.source?.name || "Unknown Source",
      }));
    } catch (err) {
      console.error("Error fetching articles:", err);
      return getFallbackArticles(); // Use fallback content on error
    }
  };

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before fetching
      
      const [videos, articles] = await Promise.all([
        fetchYouTubeVideos(),
        fetchArticles(),
      ]);
      
      const combinedContent = [...videos, ...articles].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      
      if (combinedContent.length === 0) {
        setError("No content available. Please check your API keys or try again later.");
      } else {
        setInterviews(combinedContent);
      }
    } catch (err) {
      setError("Failed to fetch content. Please try again later.");
      console.error("Error in fetchAllContent:", err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  // Filter interviews based on selectedType
  const filteredInterviews = selectedType === "all" 
    ? interviews
    : interviews.filter(interview => interview.type === selectedType);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Developer Interviews</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${
              selectedType === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedType("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedType === "video" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedType("video")}
          >
            Videos
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedType === "article" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedType("article")}
          >
            Articles
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className="border rounded-lg overflow-hidden shadow-lg">
              <img
                src={interview.thumbnailUrl}
                alt={`${interview.developerName}'s interview`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{interview.developerName}</h3>
                <p className="text-gray-600 mb-2">{interview.role} at {interview.company}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{interview.description}</p>
                <a
                  href={interview.type === "video" ? interview.videoUrl : interview.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {interview.type === "video" ? "Watch Video" : "Read Article"}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeveloperInterviews;