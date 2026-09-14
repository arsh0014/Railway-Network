import React, { useState } from 'react';
import { X, Train, Zap, ShieldCheck, TrendingUp, Award, Layers, CheckCircle2, Globe, Building2, Mail, MapPin, Sparkles, FileText, Cpu, Clock, ExternalLink } from 'lucide-react';
import { getElectrificationColor, getElectrificationCategory } from '../data/dashboardData';

export const CountryDetailModal = ({ item, type, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!item) return null;

  if (type === 'product') {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="product-inspector-modal" onClick={(e) => e.stopPropagation()}>
          <section className="product-video-pane">
            <div className="product-video-heading">
              <h2>{item.name}</h2>
              <span>{item.category}</span>
            </div>
            <div className="product-video-frame">
              {item.videoUrl ? (
                <video controls autoPlay muted poster={item.image}>
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="product-video-placeholder">
                  <img src={item.image} alt={`${item.name} preview`} />
                  <div className="video-placeholder-overlay">
                    <span className="video-play-icon">▶</span>
                    <strong>Product video</strong>
                    <small>Add an MP4 video using the product&apos;s <code>videoUrl</code>.</small>
                  </div>
                </div>
              )}
            </div>
          </section>

          <aside className="product-info-pane">
            <div className="inspector-eyebrow">PRODUCT INSPECTOR</div>
            <h2>Details</h2>
            <button className="product-inspector-close light-close" onClick={onClose} aria-label="Close product details">
              <X size={19} />
            </button>

            <div className="inspector-detail-list">
              <div><span>PRODUCT</span><strong>{item.name}</strong></div>
              <div><span>CATEGORY</span><strong>{item.category}</strong></div>
              <div><span>SPECIFICATIONS</span><strong>{item.specsSummary || 'Railway electrification equipment'}</strong></div>
              <div><span>DESCRIPTION</span><p>{item.description}</p></div>
            </div>

            {item.documentSpec && (
              <div className="document-spec-panel">
                <div className="document-spec-title">DOCUMENT PRODUCT SPECIFICATION</div>
                <div className="document-spec-product">{item.documentSpec.product}</div>
                <div className="document-spec-row"><span>PRODUCT SCOPE</span><p>{item.documentSpec.description}</p></div>
                <div className="document-spec-row"><span>MARKET SCOPE</span><p>{item.documentSpec.marketScope}</p></div>
                <div className="document-spec-row"><span>DEMAND DRIVERS</span><p>{item.documentSpec.demandDrivers}</p></div>
                <div className="document-spec-row"><span>INVESTMENT IMPACT</span><p>{item.documentSpec.investmentImpact}</p></div>
                <div className="document-spec-row"><span>3-5 YEAR GROWTH POTENTIAL</span><p>{item.documentSpec.growthPotential}</p></div>
              </div>
            )}

            <div className="product-info-actions">
              <button className="inspector-primary-action" onClick={onClose}>Close</button>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* ========================================================
            DIRECTOR DETAIL MODAL
        ======================================================== */}
        {type === 'director' && (
          <div>
            {/* Header with Portrait & Credentials */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '16px', border: '3px solid #E2ECF5', boxShadow: '0 6px 16px rgba(11, 42, 99, 0.12)' }} 
                />
                <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', background: '#0B2A63', color: '#ffffff', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={14} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#F28C28', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Executive Board of Directors
                  </span>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '26px', fontWeight: '800', color: '#0B2A63', lineHeight: '1.2' }}>
                  {item.name}
                </h2>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#173F7A', marginTop: '2px' }}>
                  {item.title}
                </div>
              </div>
            </div>

            {/* 4 Metric Badges Grid */}
            {item.stats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {item.stats.map((s, idx) => (
                  <div key={idx} style={{ background: '#F4F8FC', border: '1px solid #DDE7F0', borderRadius: '12px', padding: '10px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#6C7D93', textTransform: 'uppercase' }}>{s.label}</div>
                    <div style={{ fontSize: '15px', fontWeight: '800', color: '#0B2A63', marginTop: '2px' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Source document profile */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2ECF5', borderRadius: '14px', padding: '14px 16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#0B2A63', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#F28C28" /> {item.focus}
              </div>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', fontWeight: '500' }}>
                {item.profileSummary}
              </p>
            </div>

            {/* Key Achievements & Track Record */}
            {item.achievements && (
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#0B2A63', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.4px' }}>
                  Key Executive Achievements & Milestones
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {item.achievements.map((ach, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#ffffff', border: '1px solid #EBF1F7', borderRadius: '10px', padding: '10px 12px' }}>
                      <CheckCircle2 size={16} color="#0B2A63" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '12.5px', color: '#334155', lineHeight: '1.45' }}>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================
            COUNTRY DETAIL MODAL
        ======================================================== */}
        {type === 'country' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div style={{ 
                width: '46px', 
                height: '46px', 
                borderRadius: '12px', 
                background: '#EAF3FA', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#0B2A63'
              }}>
                <Globe size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '26px', fontWeight: '800', color: '#0B2A63' }}>
                    {item.name}
                  </h2>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: '800', 
                    color: '#ffffff', 
                    background: getElectrificationColor(item.percentage),
                    padding: '3px 10px', 
                    borderRadius: '20px' 
                  }}>
                    {item.displayPercentage || `${item.percentage}%`} Electrified
                  </span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#F28C28', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{item.category || getElectrificationCategory(item.percentage)}</span>
                  {item.region && <span style={{ color: '#6C7D93', fontSize: '12px' }}>• {item.region}</span>}
                </div>
              </div>
            </div>

            {/* 4 Core Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '18px' }}>
              <div style={{ background: '#F4F8FC', padding: '12px 10px', borderRadius: '12px', border: '1px solid #DDE7F0', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#6C7D93' }}>TOTAL NETWORK</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#0B2A63', marginTop: '3px' }}>{item.routeKm || 'N/A'}</div>
              </div>
              <div style={{ background: '#F4F8FC', padding: '12px 10px', borderRadius: '12px', border: '1px solid #DDE7F0', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#6C7D93' }}>ELECTRIFIED</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#0B2A63', marginTop: '3px' }}>{item.electrifiedKm || '0 km'}</div>
              </div>
              <div style={{ background: '#F4F8FC', padding: '12px 10px', borderRadius: '12px', border: '1px solid #DDE7F0', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#6C7D93' }}>NON-ELECTRIFIED</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#A71920', marginTop: '3px' }}>{item.dieselKm || '0 km'}</div>
              </div>
              <div style={{ background: '#F4F8FC', padding: '12px 10px', borderRadius: '12px', border: '1px solid #DDE7F0', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#6C7D93' }}>ELECTRIFICATION RATE</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: getElectrificationColor(item.percentage), marginTop: '3px' }}>
                  {item.displayPercentage || `${item.percentage}%`}
                </div>
              </div>
            </div>

            {/* Grid & Operational Standards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2ECF5', borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748B', letterSpacing: '0.5px' }}>PRIMARY OPERATOR</div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#0B2A63', marginTop: '4px' }}>
                  {item.operator || 'National Railway Ministry'} {item.operatorHQ && <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748B' }}>• HQ: {item.operatorHQ}</span>}
                </div>
                {item.officialWebsite && (
                  <div style={{ fontSize: '12px', color: '#2B78C5', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                    <Globe size={13} />
                    <a 
                      href={`https://${item.officialWebsite}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#2B78C5', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      {item.officialWebsite}
                    </a>
                  </div>
                )}
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2ECF5', borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748B', letterSpacing: '0.5px' }}>VOLTAGE & POWER SYSTEM</div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#0B2A63', marginTop: '4px' }}>
                  {item.powerStandard || '25 kV 50 Hz AC'}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '6px' }}>
                  Category: <strong style={{ color: getElectrificationColor(item.percentage) }}>{item.category || getElectrificationCategory(item.percentage)}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            UPCOMING PRODUCT DETAIL MODAL
        ======================================================== */}
        {type === 'upcoming' && (
          <div>
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '18px' }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '110px', height: '110px', objectFit: 'cover', borderRadius: '14px', border: '2px solid #DDE7F0', boxShadow: '0 4px 14px rgba(11, 42, 99, 0.1)' }} 
              />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#A71920', background: '#FDE8E9', padding: '3px 10px', borderRadius: '12px' }}>
                  {item.badge}
                </span>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: '800', color: '#0B2A63', marginTop: '6px' }}>
                  {item.name}
                </h2>
                <p style={{ fontSize: '13px', color: '#173F7A', fontWeight: '700', marginTop: '2px' }}>{item.tagline}</p>
                <div style={{ fontSize: '11.5px', color: '#6C7D93', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {item.timeline}
                </div>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2ECF5', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px' }}>
              <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#0B2A63', textTransform: 'uppercase', marginBottom: '4px' }}>
                Technical Architecture Preview
              </div>
              <p style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>{item.specs}</p>
            </div>

            {/* Target Segments */}
            {item.targetMarket && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#0B2A63', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Target Market & Key Applications
                </div>
                <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: '1.45' }}>{item.targetMarket}</p>
              </div>
            )}

            {/* Key Advantages */}
            {item.keyAdvantages && (
              <div>
                <h4 style={{ fontSize: '11.5px', fontWeight: '800', color: '#0B2A63', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Key Technological Breakthroughs
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {item.keyAdvantages.map((adv, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#334155' }}>
                      <CheckCircle2 size={15} color="#0B2A63" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetailModal;
