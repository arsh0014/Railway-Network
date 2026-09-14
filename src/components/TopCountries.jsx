import React from 'react';
import { topCountriesData } from '../data/dashboardData';

export const TopCountries = () => {
  const maxBarHeight = 38;

  return (
    <div className="mini-metric-card">
      <div className="top-countries-chart-box">
        {/* Y Axis scale */}
        <div className="y-axis-labels">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        {/* 3 Vertical Bars */}
        <div className="bars-container">
          {topCountriesData.data.map((item) => {
            const heightPx = Math.max(4, Math.round((item.value / 100) * maxBarHeight));
            return (
              <div key={item.code} className="chart-bar-group">
                <div className="bar-slot">
                  <span className="bar-val-tag">{item.displayValue}</span>
                  <div 
                    className="vertical-bar" 
                    style={{ 
                      height: `${heightPx}px`,
                      backgroundColor: item.color || '#0B2A63'
                    }}
                    title={`${item.country}: ${item.value}% (${item.km}) - ${item.growth}`}
                  />
                </div>
                <span className="bar-x-label">{item.code}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ flex: 1, paddingLeft: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
          <h4 className="metric-card-title" style={{ margin: 0 }}>Top Countries</h4>
          <span style={{ fontSize: '9px', fontWeight: '800', background: '#EAF3FA', color: '#0B2A63', padding: '1px 6px', borderRadius: '8px' }}>
            Benchmarks
          </span>
        </div>
        <p className="metric-card-desc">{topCountriesData.caption}</p>
      </div>
    </div>
  );
};

export default TopCountries;
