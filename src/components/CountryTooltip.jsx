import React from 'react';
import { getElectrificationColor, getElectrificationCategory } from '../data/dashboardData';

export const CountryTooltip = ({ countryData }) => {
  if (!countryData) return null;

  const {
    name,
    percentage,
    displayPercentage,
    category,
    region,
    routeKm,
    electrifiedKm,
    operator,
    x,
    y
  } = countryData;

  const badgeColor = getElectrificationColor(percentage);
  const resolvedCategory = category || getElectrificationCategory(percentage);
  const formattedPct = displayPercentage || `${percentage}%`;

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
          style={{ backgroundColor: badgeColor }}
        >
          {formattedPct} Electrified
        </span>
      </div>

      <div className="tooltip-row">
        <span className="tooltip-label">Country:</span>
        <span className="tooltip-value">{name}</span>
      </div>

      <div className="tooltip-row">
        <span className="tooltip-label">Electrification:</span>
        <span className="tooltip-value" style={{ color: badgeColor, fontWeight: '800' }}>
          {formattedPct}
        </span>
      </div>

      <div className="tooltip-row">
        <span className="tooltip-label">Category:</span>
        <span className="tooltip-value">{resolvedCategory}</span>
      </div>

      {region && (
        <div className="tooltip-row">
          <span className="tooltip-label">Region:</span>
          <span className="tooltip-value">{region}</span>
        </div>
      )}

      {routeKm && electrifiedKm && (
        <div className="tooltip-row">
          <span className="tooltip-label">Electrified / Total:</span>
          <span className="tooltip-value">{electrifiedKm} / {routeKm}</span>
        </div>
      )}

      {operator && (
        <div className="tooltip-row" style={{ marginTop: '2px', borderTop: '1px dashed #E2ECF5', paddingTop: '4px' }}>
          <span className="tooltip-label">Operator:</span>
          <span className="tooltip-value" style={{ fontSize: '11px', color: '#17305C' }}>
            {operator}
          </span>
        </div>
      )}
    </div>
  );
};

export default CountryTooltip;
