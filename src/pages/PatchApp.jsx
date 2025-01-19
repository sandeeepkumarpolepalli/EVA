import React, { useState } from "react";
import PatchNotes from "./PatchNotes";

// Steam CDN URL for game header images
const getGameImage = (appId) =>
  `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;

// Games array defined within the file
const games = [
  {
    id: 570,
    name: "Dota 2",
    description:
      "A free-to-play multiplayer online battle arena (MOBA) video game.",
  },
  {
    id: 730,
    name: "CS:GO",
    description:
      "Counter-Strike: Global Offensive (CS:GO) is a multiplayer first-person shooter.",
  },
  {
    id: 440,
    name: "Team Fortress 2",
    description: "Team Fortress 2 is a multiplayer first-person shooter game.",
  },
  {
    id: 1172470,
    name: "Apex Legends",
    description: "A free-to-play hero shooter battle royale game.",
  },
  {
    id: 578080,
    name: "PUBG: BATTLEGROUNDS",
    description: "Battle royale shooter game.",
  },
  {
    id: 1091500,
    name: "Cyberpunk 2077",
    description: "An open-world action role-playing game.",
  },
  {
    id: 271590,
    name: "Grand Theft Auto V",
    description: "An action-adventure game in an open world setting.",
  },
  {
    id: 1085660,
    name: "Destiny 2",
    description: "A free-to-play online multiplayer first-person shooter.",
  },
  {
    id: 1245620,
    name: "Elden Ring",
    description: "An action role-playing game in a dark fantasy setting.",
  },
  {
    id: 292030,
    name: "The Witcher 3",
    description: "An open-world fantasy action role-playing game.",
  },
  {
    id: 1506830,
    name: "FIFA 23",
    description: "A football simulation sports video game.",
  },
  {
    id: 359550,
    name: "Rainbow Six Siege",
    description:
      "A tactical shooter game focusing on team play and destruction.",
  },

];

const GameSelector = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
  };

  const handleBack = () => {
    setSelectedGame(null);
  };

  // Filter games based on search term
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a game is selected, show patch notes
  if (selectedGame) {
    return <PatchNotes appId={selectedGame} onBack={handleBack} />;
  }

  // Main component render
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Game Patch Notes</h1>
      
      {/* Search input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg bg-gradient-to-r from-blue-900/50 to-black/50 
                     border border-blue-800/30 text-white placeholder-blue-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                     transition-all duration-300"
        />
      </div>

      {/* Game cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => handleGameSelect(game.id)}
            className="bg-gradient-to-br from-blue-900 via-blue-950 to-black 
                       rounded-lg overflow-hidden cursor-pointer
                       border border-blue-800/30 shadow-lg shadow-blue-900/20
                       transform transition-all duration-300 hover:-translate-y-1 
                       hover:shadow-xl hover:shadow-blue-900/30"
          >
            <img
              src={getGameImage(game.id)}
              alt={game.name}
              className="w-full h-48 object-cover transform transition-transform duration-300 
                         group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/320/180";
              }}
            />
            <div className="p-4 border-b border-blue-800/30">
              <h2 className="text-xl font-bold text-white">{game.name}</h2>
            </div>
            <div className="p-4">
              <p className="text-sm text-blue-200">{game.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add this to debug */}
      <div className="mt-4 text-white">
        Number of games showing: {filteredGames.length}
      </div>
    </div>
  );
};

export default GameSelector;