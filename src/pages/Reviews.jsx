import { Search } from "lucide-react";
import { useEffect, useState } from "react";

function List() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading games...</div>;
  }

  return (
    <div className="p-4">
      {/* Search Section */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-gray-900 to-blue-900 text-white placeholder-gray-400 transition-all duration-300 hover:from-blue-900 hover:to-gray-900"
          />
          <button className="absolute right-2 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div 
            key={game.id} 
            className="relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-r before:from-blue-500 before:to-blue-900 before:rounded-lg before:-z-10"
            style={{
              boxShadow: '0 4px 20px -2px rgba(0, 0, 150, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="relative">
              <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded">
                {game.genres[0]?.name || "N/A"}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-gray-900 to-blue-900">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-100">{game.released}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">{game.rating}</span>
                  <span className="text-blue-100">/5</span>
                </div>
              </div>
              {game.metacritic && (
                <div className={`inline-block px-2 py-1 rounded ${
                  game.metacritic >= 80 ? 'bg-green-500' :
                  game.metacritic >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                } text-white mb-2`}>
                  {game.metacritic}
                </div>
              )}
              <h3 className="text-xl font-semibold text-white">{game.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;