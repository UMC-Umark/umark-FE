import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./SearchBox.css";

const SearchBox = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      onSearch(searchInput.trim());
      console.log(`Search result: You just typed ${searchInput}`);
    } else {
      console.log("Search result: No input");
    }
  };

  const handleCancel = () => {
    setSearchInput("");
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Type to search.."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="search-icon" onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </div>
      <div className="cancel-icon" onClick={handleCancel}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default SearchBox;
