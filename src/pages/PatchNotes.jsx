import React, { useEffect, useState } from "react";

const PatchNotes = ({ appId, onBack }) => {
  const [patchNotes, setPatchNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedNote, setExpandedNote] = useState(null);

  useEffect(() => {
    const fetchPatchNotes = async () => {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://store.steampowered.com/events/ajaxgetadjacentpartnerevents/?appid=${appId}&count_before=0&count_after=100&event_type_filter=13`
        );
        const data = await response.json();

        if (data && data.events) {
          setPatchNotes(data.events);
        } else {
          throw new Error("Invalid response or no patch notes found.");
        }
      } catch (err) {
        setError("Failed to fetch patch notes. Please try again later.");
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (appId) {
      fetchPatchNotes();
    }
  }, [appId]);

  const toggleNote = (gid) => {
    setExpandedNote(expandedNote === gid ? null : gid);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 px-6 py-4">
      <button 
        onClick={onBack} 
        className="px-4 py-2 mb-6 text-gray-300 flex items-center gap-2 hover:text-white transition-colors"
      >
        <span>←</span> Back to Games
      </button>

      <div className="text-3xl text-blue-400 mb-8 px-4">PATCH NOTES</div>
      
      <div className="space-y-6">
        {loading && <div className="text-blue-400 p-4">Loading patch notes...</div>}
        {error && <div className="text-red-400 p-4">{error}</div>}
        {!loading && !error && (
          <>
            {patchNotes.length === 0 ? (
              <div className="text-blue-400 p-4">No patch notes available.</div>
            ) : (
              patchNotes.map((note) => (
                <div key={note.gid} className="w-full">
                  <button
                    onClick={() => toggleNote(note.gid)}
                    className="w-full text-left py-8 px-8 text-blue-400 hover:text-blue-300 transition-colors text-lg bg-gray-800 bg-opacity-30"
                  >
                    {note.event_name}
                  </button>
                  
                  {expandedNote === note.gid && (
                    <div className="px-8 py-6 border-t border-gray-700 text-gray-300 bg-gray-800 bg-opacity-30">
                      <div className="text-sm text-blue-400 mb-2">
                        Start: {new Date(note.rtime32_start_time * 1000).toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-400 mb-4">
                        End: {new Date(note.rtime32_end_time * 1000).toLocaleString()}
                      </div>
                      <div 
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: note.announcement_body?.body }}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PatchNotes;