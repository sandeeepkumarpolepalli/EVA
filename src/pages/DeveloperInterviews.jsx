import React, { useEffect, useState } from "react";

const YOUTUBE_API_KEY = "AIzaSyA8PoUo9dLqEqQIQ3Q4zrYTkqG5uyeH0vM";
const NEWS_API_KEY = "4950f6e4f34a4150a7330523ab479f27";

const DeveloperInterviews = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchYouTubeVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=game%20developer%20interviews&type=video&maxResults=9&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      return data.items.map((item) => ({
        id: item.id.videoId,
        developerName: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        description: item.snippet.description,
        date: item.snippet.publishedAt,
        type: "video",
        role: "Game Developer",
        company: "Various",
      }));
    } catch (err) {
      console.error("Error fetching YouTube videos:", err);
      throw err;
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=game%20developer%20interviews&apiKey=${NEWS_API_KEY}`
      );
      const data = await response.json();
      return data.articles.slice(0, 9).map((article) => ({
        id: article.url,
        developerName: article.author || "Unknown Author",
        thumbnailUrl: article.urlToImage || "/api/placeholder/320/180",
        articleUrl: article.url,
        description: article.description || article.content,
        date: article.publishedAt,
        type: "article",
        role: "Industry Professional",
        company: article.source.name,
      }));
    } catch (err) {
      console.error("Error fetching articles:", err);
      throw err;
    }
  };

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      const [videos, articles] = await Promise.all([
        fetchYouTubeVideos(),
        fetchArticles(),
      ]);
      const combinedContent = [...videos, ...articles].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setInterviews(combinedContent);
      setError(null);
    } catch (err) {
      setError("Failed to fetch content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  const filteredInterviews =
    selectedType === "all"
      ? interviews
      : interviews.filter((interview) => interview.type === selectedType);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-lg text-white">Loading content...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Developer Insights</h1>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              selectedType === "all"
                ? "bg-blue-600 text-white"
                : "bg-gradient-to-r from-gray-800 to-blue-900 text-white hover:from-blue-900 hover:to-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedType("video")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              selectedType === "video"
                ? "bg-blue-600 text-white"
                : "bg-gradient-to-r from-gray-800 to-blue-900 text-white hover:from-blue-900 hover:to-gray-800"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setSelectedType("article")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              selectedType === "article"
                ? "bg-blue-600 text-white"
                : "bg-gradient-to-r from-gray-800 to-blue-900 text-white hover:from-blue-900 hover:to-gray-800"
            }`}
          >
            Articles
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInterviews.map((interview) => (
          <div
            key={interview.id}
            className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] relative before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-r before:from-blue-500 before:to-blue-900 before:rounded-lg before:-z-10"
            style={{
              boxShadow: '0 4px 20px -2px rgba(0, 0, 150, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="relative">
              <img
                src={interview.thumbnailUrl}
                alt={`${interview.developerName} thumbnail`}
                className="w-full h-48 object-cover"
              />
              {interview.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 text-white text-5xl">▶</div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-100">
                  {new Date(interview.date).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-blue-600 text-white">
                  {interview.type}
                </span>
              </div>

              <h2 className="text-xl font-semibold mb-2 text-white">
                {interview.developerName}
              </h2>

              <div className="text-sm text-blue-100 mb-2">
                {interview.role} at {interview.company}
              </div>

              <p className="text-gray-300 mb-4 line-clamp-3">
                {interview.description}
              </p>

              <a
                href={interview.videoUrl || interview.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                {interview.type === "video" ? "Watch Video" : "Read Article"}
                <span className="ml-1">↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperInterviews;