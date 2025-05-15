import { useState, useEffect, useRef } from "react";
import { FiMapPin } from "react-icons/fi";

// List of countries and cities for suggestions
const LOCATIONS = [
  // Countries
  "United States", "Canada", "United Kingdom", "Australia", "Germany", 
  "France", "Spain", "Italy", "Netherlands", "Belgium", "Switzerland", 
  "Ireland", "Sweden", "Norway", "Denmark", "Finland", "Japan", "China", 
  "India", "Brazil", "Mexico", "Argentina", "South Africa", "New Zealand", 
  "Singapore", "Hong Kong", "United Arab Emirates", "Egypt", "Israel", 
  "Thailand", "Indonesia", "Malaysia", "Philippines", "Vietnam", "South Korea",
  
  // Major cities in the US
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "San Francisco", "Columbus", "Indianapolis", "Seattle", "Denver", "Boston",
  "Las Vegas", "Portland", "Nashville", "Atlanta", "Miami", "New Orleans",
  
  // Major international cities
  "London", "Paris", "Tokyo", "Sydney", "Berlin", "Rome", "Madrid", "Toronto",
  "Barcelona", "Amsterdam", "Dubai", "Cairo", "Mumbai", "Bangkok", "Seoul",
  "Mexico City", "Buenos Aires", "Rio de Janeiro", "Johannesburg", "Stockholm",
  "Copenhagen", "Vienna", "Prague", "Budapest", "Dublin", "Brussels", "Zurich"
];

export default function LocationSearch({ value, onChange, onSearch }) {
  const [inputValue, setInputValue] = useState(value || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Update suggestions when input changes
  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const filtered = LOCATIONS.filter(location => 
        location.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setShowSuggestions(false);
    onSearch({ type: "click" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(e);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleFocus = () => {
    if (inputValue.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative flex-grow">
      <div className="flex items-center">
        <FiMapPin className="text-gray-500 mr-2" size={20} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Location (city or country)"
          className="w-full py-2 pr-4 text-sm text-gray-700 focus:outline-none"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg py-1 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm flex items-center"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <FiMapPin className="text-gray-500 mr-2" size={16} />
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
