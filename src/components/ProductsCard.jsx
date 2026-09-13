import React from 'react';
import { productsData } from '../data/dashboardData';

export const ProductsCard = ({ onSelectProduct }) => {
  return (
    <div className="dashboard-section">
      <h3 className="card-heading">PRODUCTS</h3>
      <div className="dashboard-card">
        <div className="products-subgrid">
        {productsData.map((product) => (
          <div 
            key={product.id} 
            className="product-item-card"
            onClick={() => onSelectProduct && onSelectProduct(product)}
            title={`View details for ${product.name}`}
          >
            <div className="product-img-wrapper">
              <img 
                src={product.image} 
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80';
                }}
              />
            </div>
            <span className="product-title-label">{product.name}</span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
