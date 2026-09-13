import React, { useState } from 'react';
import { countryData } from '../data/dashboardData';

export const WorldMap = ({ onSelectCountry, selectedCountry, onHoverCountry }) => {
  const [hoveredCountryId, setHoveredCountryId] = useState(null);

  // Country color mapping matching reference image
  const getCountryColor = (id) => {
    switch (id) {
      case 'IND': return '#F28C28'; // Vibrant Orange in reference
      case 'CHN': return '#2B78C5'; // Blue
      case 'RUS': return '#4A8AC4'; // Medium Blue
      case 'TUR': return '#0B2A63'; // Deep Navy
      case 'DEU': return '#2B78C5';
      case 'ITA': return '#1B5B9E';
      case 'ESP': return '#3584D4';
      case 'FRA': return '#5A9AD9';
      case 'GBR': return '#E67E22';
      case 'JPN': return '#2B78C5';
      case 'KAZ': return '#4A8AC4';
      case 'BRA': return '#D97724'; // Orange/Tan in reference
      case 'AUS': return '#A71920'; // Crimson
      case 'USA': return '#A71920'; // Crimson
      case 'CAN': return '#8F141A'; // Crimson
      case 'MEX': return '#A71920';
      case 'ARG': return '#A71920';
      case 'GRL': return '#8F141A';
      case 'MNG': return '#A71920';
      default: return '#A71920'; // Default Crimson for untapped regions (Africa, etc.)
    }
  };

  const handleMouseEnter = (country, event) => {
    const fullCountry = countryData.find((c) => c.id === country.id) || country;
    setHoveredCountryId(country.id);
    if (onHoverCountry) {
      const rect = event.currentTarget.getBoundingClientRect();
      onHoverCountry({
        ...fullCountry,
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCountryId(null);
    if (onHoverCountry) {
      onHoverCountry(null);
    }
  };

  const handleClick = (country) => {
    const fullCountry = countryData.find((c) => c.id === country.id) || country;
    if (onSelectCountry) {
      onSelectCountry(fullCountry);
    }
  };

  return (
    <div className="map-container-card">
      <svg 
        className="world-map-svg" 
        viewBox="0 0 1000 520" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="country-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0B2A63" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ================= NORTH AMERICA ================= */}
        {/* Greenland */}
        <path 
          id="GRL" 
          d="M270 40 L340 35 L380 70 L360 110 L300 120 L270 80 Z" 
          fill={getCountryColor('GRL')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'GRL', name: 'Greenland', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'GRL', name: 'Greenland', percentage: 0 })}
        />
        <text x="325" y="75" className="map-label" style={{ fontSize: '8px' }}>Greenland</text>
        <text x="325" y="86" className="map-label map-label-sub" style={{ fontSize: '7.5px' }}>0%</text>

        {/* Canada */}
        <path 
          id="CAN" 
          d="M60 120 L150 70 L250 80 L290 125 L240 160 L200 170 L140 180 L80 165 Z" 
          fill={getCountryColor('CAN')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'CAN', name: 'Canada', percentage: 0.2, category: 'Untapped Market', investment: 'High Potential' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'CAN', name: 'Canada', percentage: 0.2 })}
        />
        {/* Alaska */}
        <path 
          d="M40 95 L80 90 L85 130 L45 130 Z" 
          fill={getCountryColor('USA')} 
          className="map-country-path" 
        />
        <text x="175" y="125" className="map-label" style={{ fontSize: '11px' }}>Canada</text>
        <text x="175" y="137" className="map-label map-label-sub">0.2%</text>

        {/* USA */}
        <path 
          id="USA" 
          d="M85 170 L200 170 L240 160 L240 215 L210 240 L160 240 L115 230 L85 200 Z" 
          fill={getCountryColor('USA')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'USA', name: 'USA', percentage: 1, category: 'Untapped Modernization Market', investment: 'Massive Potential' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'USA', name: 'USA', percentage: 1 })}
        />
        <text x="160" y="200" className="map-label" style={{ fontSize: '11px' }}>USA</text>
        <text x="160" y="212" className="map-label map-label-sub">1%</text>

        {/* Mexico */}
        <path 
          id="MEX" 
          d="M115 230 L165 240 L180 280 L150 295 L120 260 Z" 
          fill={getCountryColor('MEX')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'MEX', name: 'Mexico', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'MEX', name: 'Mexico', percentage: 0 })}
        />
        <text x="145" y="260" className="map-label" style={{ fontSize: '8px' }}>Mexico</text>
        <text x="145" y="269" className="map-label map-label-sub" style={{ fontSize: '7.5px' }}>0%</text>

        {/* Central America */}
        <path d="M150 295 L180 280 L205 305 L185 320 Z" fill="#A71920" className="map-country-path" />

        {/* ================= SOUTH AMERICA ================= */}
        {/* Brazil */}
        <path 
          id="BRA" 
          d="M205 320 L260 310 L295 345 L275 410 L230 400 L205 350 Z" 
          fill={getCountryColor('BRA')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'BRA', name: 'Brazil', percentage: 30, category: 'Developing Electrification' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'BRA', name: 'Brazil', percentage: 30 })}
        />
        <text x="250" y="358" className="map-label" style={{ fontSize: '10px' }}>Brazil</text>
        <text x="250" y="369" className="map-label map-label-sub">30%</text>

        {/* Northern South America (Venezuela/Colombia/Peru) */}
        <path 
          d="M185 320 L215 315 L220 345 L180 340 Z" 
          fill="#A71920" 
          className="map-country-path" 
        />
        <text x="195" y="335" className="map-label" style={{ fontSize: '6.5px' }}>0%</text>

        {/* Bolivia / Peru / Paraguay */}
        <path 
          d="M180 340 L210 350 L225 400 L190 410 Z" 
          fill="#A71920" 
          className="map-country-path" 
        />
        <text x="205" y="375" className="map-label" style={{ fontSize: '7px' }}>Bolivia</text>
        <text x="205" y="383" className="map-label map-label-sub" style={{ fontSize: '6.5px' }}>0%</text>

        {/* Argentina & Chile */}
        <path 
          id="ARG" 
          d="M190 410 L230 400 L235 470 L205 490 L195 460 Z" 
          fill={getCountryColor('ARG')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'ARG', name: 'Argentina', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'ARG', name: 'Argentina', percentage: 0 })}
        />
        <text x="210" y="445" className="map-label" style={{ fontSize: '7.5px' }}>Argentina</text>
        <text x="210" y="454" className="map-label map-label-sub" style={{ fontSize: '7px' }}>0%</text>

        {/* ================= EUROPE ================= */}
        {/* UK */}
        <path 
          id="GBR" 
          d="M420 135 L435 130 L438 150 L425 155 Z" 
          fill={getCountryColor('GBR')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'GBR', name: 'United Kingdom', percentage: 38, category: 'Growing Electrification' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'GBR', name: 'United Kingdom', percentage: 38 })}
        />
        <text x="428" y="145" className="map-label" style={{ fontSize: '6.5px' }}>38%</text>

        {/* France */}
        <path 
          id="FRA" 
          d="M430 155 L450 155 L452 178 L432 178 Z" 
          fill={getCountryColor('FRA')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'FRA', name: 'France', percentage: 53, category: 'Substantially Electrified' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'FRA', name: 'France', percentage: 53 })}
        />
        <text x="441" y="168" className="map-label" style={{ fontSize: '6.5px' }}>53%</text>

        {/* Spain */}
        <path 
          id="ESP" 
          d="M415 180 L442 180 L435 208 L412 205 Z" 
          fill={getCountryColor('ESP')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'ESP', name: 'Spain', percentage: 65, category: 'Highly Electrified' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'ESP', name: 'Spain', percentage: 65 })}
        />
        <text x="427" y="196" className="map-label" style={{ fontSize: '6.5px' }}>65%</text>

        {/* Germany */}
        <path 
          id="DEU" 
          d="M452 145 L472 145 L470 168 L450 168 Z" 
          fill={getCountryColor('DEU')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'DEU', name: 'Germany', percentage: 61, category: 'Highly Electrified' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'DEU', name: 'Germany', percentage: 61 })}
        />
        <text x="461" y="158" className="map-label" style={{ fontSize: '6.5px' }}>61%</text>

        {/* Italy */}
        <path 
          id="ITA" 
          d="M458 170 L472 170 L480 200 L468 200 Z" 
          fill={getCountryColor('ITA')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'ITA', name: 'Italy', percentage: 71, category: 'Highly Electrified' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'ITA', name: 'Italy', percentage: 71 })}
        />
        <text x="468" y="186" className="map-label" style={{ fontSize: '6.5px' }}>71%</text>

        {/* Scandinavia / Poland / Eastern Europe */}
        <path d="M450 100 L490 90 L485 140 L455 140 Z" fill="#E67E22" className="map-country-path" />
        <path d="M472 145 L510 145 L505 175 L470 175 Z" fill="#E67E22" className="map-country-path" />

        {/* Turkey */}
        <path 
          id="TUR" 
          d="M495 185 L545 185 L540 205 L490 205 Z" 
          fill={getCountryColor('TUR')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'TUR', name: 'Turkey', percentage: 100, category: 'Fully Electrified Strategic Corridors' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'TUR', name: 'Turkey', percentage: 100 })}
        />
        <text x="518" y="196" className="map-label" style={{ fontSize: '7px' }}>Turkey 100%</text>

        {/* ================= RUSSIA & NORTH ASIA ================= */}
        {/* Russia */}
        <path 
          id="RUS" 
          d="M490 90 L600 65 L760 60 L830 110 L760 140 L650 145 L550 140 L495 140 Z" 
          fill={getCountryColor('RUS')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'RUS', name: 'Russia', percentage: 51, category: 'Moderately Electrified', investment: 'Upgrade & Modernization' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'RUS', name: 'Russia', percentage: 51 })}
        />
        <text x="660" y="105" className="map-label" style={{ fontSize: '12px' }}>Russia</text>
        <text x="660" y="119" className="map-label map-label-sub">51%</text>

        {/* Kazakhstan */}
        <path 
          id="KAZ" 
          d="M550 140 L640 142 L635 180 L550 180 Z" 
          fill={getCountryColor('KAZ')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'KAZ', name: 'Kazakhstan', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'KAZ', name: 'Kazakhstan', percentage: 0 })}
        />
        <text x="590" y="158" className="map-label" style={{ fontSize: '7.5px' }}>Kazakhstan</text>
        <text x="590" y="167" className="map-label map-label-sub" style={{ fontSize: '7px' }}>0%</text>

        {/* Mongolia */}
        <path 
          id="MNG" 
          d="M640 145 L710 145 L705 175 L640 175 Z" 
          fill={getCountryColor('MNG')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'MNG', name: 'Mongolia', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'MNG', name: 'Mongolia', percentage: 0 })}
        />
        <text x="675" y="158" className="map-label" style={{ fontSize: '7.5px' }}>Mongolia</text>
        <text x="675" y="167" className="map-label map-label-sub" style={{ fontSize: '7px' }}>0%</text>

        {/* ================= CHINA & EAST ASIA ================= */}
        {/* China */}
        <path 
          id="CHN" 
          d="M635 178 L710 175 L765 210 L740 270 L685 270 L650 250 L630 220 Z" 
          fill={getCountryColor('CHN')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'CHN', name: 'China', percentage: 75, category: 'High Electrification Network', investment: 'High Speed Expansion' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'CHN', name: 'China', percentage: 75 })}
        />
        <text x="700" y="222" className="map-label" style={{ fontSize: '12px' }}>China</text>
        <text x="700" y="235" className="map-label map-label-sub">75%</text>

        {/* Japan */}
        <path 
          id="JPN" 
          d="M780 185 L795 180 L790 220 L775 225 Z" 
          fill={getCountryColor('JPN')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'JPN', name: 'Japan', percentage: 62, category: 'High Density Rail' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'JPN', name: 'Japan', percentage: 62 })}
        />

        {/* ================= INDIA & SOUTH ASIA ================= */}
        {/* India */}
        <path 
          id="IND" 
          d="M605 220 L650 220 L660 260 L640 310 L620 310 L600 250 Z" 
          fill={getCountryColor('IND')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'IND', name: 'India', percentage: 99, category: 'Highly Electrified Benchmark', investment: 'Capacity & Modernization' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'IND', name: 'India', percentage: 99 })}
        />
        <text x="630" y="260" className="map-label" style={{ fontSize: '11.5px', fill: '#ffffff' }}>India</text>
        <text x="630" y="273" className="map-label map-label-sub" style={{ fontSize: '11px', fill: '#ffffff' }}>99%</text>

        {/* Pakistan / Afghanistan */}
        <path 
          d="M570 200 L605 210 L600 245 L565 240 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'PAK', name: 'Pakistan', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'PAK', name: 'Pakistan', percentage: 0 })}
        />
        <text x="585" y="224" className="map-label" style={{ fontSize: '6.5px' }}>Pak 0%</text>

        {/* Southeast Asia */}
        <path d="M685 270 L720 270 L730 310 L700 330 L675 300 Z" fill="#A71920" className="map-country-path" />

        {/* ================= MIDDLE EAST ================= */}
        {/* Saudi Arabia & Middle East */}
        <path 
          id="SAU" 
          d="M525 215 L565 215 L565 265 L525 260 Z" 
          fill={getCountryColor('SAU')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'SAU', name: 'Saudi Arabia', percentage: 0, category: 'Untapped / Emerging' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'SAU', name: 'Saudi Arabia', percentage: 0 })}
        />
        <text x="545" y="238" className="map-label" style={{ fontSize: '7.5px' }}>Saudi</text>
        <text x="545" y="247" className="map-label map-label-sub" style={{ fontSize: '7px' }}>0%</text>

        {/* Iran / Iraq */}
        <path 
          d="M540 185 L580 185 L575 215 L535 215 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'IRN', name: 'Iran', percentage: 0, category: 'Modernization Target' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'IRN', name: 'Iran', percentage: 0 })}
        />
        <text x="555" y="200" className="map-label" style={{ fontSize: '6.5px' }}>Iran 0%</text>

        {/* ================= AFRICA ================= */}
        {/* North Africa: Algeria / Libya / Egypt */}
        <path 
          d="M390 220 L445 220 L440 275 L385 275 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'DZA', name: 'Algeria', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'DZA', name: 'Algeria', percentage: 0 })}
        />
        <text x="415" y="245" className="map-label" style={{ fontSize: '7.5px' }}>Algeria</text>
        <text x="415" y="254" className="map-label map-label-sub" style={{ fontSize: '7px' }}>0%</text>

        <path 
          d="M445 220 L485 220 L485 275 L440 275 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'LBY', name: 'Libya', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'LBY', name: 'Libya', percentage: 0 })}
        />
        <text x="465" y="245" className="map-label" style={{ fontSize: '7.5px' }}>Libya</text>
        <text x="465" y="254" className="map-label map-label-sub" style={{ fontSize: '7px' }}>0%</text>

        <path 
          d="M485 220 L525 220 L525 275 L485 275 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'EGY', name: 'Egypt', percentage: 0, category: 'High Growth Potential' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'EGY', name: 'Egypt', percentage: 0 })}
        />
        <text x="505" y="245" className="map-label" style={{ fontSize: '7.5px' }}>Egypt</text>
        <text x="505" y="254" className="map-label map-label-sub" style={{ fontSize: '7px' }}>0%</text>

        {/* Central & West Africa: Mali, Niger, Chad, Sudan, Nigeria */}
        <path d="M365 275 L415 275 L410 320 L370 320 Z" fill="#A71920" className="map-country-path" />
        <text x="390" y="295" className="map-label" style={{ fontSize: '6.5px' }}>Mali 0%</text>

        <path d="M415 275 L450 275 L445 320 L410 320 Z" fill="#A71920" className="map-country-path" />
        <text x="430" y="295" className="map-label" style={{ fontSize: '6.5px' }}>Niger 0%</text>

        <path d="M450 275 L485 275 L480 320 L445 320 Z" fill="#A71920" className="map-country-path" />
        <text x="465" y="298" className="map-label" style={{ fontSize: '6.5px' }}>Chad 0%</text>

        <path 
          d="M485 275 L525 275 L515 320 L480 320 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'SDN', name: 'Sudan', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'SDN', name: 'Sudan', percentage: 0 })}
        />
        <text x="500" y="295" className="map-label" style={{ fontSize: '7px' }}>Sudan</text>
        <text x="500" y="303" className="map-label map-label-sub" style={{ fontSize: '6.5px' }}>0%</text>

        <path 
          d="M400 320 L445 320 L440 345 L395 345 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'NGA', name: 'Nigeria', percentage: 0, category: 'High Growth Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'NGA', name: 'Nigeria', percentage: 0 })}
        />
        <text x="420" y="335" className="map-label" style={{ fontSize: '6.5px' }}>Nigeria 0%</text>

        {/* East Africa: Ethiopia, Kenya, Tanzania */}
        <path 
          d="M515 295 L555 305 L540 345 L505 335 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'ETH', name: 'Ethiopia', percentage: 0, category: 'Emerging Network' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'ETH', name: 'Ethiopia', percentage: 0 })}
        />
        <text x="530" y="325" className="map-label" style={{ fontSize: '6.5px' }}>Ethiopia</text>
        <text x="530" y="333" className="map-label map-label-sub" style={{ fontSize: '6px' }}>0%</text>

        {/* Central & Southern Africa: DR Congo, Angola, Zambia, South Africa */}
        <path 
          d="M440 340 L505 335 L500 400 L440 395 Z" 
          fill="#A71920" 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'COD', name: 'DR Congo', percentage: 0, category: 'Untapped Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'COD', name: 'DR Congo', percentage: 0 })}
        />
        <text x="470" y="365" className="map-label" style={{ fontSize: '7px' }}>DRCongo</text>
        <text x="470" y="374" className="map-label map-label-sub" style={{ fontSize: '6.5px' }}>0%</text>

        <path d="M435 395 L490 395 L480 440 L435 440 Z" fill="#A71920" className="map-country-path" />
        <text x="460" y="415" className="map-label" style={{ fontSize: '6.5px' }}>Angola 0%</text>

        <path d="M440 440 L495 440 L485 485 L445 485 Z" fill="#A71920" className="map-country-path" />
        <text x="468" y="462" className="map-label" style={{ fontSize: '6.5px' }}>Namibia 0%</text>

        {/* ================= OCEANIA ================= */}
        {/* Australia */}
        <path 
          id="AUS" 
          d="M740 370 L830 365 L860 415 L825 460 L755 450 L730 400 Z" 
          fill={getCountryColor('AUS')} 
          className="map-country-path"
          onMouseEnter={(e) => handleMouseEnter({ id: 'AUS', name: 'Australia', percentage: 10, category: 'Emerging Corridor Market' }, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick({ id: 'AUS', name: 'Australia', percentage: 10 })}
        />
        <text x="795" y="410" className="map-label" style={{ fontSize: '10px' }}>Australia</text>
        <text x="795" y="421" className="map-label map-label-sub">10%</text>
      </svg>

      {/* Map Scale Legend Bar */}
      <div className="map-legend-bar">
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#A71920' }}></span>
          <span>0 – 10% (Untapped)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#D9532F' }}></span>
          <span>10 – 30% (Low)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#F28C28' }}></span>
          <span>30 – 60% (Moderate)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#2B78C5' }}></span>
          <span>60 – 80% (Substantial)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#0B2A63' }}></span>
          <span>80 – 100% (Fully Electrified)</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
