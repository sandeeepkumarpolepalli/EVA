
import axios from "axios";
import React, { useEffect, useState } from "react";

const PatchNotes = ({ appId }) => {
  const [patchNotes, setPatchNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatchNotes = async () => {
      try {
        // Directly await the response, no need for .then()
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/events/ajaxgetadjacentpartnerevents/?appid=899770&count_before=0&count_after=100&event_type_filter=13",
          {
            headers: {
              Authorization: "Bearer YOUR_API_KEY", // Use your CORS Anywhere API key here
            },
          }
        );

        // Log the response to check its structure
        console.log("API Response:", response);

        // Ensure response and data exist before trying to access it
        if (response && response.data) {
          const events = response.data?.events || [];
          setPatchNotes(events);
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

  if (loading) return <div>Loading patch notes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Patch Notes</h1>
      {patchNotes.length === 0 ? (
        <p>No patch notes available.</p>
      ) : (
        patchNotes.map((note) => (
          <div key={note.gid} style={{ marginBottom: "20px" }}>
            <h2>{note.event_name}</h2>
            <p>
              <strong>Start Time:</strong>{" "}
              {new Date(note.rtime32_start_time * 1000).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong>{" "}
              {new Date(note.rtime32_end_time * 1000).toLocaleString()}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: note.announcement_body.body.replace(
                  /\[\/?[^\]]*\]/g,
                  ""
                ),
              }}
              style={{
                padding: "10px",
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default PatchNotes;