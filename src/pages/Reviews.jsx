import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchGames() {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=2b35b8a0368d4c85bec5248784c9ada8`
      );
      const data = await response.json();
      setGames(data.results);
      console.log(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching game data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Loading games...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="group bg-gradient-to-b from-black via-blue-900 to-black 
                     rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                     transition-all duration-300 transform hover:-translate-y-2"
          >
            <Link to={`/game/${game.id}`} className="block">
              <div className="relative">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-48 object-cover transition-transform duration-300 
                           group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 
                              rounded-full text-sm font-medium">
                  {game.genres[0]?.name || "N/A"}
                </span>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-400 text-sm">{game.released}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-sm">{game.rating}</span>
                      <span className="text-gray-400 text-sm">/5</span>
                    </div>
                    {game.metacritic && (
                      <span className={`px-2 py-1 rounded text-sm ${
                        game.metacritic >= 80 ? 'bg-green-500' :
                        game.metacritic >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      } text-white`}>
                        {game.metacritic}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-white text-lg font-bold mb-2 
                             group-hover:text-blue-400 transition-colors duration-300 
                             line-clamp-2">
                  {game.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;