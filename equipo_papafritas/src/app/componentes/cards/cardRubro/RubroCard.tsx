import React from 'react';
import './RubroCard.css';

const RubroCard = ({ url, name, image }:any) => {
  return (
    <a href={url} className="rubro-card">
      <div className="rubro-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="rubro-card-name">
        {name}
      </div>
    </a>
  );
};

export default RubroCard;
