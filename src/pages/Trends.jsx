import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RAWG_API_KEY = "2b35b8a0368d4c85bec5248784c9ada8";
const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];

const Trends = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingGames, setTrendingGames] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [timeRange, setTimeRange] = useState("30");

  const fetchGameData = async () => {
    try {
      setLoading(true);
      const currentDate = new Date();
      const pastDate = new Date(
        currentDate.setDate(currentDate.getDate() - parseInt(timeRange))
      );
      const formattedDate = pastDate.toISOString().split("T")[0];

      const response = await fetch(
        `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&dates=${formattedDate},2024-12-31&ordering=-added&page_size=20`
      );
      const data = await response.json();

      const transformedGames = data.results.map((game) => ({
        name: game.name,
        rating: game.rating,
        added: game.added,
        released: new Date(game.released).toLocaleDateString(),
      }));

      const genreCounts = {};
      data.results.forEach((game) => {
        game.genres.forEach((genre) => {
          genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
        });
      });

      const genreStats = Object.entries(genreCounts).map(([name, value]) => ({
        name,
        value,
      }));

      const ratingRanges = {
        "Outstanding (4.5-5)": 0,
        "Great (4-4.4)": 0,
        "Good (3-3.9)": 0,
        "Mixed (2-2.9)": 0,
        "Poor (0-1.9)": 0,
      };

      data.results.forEach((game) => {
        if (game.rating >= 4.5) ratingRanges["Outstanding (4.5-5)"]++;
        else if (game.rating >= 4) ratingRanges["Great (4-4.4)"]++;
        else if (game.rating >= 3) ratingRanges["Good (3-3.9)"]++;
        else if (game.rating >= 2) ratingRanges["Mixed (2-2.9)"]++;
        else ratingRanges["Poor (0-1.9)"]++;
      });

      const ratingStats = Object.entries(ratingRanges).map(([name, value]) => ({
        name,
        value,
      }));

      setTrendingGames(transformedGames);
      setGenreData(genreStats);
      setRatingData(ratingStats);
      setError(null);
    } catch (err) {
      setError("Failed to fetch game data. Please try again later.");
      console.error("Error fetching game data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-blue-100">
        <div className="text-lg">Loading game trends...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-100">Gaming Trends & Analytics</h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTimeRange("7")}
            className={`px-4 py-2 rounded transition-all duration-200 ${
              timeRange === "7"
                ? "bg-blue-600 text-white"
                : "bg-blue-900 text-blue-100 hover:bg-blue-800"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange("30")}
            className={`px-4 py-2 rounded transition-all duration-200 ${
              timeRange === "30"
                ? "bg-blue-600 text-white"
                : "bg-blue-900 text-blue-100 hover:bg-blue-800"
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeRange("90")}
            className={`px-4 py-2 rounded transition-all duration-200 ${
              timeRange === "90"
                ? "bg-blue-600 text-white"
                : "bg-blue-900 text-blue-100 hover:bg-blue-800"
            }`}
          >
            90 Days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900/50 to-black/50 p-6 rounded-lg shadow-xl border border-blue-800 h-[400px]">
          <h2 className="text-xl font-semibold mb-4 text-blue-100">
            Top Games by Player Count
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendingGames.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#93c5fd" />
              <YAxis stroke="#93c5fd" />
              <Tooltip contentStyle={{ backgroundColor: '#1e3a8a', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="added" fill="#60A5FA" name="Player Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-black/50 p-6 rounded-lg shadow-xl border border-blue-800 h-[400px]">
          <h2 className="text-xl font-semibold mb-4 text-blue-100">Rating Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ratingData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {ratingData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e3a8a', border: 'none', borderRadius: '8px' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-black/50 p-6 rounded-lg shadow-xl border border-blue-800 h-[400px]">
          <h2 className="text-xl font-semibold mb-4 text-blue-100">Genre Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#93c5fd" />
              <YAxis stroke="#93c5fd" />
              <Tooltip contentStyle={{ backgroundColor: '#1e3a8a', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="value" fill="#34D399" name="Number of Games" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-black/50 p-6 rounded-lg shadow-xl border border-blue-800 h-[400px]">
          <h2 className="text-xl font-semibold mb-4 text-blue-100">Rating Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendingGames.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#93c5fd" />
              <YAxis stroke="#93c5fd" />
              <Tooltip contentStyle={{ backgroundColor: '#1e3a8a', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#F87171"
                name="Average Rating"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Trends;