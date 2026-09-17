import React, { useState } from 'react';
import Header from './components/Header';
import FutureDemandCard from './components/FutureDemandCard';
import WorldMap from './components/WorldMap';
import UntappedMarkets from './components/UntappedMarkets';
import TopCountries from './components/TopCountries';
import ProductsCard from './components/ProductsCard';
import DirectorsCard from './components/DirectorsCard';
import SecuredVansMarket from './components/SecuredVansMarket';
import UpcomingProducts from './components/UpcomingProducts';
import CountryTooltip from './components/CountryTooltip';
import CountryDetailModal from './components/CountryDetailModal';
import CountrySearch from './components/CountrySearch';
import { countryData } from './data/dashboardData';

export function Dashboard() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [modalItem, setModalItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleCountrySelect = (countryBasic) => {
    // Find full country record in data store
    const fullCountry = countryData.find((c) => c.id === countryBasic.id) || countryBasic;
    setModalItem({ ...fullCountry, ...countryBasic });
    setModalType('country');
  };

  const handleProductSelect = (product) => {
    setModalItem(product);
    setModalType('product');
  };

  const handleDirectorSelect = (director) => {
    setModalItem(director);
    setModalType('director');
  };

  const handleUpcomingSelect = (item) => {
    setModalItem(item);
    setModalType('upcoming');
  };

  const closeModal = () => {
    setModalItem(null);
    setModalType(null);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="corner-brand-logo" aria-label="Railway logo">
        <img src="/images/vans-logo.jpeg" alt="VANS Electro logo" />
      </div>
      {/* Background Engineering Grids & Glow */}
      <div className="bg-tech-grid" />
      <div className="bg-circuit-lines" />

      {/* Main 16:9 Presentation Canvas */}
      <main className="dashboard-canvas">
        {/* Top Header Row with Future Demand Card on Left and Center Title */}
        <header className="dashboard-header-row">
          <FutureDemandCard />
          <Header />
        </header>

        {/* Main 2-Column Split: Dominant Map on Left (60%), 2x2 Cards Grid on Right (40%) */}
        <section className="dashboard-main-grid">
          {/* Left Column: World Map + Bottom Stats (Untapped Markets & Top Countries) */}
          <div className="left-section-col">
            <WorldMap 
              onSelectCountry={handleCountrySelect}
              onHoverCountry={setHoveredCountry}
            />

            <div className="bottom-metrics-row">
              <UntappedMarkets />
              <TopCountries />
            </div>
          </div>

          {/* Right Column: 2x2 Rounded Cards Grid */}
          <div className="right-section-grid">
            <ProductsCard onSelectProduct={handleProductSelect} />
            <DirectorsCard onSelectDirector={handleDirectorSelect} />
            <SecuredVansMarket />
            <UpcomingProducts onSelectUpcoming={handleUpcomingSelect} />
          </div>
        </section>
      </main>

      {/* Floating Hover Tooltip for Map */}
      <CountryTooltip countryData={hoveredCountry} />

      {/* Interactive Details Modal */}
      {modalItem && (
        <CountryDetailModal 
          item={modalItem} 
          type={modalType} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default Dashboard;
