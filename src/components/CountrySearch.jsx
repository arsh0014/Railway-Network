import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Globe, ChevronRight } from 'lucide-react';
import { countryData, getElectrificationColor } from '../data/dashboardData';

export const CountrySearch = ({ onSelectCountry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countryData.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      (c.operator && c.operator.toLowerCase().includes(q))
    );
  });

  const handleSelect = (country) => {
    onSelectCountry(country);
    setIsOpen(false);
    setQuery('');
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <div className="corner-search-container" ref={containerRef}>
      {!isOpen ? (
        <button 
          type="button" 
          className="corner-search-btn" 
          onClick={handleOpen}
          aria-label="Search country electrification information"
        >
          <Search size={14} className="search-btn-icon" />
          <span>Search Country</span>
        </button>
      ) : (
        <div className="corner-search-active-box">
          <div className="search-input-row">
            <Search size={14} className="search-box-icon" />
            <input
              ref={inputRef}
              type="text"
              className="corner-search-input"
              placeholder="Search country..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsOpen(false);
                if (e.key === 'Enter' && filteredCountries.length > 0) {
                  handleSelect(filteredCountries[0]);
                }
              }}
            />
            <button 
              type="button" 
              className="search-close-btn" 
              onClick={() => { setIsOpen(false); setQuery(''); }}
              aria-label="Close search"
            >
              <X size={13} />
            </button>
          </div>

          <div className="search-results-dropdown">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const color = getElectrificationColor(c.percentage);
                return (
                  <button
                    key={c.id}
                    type="button"
                    className="search-result-item"
                    onClick={() => handleSelect(c)}
                  >
                    <div className="result-main-col">
                      <div className="result-country-row">
                        <span className="result-country-name">{c.name}</span>
                        <span 
                          className="result-pct-badge" 
                          style={{ backgroundColor: color }}
                        >
                          {c.displayPercentage || `${c.percentage}%`}
                        </span>
                      </div>
                      <div className="result-sub-info">
                        <span>{c.region}</span>
                        {c.operator && <span> • {c.operator}</span>}
                      </div>
                    </div>
                    <ChevronRight size={14} className="result-arrow" />
                  </button>
                );
              })
            ) : (
              <div className="search-no-results">
                No country found matching &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
