import React from 'react';
import { securedVansMarketData } from '../data/dashboardData';

export const SecuredVansMarket = () => {
  const { wayside, onboard } = securedVansMarketData;

  const maxWayside = 1350;
  const maxOnboard = 26;

  return (
    <div className="dashboard-section">
      <h3 className="card-heading">SECURED VANS MARKET</h3>
      <div className="dashboard-card">
        <div className="secured-market-subgrid">
        {/* WAY SIDE VCB Chart */}
        <div className="market-chart-col">
          <div className="chart-header-row">
            <span className="chart-axis-unit">{wayside.unit}</span>
            {wayside.cagr && <span className="chart-cagr-badge">{wayside.cagr}</span>}
          </div>

          <div className="bars-container-area">
            {wayside.data.map((item) => {
              // Scale bar height cleanly between 25px and 75px
              const barHeight = Math.round((item.value / maxWayside) * 58) + 18;
              return (
                <div key={item.year} className="bar-column-item">
                  <span className="bar-val-text">{item.label}</span>
                  <div 
                    className="market-bar-rect" 
                    style={{ height: `${barHeight}px` }}
                    title={`Way Side VCB ${item.year}: ${item.label} Cr | ${item.units}`}
                  />
                  <span className="bar-year-text">{item.year}</span>
                </div>
              );
            })}
          </div>

          <span className="chart-title-tag">{wayside.title}</span>
        </div>

        {/* ON BOARD VCB Chart */}
        <div className="market-chart-col">
          <div className="chart-header-row">
            <span className="chart-axis-unit">{onboard.unit}</span>
            {onboard.cagr && <span className="chart-cagr-badge">{onboard.cagr}</span>}
          </div>

          <div className="bars-container-area">
            {onboard.data.map((item) => {
              // Scale bar height cleanly between 25px and 75px
              const barHeight = Math.round((item.value / maxOnboard) * 58) + 18;
              return (
                <div key={item.year} className="bar-column-item">
                  <span className="bar-val-text">{item.label}</span>
                  <div 
                    className="market-bar-rect" 
                    style={{ height: `${barHeight}px` }}
                    title={`On Board VCB ${item.year}: ${item.label} Cr | ${item.units}`}
                  />
                  <span className="bar-year-text">{item.year}</span>
                </div>
              );
            })}
          </div>

          <span className="chart-title-tag">{onboard.title}</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SecuredVansMarket;
