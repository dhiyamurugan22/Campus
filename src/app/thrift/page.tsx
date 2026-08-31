'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, PlusCircle, MessageSquare, Loader2 } from 'lucide-react';

export default function ThriftPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'requests'>('listings');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/thrift?type=${activeTab}`);
        const result = await response.json();
        if (result.success) {
          setItems(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeTab]);

  return (
    <main className="app-container" style={{ padding: '1.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link href="/" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>←</Link>
            Campus Thrift
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Buy, sell, or donate within campus</p>
        </div>
        <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>
          <PlusCircle size={18} />
          Post Item
        </button>
      </header>

      <div style={{ display: 'flex', background: 'var(--border)', borderRadius: 'var(--radius)', padding: '0.25rem', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setActiveTab('listings')}
          style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: activeTab === 'listings' ? 'var(--surface)' : 'transparent', color: activeTab === 'listings' ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: activeTab === 'listings' ? 'bold' : 'normal', cursor: 'pointer', boxShadow: activeTab === 'listings' ? 'var(--shadow)' : 'none', transition: 'all 0.2s' }}>
          I Have Something (Listings)
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: activeTab === 'requests' ? 'var(--surface)' : 'transparent', color: activeTab === 'requests' ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: activeTab === 'requests' ? 'bold' : 'normal', cursor: 'pointer', boxShadow: activeTab === 'requests' ? 'var(--shadow)' : 'none', transition: 'all 0.2s' }}>
          I Need Something (Requests)
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search items, categories, or departments..." 
          style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
        />
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 size={32} className="lucide-spin" color="var(--primary)" />
        </div>
      ) : items.length > 0 ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {items.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{item.title}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>{item.user?.name || item.user} {item.user?.department ? `(${item.user.department}, ${item.user.yearOfStudy})` : ''}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--background)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{item.category}</span>
                    {item.condition && <span style={{ background: 'var(--background)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>Cond: {item.condition}</span>}
                  </div>
                </div>
                {activeTab === 'listings' && (
                  <div style={{ background: item.isFree ? 'var(--secondary)' : 'var(--primary-hover)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', fontWeight: 'bold' }}>
                    {item.isFree ? 'Free' : (item.price ? `₹${item.price}` : 'Paid')}
                  </div>
                )}
              </div>
              <button style={{ width: '100%', padding: '0.75rem', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-main)', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <MessageSquare size={16} /> Contact {activeTab === 'listings' ? 'Owner' : 'Requester'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>No active {activeTab} found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Be the first to post here!</p>
        </div>
      )}
    </main>
  );
}
