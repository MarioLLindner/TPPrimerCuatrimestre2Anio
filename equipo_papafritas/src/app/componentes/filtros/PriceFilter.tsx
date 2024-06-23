import React, { useState } from 'react';
import './PriceFilter.css'

const PriceFilter = () => {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  return (
    <div className="filtro-precios">
      <h3>PRECIO</h3>
      <ul>
        <li>Menos de $ 533.884 (65)</li>
        <li>$ 533.884 a $ 1.153.599 (66)</li>
        <li>$ 1.153.599 o más (67)</li>
      </ul>
      <div className="input-range">
        <input 
          type="number" 
          placeholder="Min" 
          value={min} 
          onChange={(e) => setMin(e.target.value)} 
        />
        <span>-</span>
        <input 
          type="number" 
          placeholder="Max" 
          value={max} 
          onChange={(e) => setMax(e.target.value)} 
        />
        <button>{">"}</button>
      </div>
    </div>
  );
}
export default PriceFilter;
