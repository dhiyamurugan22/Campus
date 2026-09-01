'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, Search, ZoomIn, ZoomOut, Maximize, ArrowLeft } from 'lucide-react';

const MOCK_LOCATIONS = [
  { id: 1, name: 'Main Block', category: 'Administration', x: 50, y: 30, color: '#F0CA63' },
  { id: 2, name: 'CSE Department', category: 'Academic', x: 20, y: 45, color: '#92C4DC' },
  { id: 3, name: 'Library', category: 'Academic', x: 70, y: 60, color: '#92C4DC' },
  { id: 4, name: 'Canteen', category: 'Food', x: 40, y: 80, color: '#ED765F' },
  { id: 5, name: 'Sports Ground', category: 'Sports', x: 80, y: 20, color: '#CDE8D4' },
];

export default function MapPage() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setDragStart({ x: clientX - pan.x, y: clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setPan({ x: clientX - dragStart.x, y: clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'reset') {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(prev => Math.min(Math.max(0.5, prev + (direction === 'in' ? 0.2 : -0.2)), 3));
    }
  };

  const filteredLocations = MOCK_LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    loc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '1.5rem', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <Link href="/" className="btn-secondary" style={{ padding: '0.6rem' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Campus Map
          </h1>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Find your way around the college</p>
        </div>
      </header>

      <div style={{ position: 'relative', marginBottom: '1.5rem', flexShrink: 0 }}>
        <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for departments, labs, canteen..." 
          style={{ width: '100%', padding: '0.85rem 1.25rem 0.85rem 3.5rem', fontSize: '0.95rem', borderRadius: '8px' }}
        />
      </div>

      <div className="card" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden', background: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Map Controls */}
        <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 10 }}>
          <button onClick={() => handleZoom('in')} className="btn-secondary" style={{ padding: '0.6rem', boxShadow: 'var(--shadow-sm)' }}><ZoomIn size={20} /></button>
          <button onClick={() => handleZoom('out')} className="btn-secondary" style={{ padding: '0.6rem', boxShadow: 'var(--shadow-sm)' }}><ZoomOut size={20} /></button>
          <button onClick={() => handleZoom('reset')} className="btn-secondary" style={{ padding: '0.6rem', boxShadow: 'var(--shadow-sm)' }}><Maximize size={20} /></button>
        </div>

        {/* Interactive Map Canvas */}
        <div 
          ref={mapRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{ 
            flex: 1,
            width: '100%', 
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'relative',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
          }}
        >
          {/* Fictional Campus Boundaries */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="var(--border-hover)" strokeWidth="1" strokeDasharray="6,6" rx="12" />
            <path d="M 20% 45% L 50% 30% L 70% 60% L 40% 80% Z" fill="none" stroke="var(--border)" strokeWidth="2" />
          </svg>

          {/* Map Pins */}
          {filteredLocations.map(loc => (
            <div 
              key={loc.id} 
              onClick={(e) => { e.stopPropagation(); setSelectedLocation(loc); }}
              style={{
                position: 'absolute',
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                transform: 'translate(-50%, -100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative' }}>
                <MapPin 
                  size={selectedLocation?.id === loc.id ? 32 : 28} 
                  color={selectedLocation?.id === loc.id ? 'var(--text-main)' : loc.color} 
                  fill={selectedLocation?.id === loc.id ? loc.color : 'transparent'}
                  style={{ transition: 'all 0.2s ease', zIndex: selectedLocation?.id === loc.id ? 10 : 1 }}
                />
              </div>
              <span style={{ 
                background: 'var(--surface)', 
                padding: '0.35rem 0.75rem', 
                borderRadius: '6px', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                whiteSpace: 'nowrap',
                marginTop: '6px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
                opacity: (selectedLocation?.id === loc.id || zoom > 1.2) ? 1 : 0,
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
              }}>
                {loc.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Selected Location Info Panel */}
        {selectedLocation && (
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'slideUp 0.2s ease-out' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{selectedLocation.name}</h3>
              <span className="text-muted" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: selectedLocation.color }}></span>
                {selectedLocation.category} Zone
              </span>
            </div>
            <button className="btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
              <Navigation size={18} /> Navigate
            </button>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </main>
  );
}
