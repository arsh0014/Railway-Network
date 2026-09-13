import React from 'react';
import { futureDemandData } from '../data/dashboardData';

const PersonIcon = ({ color = '#A71920' }) => (
  <svg width="18" height="26" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Head */}
    <circle cx="12" cy="6" r="4.5" fill={color} />
    {/* Body */}
    <path 
      d="M5 14C5 12.8954 5.89543 12 7 12H17C18.1046 12 19 12.8954 19 14V22H16V34C16 34.5523 15.5523 35 15 35H13C12.4477 35 12 34.5523 12 34V23H12V34C12 34.5523 11.5523 35 11 35H9C8.44772 35 8 34.5523 8 34V22H5V14Z" 
      fill={color} 
    />
  </svg>
);

export const FutureDemandCard = () => {
  // 10 people icons: 4 in row 1, 4 in row 2, 2 in row 3
  const row1Colors = ['#A71920', '#B8281E', '#CC3F1E', '#D9532F'];
  const row2Colors = ['#9E1A1F', '#B3241F', '#C53720', '#D64C28'];
  const row3Colors = ['#8A1217', '#9E1A1F'];

  return (
    <div className="future-demand-card">
      <div className="people-cluster" title="Global Investment & Population Demand: $145B Pipeline">
        <div className="people-row">
          {row1Colors.map((color, idx) => (
            <PersonIcon key={`r1-${idx}`} color={color} />
          ))}
        </div>
        <div className="people-row">
          {row2Colors.map((color, idx) => (
            <PersonIcon key={`r2-${idx}`} color={color} />
          ))}
        </div>
        <div className="people-row" style={{ justifyContent: 'flex-start', paddingLeft: '1px' }}>
          {row3Colors.map((color, idx) => (
            <PersonIcon key={`r3-${idx}`} color={color} />
          ))}
        </div>
      </div>
      <div className="demand-text-col">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 className="demand-title">{futureDemandData.title}</h3>
        </div>
        <p className="demand-desc">{futureDemandData.description}</p>
      </div>
    </div>
  );
};

export default FutureDemandCard;
