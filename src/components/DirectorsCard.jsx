import React from 'react';
import { directorsData } from '../data/dashboardData';

export const DirectorsCard = ({ onSelectDirector }) => {
  return (
    <div className="dashboard-card">
      <h3 className="card-heading">DIRECTORS</h3>
      <div className="directors-subgrid">
        {directorsData.map((director) => (
          <div 
            key={director.id} 
            className="director-item-card"
            onClick={() => onSelectDirector && onSelectDirector(director)}
            title={`${director.name} - ${director.title} (Click to view full executive profile)`}
          >
            <div className="director-img-wrapper">
              <img 
                src={`${director.image}?v=${Date.now()}`} 
                alt={director.name}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectorsCard;
