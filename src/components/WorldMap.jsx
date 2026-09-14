import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { countryData, getElectrificationColor } from '../data/dashboardData';
import CountrySearch from './CountrySearch';

// Map label layout configuration for all 30 countries from official source dataset
const countryLabelLayout = {
  // ==================== AMERICAS ====================
  USA: { type: 'direct', pos: [249, 122], displayName: 'USA' },
  CAN: { type: 'direct', pos: [280, 75], displayName: 'Canada' },
  BRA: { type: 'direct', pos: [365, 283], displayName: 'Brazil' },
  ARG: { type: 'direct', pos: [348, 356], displayName: 'Argentina' },
  CHL: { type: 'callout', anchor: [330, 365], pos: [290, 365], textAnchor: 'end', displayName: 'Chile' },

  // ==================== EUROPE ====================
  GBR: { type: 'callout', anchor: [494, 90], pos: [462, 74], textAnchor: 'end', displayName: 'United Kingdom' },
  FRA: { type: 'direct', pos: [496, 116], displayName: 'France' },
  ESP: { type: 'direct', pos: [491, 136], displayName: 'Spain' },
  NLD: { type: 'callout', anchor: [512, 95], pos: [500, 56], textAnchor: 'middle', displayName: 'Netherlands' },
  BEL: { type: 'callout', anchor: [509, 101], pos: [458, 96], textAnchor: 'end', displayName: 'Belgium' },
  DEU: { type: 'direct', pos: [523, 98], displayName: 'Germany' },
  CHE: { type: 'callout', anchor: [518, 112], pos: [466, 114], textAnchor: 'end', displayName: 'Switzerland' },
  ITA: { type: 'direct', pos: [530, 128], displayName: 'Italy' },
  AUT: { type: 'callout', anchor: [532, 109], pos: [568, 112], textAnchor: 'start', displayName: 'Austria' },
  POL: { type: 'direct', pos: [544, 96], displayName: 'Poland' },
  SWE: { type: 'direct', pos: [534, 68], displayName: 'Sweden' },
  RUS: { type: 'direct', pos: [690, 68], displayName: 'Russia' },

  // ==================== AFRICA & MIDDLE EAST ====================
  MAR: { type: 'direct', pos: [478, 160], displayName: 'Morocco' },
  DZA: { type: 'direct', pos: [508, 168], displayName: 'Algeria' },
  ZAF: { type: 'direct', pos: [562, 338], displayName: 'South Africa' },
  TUR: { type: 'direct', pos: [584, 134], displayName: 'Turkey' },
  SAU: { type: 'direct', pos: [612, 178], displayName: 'Saudi Arabia' },

  // ==================== ASIA & PACIFIC ====================
  KAZ: { type: 'direct', pos: [653, 102], displayName: 'Kazakhstan' },
  UZB: { type: 'callout', anchor: [649, 126], pos: [618, 142], textAnchor: 'end', displayName: 'Uzbekistan' },
  IND: { type: 'direct', pos: [699, 183], displayName: 'India' },
  CHN: { type: 'direct', pos: [748, 142], displayName: 'China' },
  KOR: { type: 'callout', anchor: [808, 142], pos: [812, 168], textAnchor: 'middle', displayName: 'South Korea' },
  JPN: { type: 'callout', anchor: [830, 138], pos: [864, 134], textAnchor: 'start', displayName: 'Japan' },
  MYS: { type: 'callout', anchor: [780, 240], pos: [752, 260], textAnchor: 'end', displayName: 'Malaysia' },
  AUS: { type: 'direct', pos: [834, 328], displayName: 'Australia' }
};

const palette = {
  red: '#A71920',    // 0–10% Untapped
  low: '#D9532F',    // 10–30% Low
  orange: '#F28C28', // 30–60% Moderate
  blue: '#2B78C5',   // 60–80% Substantial
  navy: '#0B2A63'    // 80–100% Fully Electrified
};

export const WorldMap = ({ onSelectCountry, onHoverCountry }) => {
  const [hoveredCountryId, setHoveredCountryId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);

  const countries = useMemo(() => feature(worldAtlas, worldAtlas.objects.countries).features, []);
  const projection = useMemo(() => geoNaturalEarth1().fitExtent([[18, 18], [982, 492]], { type: 'FeatureCollection', features: countries }), [countries]);
  const path = useMemo(() => geoPath(projection), [projection]);

  // Lookup map from numeric 3-digit string to country record
  const countryByNumericId = useMemo(() => {
    const map = new Map();
    countryData.forEach((country) => {
      map.set(country.numericId, country);
      map.set(country.id, country);
    });
    return map;
  }, []);

  const handleEnter = (country, event) => {
    if (!country) return;
    setHoveredCountryId(country.id);
    onHoverCountry?.({
      ...country,
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleLeave = () => {
    setHoveredCountryId(null);
    onHoverCountry?.(null);
  };

  const handleClick = (country) => {
    if (!country) return;
    onSelectCountry?.(country);
  };

  const changeZoom = (amount) => setZoom((current) => Math.min(3, Math.max(1, Number((current + amount).toFixed(1)))));
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const handleWheel = (event) => {
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? 0.2 : -0.2);
  };

  const handlePointerDown = (event) => {
    if (zoom === 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStart({ x: event.clientX - pan.x, y: event.clientY - pan.y });
  };

  const handlePointerMove = (event) => {
    if (!dragStart) return;
    setPan({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
  };

  const stopDragging = () => setDragStart(null);

  return (
    <div className="map-container-card">
      {/* Floating Centered Country Search Control */}
      <div className="map-search-control">
        <CountrySearch onSelectCountry={onSelectCountry} />
      </div>

      <div className="map-zoom-controls" aria-label="Map zoom controls">
        <button type="button" onClick={() => changeZoom(0.2)} aria-label="Zoom in">+</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={() => changeZoom(-0.2)} aria-label="Zoom out">−</button>
        <button type="button" onClick={resetView} aria-label="Reset map view">Reset</button>
      </div>

      <svg 
        className={`world-map-svg${zoom > 1 ? ' is-zoomed' : ''}`} 
        viewBox="0 0 1000 520" 
        preserveAspectRatio="xMidYMid meet" 
        role="img" 
        aria-label="World railway network electrification map" 
        onWheel={handleWheel} 
        onPointerDown={handlePointerDown} 
        onPointerMove={handlePointerMove} 
        onPointerUp={stopDragging} 
        onPointerCancel={stopDragging}
      >
        <g transform={`translate(${500 + pan.x} ${260 + pan.y}) scale(${zoom}) translate(-500 -260)`}>
          {/* Countries polygons layer */}
          <g className="map-country-layer">
            {countries.map((countryFeature, idx) => {
              const code = String(countryFeature.id).padStart(3, '0');
              const country = countryByNumericId.get(code);
              const fillColor = country ? getElectrificationColor(country.percentage) : '#E7EDF3';
              const isActive = country && country.id === hoveredCountryId;

              return (
                <path 
                  key={`poly-${countryFeature.id || idx}-${idx}`} 
                  d={path(countryFeature)} 
                  fill={fillColor} 
                  className={`map-country-path${isActive ? ' active' : ''}`} 
                  onMouseEnter={(event) => handleEnter(country, event)} 
                  onMouseLeave={handleLeave} 
                  onClick={() => handleClick(country)} 
                />
              );
            })}
          </g>

          {/* Leader lines layer for callout countries */}
          <g className="map-leader-lines-layer" pointerEvents="none">
            {countryData.map((country) => {
              const config = countryLabelLayout[country.id];
              if (!config || config.type !== 'callout') return null;

              const [ax, ay] = config.anchor;
              const [lx, ly] = config.pos;

              return (
                <g key={`leader-${country.id}`}>
                  <circle cx={ax} cy={ay} r="1.4" className="map-leader-dot" />
                  <polyline 
                    points={`${ax},${ay} ${lx},${ly}`} 
                    className="map-leader-line"
                  />
                </g>
              );
            })}
          </g>

          {/* All 30 Country labels layer */}
          <g className="map-labels-layer" pointerEvents="none">
            {countryData.map((country) => {
              const config = countryLabelLayout[country.id];
              if (!config) return null;

              const isCallout = config.type === 'callout';
              const [x, y] = config.pos;
              const textAnchor = config.textAnchor || 'middle';
              const displayName = config.displayName || country.name;
              const displayPct = country.displayPercentage || `${country.percentage}%`;
              const isShort = displayName.length <= 7;
              const fontSize = isShort ? '8.5px' : '7.5px';

              return (
                <text 
                  key={`label-${country.id}`} 
                  x={x} 
                  y={y} 
                  textAnchor={textAnchor}
                  className={`map-label${isCallout ? ' map-label-callout' : ''}`}
                  style={{ fontSize }}
                >
                  <tspan x={x} dy="-2">{displayName}</tspan>
                  <tspan x={x} dy="9.5" className="map-label-sub">{displayPct}</tspan>
                </text>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Existing Legend */}
      <div className="map-legend-bar">
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.red }} />0 – 10% (Untapped)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.low }} />10 – 30% (Low)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.orange }} />30 – 60% (Moderate)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.blue }} />60 – 80% (Substantial)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.navy }} />80 – 100% (Fully Electrified)</div>
      </div>
    </div>
  );
};

export default WorldMap;
