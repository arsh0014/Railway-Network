import React from 'react';

export const CountryTooltip = ({ countryData }) => {
  if (!countryData) return null;

  const { name, percentage, category, investment, x, y } = countryData;

  const getStatusColor = (pct) => {
    if (pct >= 80) return '#0B2A63';
    if (pct >= 60) return '#2B78C5';
    if (pct >= 30) return '#F28C28';
    if (pct >= 10) return '#D9532F';
    return '#A71920';
  };

  return (
    <div 
      className="country-tooltip" 
      style={{ 
        left: `${x}px`, 
        top: `${y}px` 
      }}
    >
      <div className="tooltip-header">
        <span className="tooltip-country-name">{name}</span>
        <span 
          className="tooltip-badge" 
          style={{ backgroundColor: getStatusColor(percentage) }}
        >
          {percentage}% Electrified
        </span>
      </div>

      <div className="tooltip-row">
        <span className="tooltip-label">Category:</span>
        <span className="tooltip-value">{category || 'Regional Rail'}</span>
      </div>

      {investment && (
        <div className="tooltip-row" style={{ flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
          <span className="tooltip-label">Investment Potential:</span>
          <span className="tooltip-value" style={{ fontSize: '10.5px', color: '#17305C' }}>
            {investment}
          </span>
        </div>
      )}
    </div>
  );
};

export default CountryTooltip;
