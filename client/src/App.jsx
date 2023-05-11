import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "https://www.dnd5eapi.co/api/";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/monsters?name=${searchQuery}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching for monsters:", error);
    }
  };

  const handleSearchQueryChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/monsters?name=${query}`
        );
        const recommendedNames = response.data.results.slice(0, 10);
        setRecommendations(recommendedNames);
      } catch (error) {
        console.error("Error getting recommended names:", error);
      }
    } else {
      setRecommendations([]);
    }
  };

  const handleRecommendedNameClick = async (name) => {
    setSearchQuery(name);
    try {
      const response = await axios.get(`${API_BASE_URL}/monsters?name=${name}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching for monsters:", error);
    }
  };

  const handleAddToFavorites = (monster) => {
    setFavorites((prevFavorites) => [...prevFavorites, monster]);
    setSearchResults((prevSearchResults) =>
      prevSearchResults.filter((item) => item !== monster)
    );
  };

  return (
    <div className="app">
      <h1>D&D Monster Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Enter a monster name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {recommendations.length > 0 && (
        <ul className="recommendations">
          {recommendations.map((monster) => (
            <li
              key={monster.index}
              onClick={() => handleRecommendedNameClick(monster.name)}
              className="recommended-name"
            >
              {monster.name}
            </li>
          ))}
        </ul>
      )}

      <h2>Search Results</h2>
      <ul className="search-results">
        {searchResults.map((monster) => (
          <li key={monster.index}>
            <h3>{monster.name}</h3>
            <button onClick={() => handleAddToFavorites(monster)}>
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>

      <h2>Favorites</h2>
      <ul className="favorites">
        {favorites.map((monster) => (
          <li key={monster.index}>
            <h3>{monster.name}</h3>
            {monster.damage_types && (
              <p>Damage Types: {monster.damage_types.join(", ")}</p>
            )}
            {monster.skills && (
              <p>
                Skills: {monster.skills.map((skill) => skill.name).join(", ")}
              </p>
            )}
            {monster.classes && (
              <p>
                Classes:{" "}
                {monster.classes.map((classItem) => classItem.name).join(", ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
