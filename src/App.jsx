import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.scss";

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const link = "https://api.lyrics.ovh/v1/Lil Skies/Havin my way";
      try {
        const response = await axios.get(link);
        const data = await response.data;

        setData(data);
      } catch (error) {
        console.log(error);
        setError("Lyrics not found. Check your search term.");
      }
    };

    fetchData();
  }, []);
  if (data && !error) {
    return (
      <div>
        <form>
          <p>Search the lyrics you want to know</p>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <input type="submit" value="Search lyrics" />
        </form>

        {!data.lyrics ? <p>loading...</p> : <p>{data.lyrics}</p>}
      </div>
    );
  } else {
    return (
      <div>
        <form>
          <p>Search the lyrics you want to know</p>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <input type="submit" value="Search lyrics" />
        </form>
        <p>{error}</p>
      </div>
    );
  }
}

export default App;
