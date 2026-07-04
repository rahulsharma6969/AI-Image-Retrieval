import { Search, CornerDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/search/text", { text: searchText });
      console.log("Search Results:", response.data);
    } catch (error) {
      console.error("Error during search request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`lg:flex md:flex items-center gap-4 p-4 w-full ${loading ? "blur-sm" : ""}`}>
      <Link to="/">
        <img src="/images/mindflix.png" width={160} height={55} alt="logo" />
      </Link>
      <div className="flex items-center bg-gray-800 rounded-lg p-2 px-4 flex-1 min-w-[300px] hover:bg-gray-700">
        <Search className="text-white" size={20} />
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full bg-transparent outline-none ml-2 text-white h-10"
          disabled={loading}
        />
        <button
          className="flex items-center justify-center p-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-950 hover:shadow-lg hover:scale-105 disabled:opacity-50"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "..." : <CornerDownRight size={30} />}
        </button>
      </div>
    </div>
  );
}