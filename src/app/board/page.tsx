'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, PlusCircle, Users, Loader2 } from 'lucide-react';

export default function BoardPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/board');
        const result = await response.json();
        if (result.success) {
          setPosts(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch board posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="app-container" style={{ padding: '1.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link href="/" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>←</Link>
            Campus Board
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Events, Opportunities & Announcements</p>
        </div>
        <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>
          <PlusCircle size={18} />
          Create
        </button>
      </header>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 size={32} className="lucide-spin" color="var(--primary)" />
        </div>
      ) : posts.length > 0 ? (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {posts.map(post => (
            <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: `4px solid ${post.category === 'EVENT' ? 'var(--primary)' : 'var(--secondary)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', color: post.category === 'EVENT' ? 'var(--primary)' : 'var(--secondary)' }}>
                  {post.category}
                </span>
                {post.date && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} /> {new Date(post.date).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{post.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>By {post.organizer || (post.user && post.user.name)}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Users size={16} /> 
                  {post._count?.registrations || 0} {post.max ? `/ ${post.max} Registered` : 'Interested'}
                </div>
                <button style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', fontWeight: 'bold', cursor: 'pointer' }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>No active posts found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Check back later for new events!</p>
        </div>
      )}
    </main>
  );
}
