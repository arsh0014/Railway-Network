import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { countryData, getElectrificationColor } from '../data/dashboardData';
import CountrySearch from './CountrySearch';

// Map label layout configuration for all 45 countries (30 existing + 15 from Global Railway Directory)
const countryLabelLayout = {
  // ==================== NORTH & SOUTH AMERICA ====================
  USA: { type: 'direct', pos: [249, 122], displayName: 'USA' },
  CAN: { type: 'direct', pos: [280, 75], displayName: 'Canada' },
  MEX: { type: 'direct', pos: [244, 180], displayName: 'Mexico' },
  COL: { type: 'callout', anchor: [312, 240], pos: [264, 238], textAnchor: 'end', displayName: 'Colombia' },
  PER: { type: 'callout', anchor: [306, 280], pos: [264, 280], textAnchor: 'end', displayName: 'Peru' },
  BRA: { type: 'direct', pos: [365, 283], displayName: 'Brazil' },
  CHL: { type: 'callout', anchor: [330, 365], pos: [290, 365], textAnchor: 'end', displayName: 'Chile' },
  ARG: { type: 'direct', pos: [348, 356], displayName: 'Argentina' },

  // ==================== EUROPE ====================
  GBR: { type: 'callout', anchor: [494, 90], pos: [460, 72], textAnchor: 'end', displayName: 'United Kingdom' },
  FRA: { type: 'direct', pos: [492, 116], displayName: 'France' },
  ESP: { type: 'direct', pos: [491, 136], displayName: 'Spain' },
  NLD: { type: 'callout', anchor: [512, 95], pos: [496, 54], textAnchor: 'middle', displayName: 'Netherlands' },
  BEL: { type: 'callout', anchor: [509, 101], pos: [456, 96], textAnchor: 'end', displayName: 'Belgium' },
  DEU: { type: 'direct', pos: [523, 97], displayName: 'Germany' },
  CHE: { type: 'callout', anchor: [518, 112], pos: [466, 114], textAnchor: 'end', displayName: 'Switzerland' },
  CZE: { type: 'callout', anchor: [535, 103], pos: [568, 80], textAnchor: 'start', displayName: 'Czech Rep.' },
  AUT: { type: 'callout', anchor: [532, 109], pos: [562, 115], textAnchor: 'start', displayName: 'Austria' },
  ITA: { type: 'direct', pos: [530, 130], displayName: 'Italy' },
  POL: { type: 'direct', pos: [544, 92], displayName: 'Poland' },
  UKR: { type: 'direct', pos: [582, 101], displayName: 'Ukraine' },
  ROU: { type: 'callout', anchor: [558, 116], pos: [558, 134], textAnchor: 'middle', displayName: 'Romania' },
  SWE: { type: 'direct', pos: [534, 68], displayName: 'Sweden' },
  RUS: { type: 'direct', pos: [690, 68], displayName: 'Russia' },

  // ==================== AFRICA & MIDDLE EAST ====================
  MAR: { type: 'direct', pos: [478, 160], displayName: 'Morocco' },
  DZA: { type: 'direct', pos: [508, 168], displayName: 'Algeria' },
  EGY: { type: 'direct', pos: [574, 172], displayName: 'Egypt' },
  TUR: { type: 'direct', pos: [584, 134], displayName: 'Turkey' },
  SAU: { type: 'direct', pos: [612, 180], displayName: 'Saudi Arabia' },
  IRN: { type: 'direct', pos: [634, 154], displayName: 'Iran' },
  KEN: { type: 'direct', pos: [597, 250], displayName: 'Kenya' },
  ZAF: { type: 'direct', pos: [562, 338], displayName: 'South Africa' },

  // ==================== ASIA & PACIFIC ====================
  KAZ: { type: 'direct', pos: [653, 102], displayName: 'Kazakhstan' },
  UZB: { type: 'callout', anchor: [649, 126], pos: [618, 140], textAnchor: 'end', displayName: 'Uzbekistan' },
  PAK: { type: 'direct', pos: [668, 162], displayName: 'Pakistan' },
  IND: { type: 'direct', pos: [699, 183], displayName: 'India' },
  LKA: { type: 'callout', anchor: [707, 228], pos: [736, 236], textAnchor: 'start', displayName: 'Sri Lanka' },
  CHN: { type: 'direct', pos: [748, 142], displayName: 'China' },
  THA: { type: 'callout', anchor: [757, 207], pos: [728, 208], textAnchor: 'end', displayName: 'Thailand' },
  VNM: { type: 'callout', anchor: [770, 202], pos: [802, 204], textAnchor: 'start', displayName: 'Vietnam' },
  MYS: { type: 'callout', anchor: [780, 240], pos: [744, 256], textAnchor: 'end', displayName: 'Malaysia' },
  IDN: { type: 'direct', pos: [808, 266], displayName: 'Indonesia' },
  KOR: { type: 'callout', anchor: [808, 142], pos: [812, 168], textAnchor: 'middle', displayName: 'South Korea' },
  JPN: { type: 'callout', anchor: [830, 138], pos: [864, 134], textAnchor: 'start', displayName: 'Japan' },
  AUS: { type: 'direct', pos: [834, 328], displayName: 'Australia' },
  NZL: { type: 'direct', pos: [912, 376], displayName: 'New Zealand' }
};

const palette = {
  red: '#A71920',    // 0–10% Untapped
  low: '#D9532F',    // 10–30% Low
  orange: '#F28C28', // 30–60% Moderate
  blue: '#2B78C5',   // 60–80% Substantial
  navy: '#0B2A63',   // 80–100% Fully Electrified
  grey: '#8898AA'    // Electrification Data N/A
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

      {/* Existing Legend + 6th Electrification Data N/A item */}
      <div className="map-legend-bar">
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.red }} />0 – 10% (Untapped)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.low }} />10 – 30% (Low)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.orange }} />30 – 60% (Moderate)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.blue }} />60 – 80% (Substantial)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.navy }} />80 – 100% (Fully Electrified)</div>
        <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.grey }} />Electrification Data N/A</div>
      </div>
    </div>
  );
};

export default WorldMap;
