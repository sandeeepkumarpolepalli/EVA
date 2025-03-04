import React, { useEffect, useState } from "react";

const UpcomingGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Client-ID", "lyo7ydq8zqzn8nlb8mbaqw7wrjcbv8");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 9nj63gocq412lepvpf30lmlv6rdvx4"
      );

      const raw = `fields name, cover.url, first_release_date, summary, storyline, genres.name;
        where first_release_date != null 
          & first_release_date > 1672531200 
          & name != "PilotXross";
        sort first_release_date desc;
        limit 4;`;

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      try {
        const response = await fetch(
          "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games",
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        const processedGames = result.map((game) => ({
          ...game,
          coverUrl: game.cover?.url
            ? game.cover.url.replace("thumb", "cover_big")
            : "/api/placeholder/600/800",
        }));
        setGames(processedGames);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setError("Failed to load upcoming games");
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-sm text-blue-400">Loading upcoming games...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-sm text-red-400">{error}</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-left ml-7 mb-5 pl-0 font-bold">Latest Games</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/20 to-black/20 border border-transparent group hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
          >
            {/* Game Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={game.coverUrl}
                alt={game.name}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Genre Badge */}
              {game.genres && game.genres[0] && (
                <span className="absolute top-4 left-4 bg-blue-600 text-xs px-3 py-1 rounded text-white font-medium">
                  {game.genres[0].name}
                </span>
              )}
            </div>

            {/* Game Info */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2 truncate">
                {game.name}
              </h3>
              
              <p className="text-sm text-gray-300 line-clamp-2 mb-4 min-h-[40px]">
                {game.summary || game.storyline || "A free-to-play multiplayer game."}
              </p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-blue-500/50 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingGames;