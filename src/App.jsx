import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.scss";

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const link = "https://api.lyrics.ovh/v1/Lil Skies/Havin my way";
      try {
        const response = await axios.get(link);
        const data = await response.data;

        setData(data);
      } catch (error) {
        setError("Lyrics not found. Check your search term.");
      }
    };

    fetchData();
  }, []);

  const searchLyrics = async (e) => {
    const link = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    e.preventDefault();

    try {
      const response = await axios.get(link);
      const data = await response.data;

      setData(data);
    } catch {
      setError("Lyrics not found. Check your search term.");
    }
  };

  if (data && !error) {
    return (
      <div>
        <form onSubmit={searchLyrics}>
          <p>Artist</p>
          <input type="text" onChange={(e) => setArtist(e.target.value)} />
          <p>Song</p>
          <input type="text" onChange={(e) => setSong(e.target.value)} />
          <input type="submit" value="Search lyrics" />
        </form>

        {!data.lyrics ? <p>loading...</p> : <p>{data.lyrics}</p>}
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={searchLyrics}>
          <p>Artist</p>
          <input type="text" onChange={(e) => setArtist(e.target.value)} />
          <p>Song</p>
          <input type="text" onChange={(e) => setSong(e.target.value)} />
          <input type="submit" value="Search lyrics" />
        </form>
        {error ? <p>{error}</p> : <p>{data.lyrics}</p>}
      </div>
    );
  }
}

export default App;
