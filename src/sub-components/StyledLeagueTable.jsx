import axios from "axios";
import React, { useEffect, useState } from "react";

const StandingLeagueTable = () => {
  const [leagues, setLeagues] = useState([]);
  const [error, setError] = useState("");
  const IMAGE_BASE_URL = "https://images.sportdevs.com/";

  const formatDate = (dateString) => {
    if (!dateString) return "T.B.A";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "T.B.A";
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    
    return `${day}-${month}-${year}`;
  };

  const fetchLeagues = async () => {
    const config = {
      method: "get",
      url: "https://esports.sportdevs.com/leagues?limit=10",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer f-5ixQ7KNkecJ8O0XgJ_NA",
      },
    };

    try {
      const response = await axios(config);
      setLeagues(response.data);
    } catch (err) {
      console.error("Error Fetching Data:", err);
      setError("Failed to fetch leagues. Please try again later.");
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4 bg-gray-900 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
  Popular Esports Leagues{" "}
  <span role="img" aria-label="fire">
    🔥
  </span>
</h1>


      <p className="mb-2">Start your journey by knowing the leagues schedule!</p>
      
      <div className="bg-gray-900 p-8 rounded-lg border-2 border-blue-500 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-blue-500">
                <th className="px-6 py-4 text-left text-gray-300 font-medium">
                  League ID
                </th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">
                  Logo
                </th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">
                  Name
                </th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">
                  Start Date
                </th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody>
              {leagues.map((league) => (
                <tr 
                  key={league.id} 
                  className="border-b border-blue-500 hover:bg-blue-900 transition-colors duration-300"
                >
                  <td className="px-6 py-4 text-gray-300">
                    {league.id}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={`${IMAGE_BASE_URL}${league.hash_image || league.class_hash_image}.png`}
                      alt={`${league.name} logo`}
                      className="w-10 h-10 object-cover rounded-lg border border-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {league.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-center">
                    {formatDate(league.start_league)}
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-center">
                    {formatDate(league.end_league)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StandingLeagueTable;