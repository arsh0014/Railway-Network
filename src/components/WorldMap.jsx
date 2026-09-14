import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { countryData } from '../data/dashboardData';

const countryMeta = {
  // Percentages and route lengths below are taken from global_railway_electrification.pdf.
  '032': ['ARG', 'Argentina', 0.6, [-64, -39], '220 km / 36,966 km'],
  '036': ['AUS', 'Australia', 9.1, [134, -25], '3,300 km / 36,064 km'],
  '040': ['AUT', 'Austria', 72, [14, 47], '4,030 km / 5,600 km'],
  '056': ['BEL', 'Belgium', 85, [4.7, 50.8], '3,060 km / 3,600 km'],
  '076': ['BRA', 'Brazil', 4.7, [-52, -10], '1,400 km / 29,850 km'],
  '124': ['CAN', 'Canada', 0.2, [-106, 57], '<150 km / 49,422 km', '<0.3%'],
  '152': ['CHL', 'Chile', 22.7, [-71, -33], '1,650 km / 7,281 km'],
  '156': ['CHN', 'China', 69.2, [105, 35], '110,000 km / 159,000 km'],
  '250': ['FRA', 'France', 57.1, [2, 46], '15,680 km / 27,483 km'],
  '276': ['DEU', 'Germany', 62, [10, 51], '20,700 km / 33,401 km'],
  '356': ['IND', 'India', 95, [79, 22], '65,000+ km / 68,584 km'],
  '380': ['ITA', 'Italy', 72.1, [12, 42], '12,100 km / 16,782 km'],
  '392': ['JPN', 'Japan', 68, [138, 37], '18,550 km / 27,268 km'],
  '398': ['KAZ', 'Kazakhstan', 25.3, [67, 48], '4,200 km / 16,614 km'],
  '410': ['KOR', 'South Korea', 78, [127.8, 36], '3,250 km / 4,168 km'],
  '458': ['MYS', 'Malaysia', 41, [102, 4], '760 km / 1,851 km'],
  '504': ['MAR', 'Morocco', 61.6, [-6, 31], '1,300 km / 2,110 km'],
  '528': ['NLD', 'Netherlands', 73.9, [5.5, 52.2], '2,380 km / 3,222 km'],
  '616': ['POL', 'Poland', 62.3, [19, 52], '11,990 km / 19,235 km'],
  '643': ['RUS', 'Russia', 51.8, [90, 61], '44,300 km / 85,600 km'],
  '710': ['ZAF', 'South Africa', 35.3, [24, -29], '7,400 km / 20,986 km'],
  '724': ['ESP', 'Spain', 68.7, [-4, 40], '11,120 km / 16,180 km'],
  '752': ['SWE', 'Sweden', 75.1, [16, 62], '8,190 km / 10,900 km'],
  '756': ['CHE', 'Switzerland', 100, [8, 47], '5,317 km / 5,317 km'],
  '792': ['TUR', 'Turkey', 54.1, [35, 39], '7,100 km / 13,128 km'],
  '826': ['GBR', 'United Kingdom', 38, [-3, 55], '6,050 km / 15,935 km'],
  '840': ['USA', 'USA', 0.8, [-102, 38], '2,025 km / 250,000 km', '<1.0%'],
  '012': ['DZA', 'Algeria', 11.4, [-2, 28], '480 km / 4,200 km'],
  '682': ['SAU', 'Saudi Arabia', 8.1, [45, 23], '450 km / 5,590 km'],
};

const palette = { red: '#A71920', low: '#D9532F', orange: '#F28C28', blue: '#2B78C5', navy: '#0B2A63' };
const getColor = (value) => value >= 80 ? palette.navy : value >= 60 ? palette.blue : value >= 30 ? palette.orange : value >= 10 ? palette.low : palette.red;
// Keep the default map readable; every country remains interactive for details.
const visibleLabelIds = new Set(['USA', 'CAN', 'BRA', 'CHL', 'ARG', 'RUS', 'CHN', 'IND', 'JPN', 'AUS', 'KAZ', 'TUR', 'ESP', 'SWE', 'ZAF', 'MAR', 'SAU', 'MYS', 'KOR']);

export const WorldMap = ({ onSelectCountry, onHoverCountry }) => {
  const [hoveredCountryId, setHoveredCountryId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const countries = useMemo(() => feature(worldAtlas, worldAtlas.objects.countries).features, []);
  const projection = useMemo(() => geoNaturalEarth1().fitExtent([[18, 18], [982, 492]], { type: 'FeatureCollection', features: countries }), [countries]);
  const path = useMemo(() => geoPath(projection), [projection]);

  const handleEnter = (meta, event) => {
    if (!meta) return;
    const [id, name, value] = meta;
    setHoveredCountryId(id);
    const fullCountry = countryData.find((country) => country.id === id) || { id, name };
    onHoverCountry?.({ ...fullCountry, id, name, percentage: value, routeSummary: meta[4], displayPercentage: meta[5] || `${value}%`, x: event.clientX, y: event.clientY });
  };
  const handleLeave = () => { setHoveredCountryId(null); onHoverCountry?.(null); };
  const handleClick = (meta) => {
    if (!meta) return;
    const [id, name, value] = meta;
    onSelectCountry?.({ ...(countryData.find((country) => country.id === id) || {}), id, name, percentage: value, displayPercentage: meta[5] || `${value}%`, routeSummary: meta[4] });
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

  return <div className="map-container-card">
    <div className="map-zoom-controls" aria-label="Map zoom controls">
      <button type="button" onClick={() => changeZoom(0.2)} aria-label="Zoom in">+</button>
      <span>{Math.round(zoom * 100)}%</span>
      <button type="button" onClick={() => changeZoom(-0.2)} aria-label="Zoom out">−</button>
      <button type="button" onClick={resetView} aria-label="Reset map view">Reset</button>
    </div>
    <svg className={`world-map-svg${zoom > 1 ? ' is-zoomed' : ''}`} viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid meet" role="img" aria-label="World railway network electrification map" onWheel={handleWheel} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDragging} onPointerCancel={stopDragging}>
      <g transform={`translate(${500 + pan.x} ${260 + pan.y}) scale(${zoom}) translate(-500 -260)`}>
      <g className="map-country-layer">
        {countries.map((country) => {
          const meta = countryMeta[String(country.id).padStart(3, '0')];
          return <path key={country.id} d={path(country)} fill={meta ? getColor(meta[2]) : '#E7EDF3'} className={`map-country-path${meta?.[0] === hoveredCountryId ? ' active' : ''}`} onMouseEnter={(event) => handleEnter(meta, event)} onMouseLeave={handleLeave} onClick={() => handleClick(meta)} />;
        })}
      </g>
      {Object.values(countryMeta).map((meta) => {
        if (!visibleLabelIds.has(meta[0])) return null;
        const point = projection(meta[3]);
        const size = meta[1].length > 8 ? '7px' : '9px';
        return <text key={meta[0]} x={point[0]} y={point[1]} className="map-label" style={{ fontSize: size }}><tspan x={point[0]} dy="-2">{meta[1]}</tspan><tspan x={point[0]} dy="10" className="map-label-sub">{meta[5] || `${meta[2]}%`}</tspan></text>;
      })}
      </g>
    </svg>
    <div className="map-legend-bar">
      <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.red }} />0 – 10% (Untapped)</div>
      <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.low }} />10 – 30% (Low)</div>
      <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.orange }} />30 – 60% (Moderate)</div>
      <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.blue }} />60 – 80% (Substantial)</div>
      <div className="legend-item"><span className="legend-color-dot" style={{ backgroundColor: palette.navy }} />80 – 100% (Fully Electrified)</div>
    </div>
  </div>;
};

export default WorldMap;
