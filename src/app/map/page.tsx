'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, Search, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const MOCK_LOCATIONS = [
  { id: 1, name: 'Main Block', category: 'Administration', x: 50, y: 30 },
  { id: 2, name: 'CSE Department', category: 'Academic', x: 20, y: 45 },
  { id: 3, name: 'Library', category: 'Academic', x: 70, y: 60 },
  { id: 4, name: 'Canteen', category: 'Food', x: 40, y: 80 },
  { id: 5, name: 'Sports Ground', category: 'Sports', x: 80, y: 20 },
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
    <main className="app-container" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <header style={{ marginBottom: '1.5rem', flexShrink: 0 }}>
        <h1 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>←</Link>
          Campus Map
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Find your way around the college</p>
      </header>

      <div style={{ position: 'relative', marginBottom: '1rem', flexShrink: 0 }}>
        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for departments, labs, canteen..." 
          style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', boxShadow: 'var(--shadow)' }}
        />
      </div>

      <div className="card" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden', background: 'var(--border)', borderRadius: 'var(--radius)' }}>
        
        {/* Map Controls */}
        <div style={{ position: 'absolute', right: '1rem', top: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 10 }}>
          <button onClick={() => handleZoom('in')} style={{ background: 'var(--surface)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', boxShadow: 'var(--shadow)' }}><ZoomIn size={20} /></button>
          <button onClick={() => handleZoom('out')} style={{ background: 'var(--surface)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', boxShadow: 'var(--shadow)' }}><ZoomOut size={20} /></button>
          <button onClick={() => handleZoom('reset')} style={{ background: 'var(--surface)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', boxShadow: 'var(--shadow)' }}><Maximize size={20} /></button>
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
            width: '100%', 
            height: '100%', 
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'absolute',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            opacity: 0.8
          }}
        >
          {/* Fictional Campus Boundaries */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="10,5" opacity="0.3" rx="15" />
            <path d="M 20% 45% L 50% 30% L 70% 60% L 40% 80% Z" fill="none" stroke="var(--secondary)" strokeWidth="2" opacity="0.5" />
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
              <MapPin 
                size={selectedLocation?.id === loc.id ? 32 : 24} 
                color={selectedLocation?.id === loc.id ? 'var(--primary)' : 'var(--text-main)'} 
                fill={selectedLocation?.id === loc.id ? 'var(--primary-hover)' : 'transparent'}
                style={{ transition: 'all 0.2s' }}
              />
              <span style={{ 
                background: 'var(--surface)', 
                padding: '2px 6px', 
                borderRadius: '4px', 
                fontSize: '0.7rem', 
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                marginTop: '4px',
                boxShadow: 'var(--shadow)',
                border: '1px solid var(--border)',
                opacity: (selectedLocation?.id === loc.id || zoom > 1.2) ? 1 : 0,
                transition: 'opacity 0.2s'
              }}>
                {loc.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Selected Location Info Panel */}
        {selectedLocation && (
          <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'slideUp 0.3s ease-out' }}>
            <div>
              <h3 style={{ margin: 0, color: 'var(--primary)' }}>{selectedLocation.name}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedLocation.category} Zone</span>
            </div>
            <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>
              <Navigation size={16} /> Go
            </button>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </main>
  );
}
