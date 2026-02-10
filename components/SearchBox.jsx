import React, { useState, useEffect } from "react";
import "../styles/SearchBox.css";

function SearchBox({ doctors, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Simple Elasticsearch-like search functionality
  const performSearch = (term) => {
    if (!term.trim()) {
      onSearch(doctors);
      setSuggestions([]);
      return;
    }

    const lowerTerm = term.toLowerCase();

    // Search through clinical areas
    const matchedDoctors = doctors.filter((doctor) => {
      if (!doctor.clinicalAreas || !Array.isArray(doctor.clinicalAreas)) {
        return false;
      }

      return doctor.clinicalAreas.some((area) =>
        area.name.toLowerCase().includes(lowerTerm),
      );
    });

    // Get unique clinical areas that match the search term for suggestions
    const uniqueAreas = new Set();
    doctors.forEach((doctor) => {
      if (doctor.clinicalAreas && Array.isArray(doctor.clinicalAreas)) {
        doctor.clinicalAreas.forEach((area) => {
          if (area.name.toLowerCase().includes(lowerTerm)) {
            uniqueAreas.add(area.name);
          }
        });
      }
    });

    setSuggestions(Array.from(uniqueAreas).slice(0, 8));
    onSearch(matchedDoctors);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
    performSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(doctors);
  };

  return (
    <div className="search-box-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search by clinical area..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {searchTerm && (
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-icon">🔍</span>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {searchTerm && suggestions.length === 0 && (
        <div className="suggestions-dropdown">
          <div className="suggestion-item disabled">
            No clinical areas found
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
