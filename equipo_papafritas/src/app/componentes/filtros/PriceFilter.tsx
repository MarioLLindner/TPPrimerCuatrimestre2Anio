import React, { useState } from 'react';
import './PriceFilter.css'

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div className="filter-container">
      <h2>PRECIO</h2>
      <div className="filter-option">
        <input type="radio" id="range1" name="priceRange" />
        <label htmlFor="range1">Menos de $ 533.884 (65)</label>
      </div>
      <div className="filter-option">
        <input type="radio" id="range2" name="priceRange" />
        <label htmlFor="range2">$ 533.884 a $ 1.153.599 (66)</label>
      </div>
      <div className="filter-option">
        <input type="radio" id="range3" name="priceRange" />
        <label htmlFor="range3">$ 1.153.599 o más (67)</label>
      </div>
      <div className="custom-range">
        <input 
          type="number" 
          placeholder="Min" 
          value={minPrice} 
          onChange={(e) => setMinPrice(e.target.value)} 
        />
        <span>-</span>
        <input 
          type="number" 
          placeholder="Max" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(e.target.value)} 
        />
        <button className="filter-button">{">"}</button>
      </div>
    </div>
  );
};
export default PriceFilter;
