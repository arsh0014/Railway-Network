import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { countryData } from '../data/dashboardData';

const countryMeta = {
  '012': ['DZA', 'Algeria', 0, [-2, 28]], '032': ['ARG', 'Argentina', 0, [-64, -39]],
  '036': ['AUS', 'Australia', 10, [134, -25]], '076': ['BRA', 'Brazil', 30, [-52, -10]],
  '124': ['CAN', 'Canada', 0.2, [-106, 57]], '156': ['CHN', 'China', 75, [105, 35]],
  '180': ['COD', 'DR Congo', 0, [23, -2]], '231': ['ETH', 'Ethiopia', 0, [40, 9]],
  '250': ['FRA', 'France', 53, [2, 46]], '276': ['DEU', 'Germany', 61, [10, 51]],
  '304': ['GRL', 'Greenland', 0, [-42, 73]], '356': ['IND', 'India', 99, [79, 22]],
  '364': ['IRN', 'Iran', 0, [54, 32]], '380': ['ITA', 'Italy', 71, [12, 42]],
  '392': ['JPN', 'Japan', 62, [138, 37]], '398': ['KAZ', 'Kazakhstan', 0, [67, 48]],
  '434': ['LBY', 'Libya', 0, [17, 27]], '484': ['MEX', 'Mexico', 0, [-102, 23]],
  '496': ['MNG', 'Mongolia', 0, [103, 46]], '566': ['NGA', 'Nigeria', 0, [8, 9]],
  '586': ['PAK', 'Pakistan', 0, [69, 30]], '643': ['RUS', 'Russia', 51, [90, 61]],
  '682': ['SAU', 'Saudi Arabia', 0, [45, 23]], '729': ['SDN', 'Sudan', 0, [30, 15]],
  '724': ['ESP', 'Spain', 65, [-4, 40]], '792': ['TUR', 'Turkey', 100, [35, 39]],
  '826': ['GBR', 'United Kingdom', 38, [-3, 55]], '840': ['USA', 'USA', 1, [-102, 38]],
};

const palette = { red: '#A71920', low: '#D9532F', orange: '#F28C28', blue: '#2B78C5', navy: '#0B2A63' };
const getColor = (value) => value >= 80 ? palette.navy : value >= 60 ? palette.blue : value >= 30 ? palette.orange : value >= 10 ? palette.low : palette.red;

export const WorldMap = ({ onSelectCountry, onHoverCountry }) => {
  const [hoveredCountryId, setHoveredCountryId] = useState(null);
  const countries = useMemo(() => feature(worldAtlas, worldAtlas.objects.countries).features, []);
  const projection = useMemo(() => geoNaturalEarth1().fitExtent([[18, 18], [982, 492]], { type: 'FeatureCollection', features: countries }), [countries]);
  const path = useMemo(() => geoPath(projection), [projection]);

  const handleEnter = (meta, event) => {
    if (!meta) return;
    const [id, name, value] = meta;
    setHoveredCountryId(id);
    const fullCountry = countryData.find((country) => country.id === id) || { id, name, percentage: value };
    onHoverCountry?.({ ...fullCountry, id, name, percentage: value, x: event.clientX, y: event.clientY });
  };
  const handleLeave = () => { setHoveredCountryId(null); onHoverCountry?.(null); };
  const handleClick = (meta) => {
    if (!meta) return;
    const [id, name, value] = meta;
    onSelectCountry?.(countryData.find((country) => country.id === id) || { id, name, percentage: value });
  };

  return <div className="map-container-card">
    <svg className="world-map-svg" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid meet" role="img" aria-label="World railway network electrification map">
      <g className="map-country-layer">
        {countries.map((country) => {
          const meta = countryMeta[String(country.id).padStart(3, '0')];
          return <path key={country.id} d={path(country)} fill={meta ? getColor(meta[2]) : '#E7EDF3'} className={`map-country-path${meta?.[0] === hoveredCountryId ? ' active' : ''}`} onMouseEnter={(event) => handleEnter(meta, event)} onMouseLeave={handleLeave} onClick={() => handleClick(meta)} />;
        })}
      </g>
      {Object.values(countryMeta).map((meta) => {
        const point = projection(meta[3]);
        const size = meta[1].length > 8 ? '7px' : '9px';
        return <text key={meta[0]} x={point[0]} y={point[1]} className="map-label" style={{ fontSize: size }}><tspan x={point[0]} dy="-2">{meta[1]}</tspan><tspan x={point[0]} dy="10" className="map-label-sub">{meta[2]}%</tspan></text>;
      })}
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
