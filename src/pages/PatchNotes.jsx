import React, { useEffect, useState } from "react";

const PatchNotes = ({ appId }) => {
  const [patchNotes, setPatchNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatchNotes = async () => {
      try {
        const response = await fetch(
          "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/events/ajaxgetadjacentpartnerevents/?appid=899770&count_before=0&count_after=100&event_type_filter=13",
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer YOUR_API_KEY', // Your CORS Anywhere API key
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data && data.events) {
          setPatchNotes(data.events);
        } else {
          throw new Error("Invalid response data structure");
        }
      } catch (err) {
        setError("Failed to fetch patch notes. Please try again later.");
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatchNotes();
  }, [appId]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading patch notes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Patch Notes</h1>
      {patchNotes.length === 0 ? (
        <p className="text-gray-600 text-center">No patch notes available.</p>
      ) : (
        <div className="space-y-6">
          {patchNotes.map((note) => (
            <div 
              key={note.gid} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-2">
                  {note.event_name}
                </h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Start Time:</strong>{" "}
                    {new Date(note.rtime32_start_time * 1000).toLocaleString()}
                  </p>
                  <p>
                    <strong>End Time:</strong>{" "}
                    {new Date(note.rtime32_end_time * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
              <div 
                className="p-4 prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: note.announcement_body.body.replace(/\[\/?[^\]]*\]/g, ""),
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatchNotes;