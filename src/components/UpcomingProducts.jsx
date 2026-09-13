import React from 'react';
import { upcomingProductsData } from '../data/dashboardData';

export const UpcomingProducts = ({ onSelectUpcoming }) => {
  return (
    <div className="dashboard-section">
      <h3 className="card-heading">UPCOMING PRODUCTS</h3>
      <div className="dashboard-card">
        <div className="upcoming-products-subgrid">
        {upcomingProductsData.map((item) => (
          <div 
            key={item.id} 
            className="upcoming-item-card"
            onClick={() => onSelectUpcoming && onSelectUpcoming(item)}
            title={`Upcoming: ${item.name} - ${item.tagline}`}
          >
            <div className="upcoming-img-wrapper">
              <img 
                src={item.image} 
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=300&auto=format&fit=crop&q=80';
                }}
              />
            </div>
            <span className="upcoming-title-label">{item.name}</span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingProducts;
