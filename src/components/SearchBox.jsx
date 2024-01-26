import React, { useState } from "react";
import "./SearchBox.css";
//import '@fortawesome/fontawesome-free/css/all.min.css';

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState("");

  const handleSearch = () => {
    if (searchInput !== "") {
      setSearchData(`You just typed ${searchInput}`);
      console.log(`Search result: You just typed ${searchInput}`);
    } else {
      setSearchData("");
      console.log("Search result: No input");
    }
  };

  const handleCancel = () => {
    setSearchData("");
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
      <div className={`search-data ${searchData ? "active" : ""}`}>
        {searchData && <span style={{ fontWeight: 500 }}>{searchData}</span>}
      </div>
    </div>
  );
};

export default SearchBox;
