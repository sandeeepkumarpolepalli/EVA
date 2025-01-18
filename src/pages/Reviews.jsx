import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Lists.css";

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
    return <div className="loading">Loading games...</div>;
  }
  return (
    <div className="post-list">
      {games.map((game) => (
        <div key={game.id} className="post-card">
          <Link to={`/game/${game.id}`}>
            <img
              src={game.background_image}
              alt={game.name}
              className="game-image"
            />
            <span className="category">{game.genres[0]?.name || "N/A"}</span>
            <p className="post-date">{game.released}</p>
            <h3 className="post-title">{game.name}</h3>
            <p className="game-rating">Rating: {game.rating}/5</p>
            <p className="game-metacritic">
              Metacritic: {game.metacritic || "N/A"}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default List;