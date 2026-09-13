import React from 'react';
import { untappedMarketsData } from '../data/dashboardData';

export const UntappedMarkets = () => {
  return (
    <div className="mini-metric-card">
      <div className="untapped-countries-col">
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#A71920', marginBottom: '2px' }}>
          <span style={{ fontSize: '14px' }}>▼</span>
          <span style={{ color: '#17305C' }}>USA</span>
        </div>
        <div>Canada</div>
        <div>Argentina</div>
      </div>

      <div className="untapped-gauge-box">
        {/* Semi-circular Gauge */}
        <svg width="60" height="42" viewBox="0 0 60 42">
          {/* Background Arc */}
          <path 
            d="M 6 36 A 24 24 0 0 1 54 36" 
            fill="none" 
            stroke="#E2ECF5" 
            strokeWidth="7" 
            strokeLinecap="round"
          />
          {/* Active Value Arc */}
          <path 
            d="M 6 36 A 24 24 0 0 1 18 16" 
            fill="none" 
            stroke="#A71920" 
            strokeWidth="7" 
            strokeLinecap="round"
          />
          <text 
            x="30" 
            y="36" 
            textAnchor="middle" 
            fontFamily="Outfit, sans-serif" 
            fontSize="10px" 
            fontWeight="800" 
            fill="#A71920"
          >
            &lt; 5%
          </text>
        </svg>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
          <h4 className="metric-card-title" style={{ margin: 0 }}>Untapped Markets</h4>
          <span style={{ fontSize: '9px', fontWeight: '800', background: '#FDE8E9', color: '#A71920', padding: '1px 6px', borderRadius: '8px' }}>
            {untappedMarketsData.totalPipelineValue}
          </span>
        </div>
        <p className="metric-card-desc">{untappedMarketsData.caption}</p>
      </div>
    </div>
  );
};

export default UntappedMarkets;
