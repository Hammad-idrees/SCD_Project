import React, { useState } from 'react'; 
import './SlidingPanel.css';  

const SlidingPanel = ({ togglePanel, isOpen }) => {   
  const [searchQuery, setSearchQuery] = useState('');   
  const [foodResults, setFoodResults] = useState([]);   
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState(null);    

  // Function to handle the search query submission   
  const handleSearch = async (e) => {     
    e.preventDefault();     
    if (!searchQuery) return;      

    setLoading(true);
    setError(null);

    try {       
      // Use Spoonacular API for food search
      const apiKey = '08fcd28da1d148119c69a97f8efffbd4'; // Replace with your actual Spoonacular API key
      const response = await fetch(
        `https://api.spoonacular.com/food/search?query=${encodeURIComponent(searchQuery)}&apiKey=${apiKey}`
      );
        
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
        
      const data = await response.json();

      if (data.searchResults && data.searchResults.length > 0) {
        // Adjust based on actual Spoonacular API response structure
        setFoodResults(data.searchResults[0].results);
      } else {
        setError('No results found.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };    

  return (
    <div className={`sliding-panel ${isOpen ? 'open' : ''}`}>
      <div className="panel-toggle" onClick={togglePanel}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <polyline points="15 18 9 12 15 6"></polyline>
          )}
        </svg>
      </div>
      <div className="panel-content">
        <h2>Tomato AI</h2>
        <p>Search about your favourite foods and restaurants here with the help of our new CHATBOT Tomato Ai...</p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for food..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        
        {/* Loading, Error, or Results */}
        {loading && <p className="loading-indicator">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {foodResults.length > 0 && (
          <div className="food-results">
            {foodResults.map((food, index) => (
              <div key={index} className="food-item">
                <h3>{food.name}</h3>
                <p>{food.description || 'No description available'}</p>
                {food.image && (
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="food-image" 
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ); 
};  

export default SlidingPanel;