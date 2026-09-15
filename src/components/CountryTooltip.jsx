import React from 'react';
import { getElectrificationColor, getElectrificationCategory } from '../data/dashboardData';

export const CountryTooltip = ({ countryData }) => {
  if (!countryData) return null;

  const {
    name,
    percentage,
    displayPercentage,
    displayElectrification,
    category,
    region,
    routeKm,
    electrifiedKm,
    operator,
    source,
    x,
    y
  } = countryData;

  const isDataNA = percentage === null || percentage === undefined;
  const badgeColor = getElectrificationColor(percentage);
  const resolvedCategory = category || getElectrificationCategory(percentage);
  const formattedPct = isDataNA ? 'N/A' : (displayPercentage || displayElectrification || `${percentage}%`);

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
          {isDataNA ? 'Electrification: N/A' : `${formattedPct} Electrified`}
        </span>
      </div>

      <div className="tooltip-row">
        <span className="tooltip-label">Country:</span>
        <span className="tooltip-value">{name}</span>
      </div>

      {isDataNA && routeKm && (
        <div className="tooltip-row">
          <span className="tooltip-label">Railway Network:</span>
          <span className="tooltip-value">{routeKm}</span>
        </div>
      )}

      <div className="tooltip-row">
        <span className="tooltip-label">Electrification:</span>
        <span className="tooltip-value" style={{ color: badgeColor, fontWeight: '800' }}>
          {formattedPct}
        </span>
      </div>

      {!isDataNA && (
        <div className="tooltip-row">
          <span className="tooltip-label">Category:</span>
          <span className="tooltip-value">{resolvedCategory}</span>
        </div>
      )}

      {region && (
        <div className="tooltip-row">
          <span className="tooltip-label">Region:</span>
          <span className="tooltip-value">{region}</span>
        </div>
      )}

      {!isDataNA && routeKm && electrifiedKm && (
        <div className="tooltip-row">
          <span className="tooltip-label">Electrified / Total:</span>
          <span className="tooltip-value">{electrifiedKm} / {routeKm}</span>
        </div>
      )}

      {isDataNA && (
        <div className="tooltip-row" style={{ marginTop: '2px', borderTop: '1px dashed #E2ECF5', paddingTop: '4px' }}>
          <span className="tooltip-label">Source:</span>
          <span className="tooltip-value" style={{ fontSize: '11px', color: '#17305C' }}>
            {source || 'Global Railway Network Directory'}
          </span>
        </div>
      )}

      {!isDataNA && operator && (
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
