import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=2b35b8a0368d4c85bec5248784c9ada8`
        );
        const data = await response.json();
        setGame(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setIsLoading(false);
      }
    }
    fetchGameDetails();
  }, [id]);

  if (isLoading) return <div>Loading game details...</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} />
      <p>Released: {game.released}</p>
      <p>Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>
      <p>Description: {game.description_raw}</p>
    </div>
  );
}

export default GameDetails;