'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Clock as ClockIcon, Calendar as CalendarIcon, Loader2 } from 'lucide-react';

export default function ClockPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/clock');
        const result = await response.json();
        if (result.success) {
          setEvents(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getDaysLeft = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `Due in ${diffDays} days` : 'Past due';
  };

  return (
    <main className="app-container" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>←</Link>
          Academic Clock
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Visualize your semester</p>
      </header>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
        {/* Placeholder for Circular Clock */}
        <div style={{ width: '250px', height: '250px', borderRadius: '50%', border: '8px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: '2rem' }}>
          <div style={{ position: 'absolute', width: '50%', height: '8px', background: 'var(--primary)', top: 'calc(50% - 4px)', left: '50%', transformOrigin: 'left center', transform: 'rotate(-45deg)', borderRadius: '4px' }}></div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>45</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Days Left</p>
          </div>
        </div>
        
        <h3 style={{ marginBottom: '0.5rem' }}>Current Semester: ODD 2026</h3>
        <p style={{ color: 'var(--text-muted)' }}>15 weeks completed, 6 weeks remaining.</p>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CalendarIcon size={18} /> Upcoming Deadlines
        </h3>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <Loader2 size={24} className="lucide-spin" color="var(--primary)" />
          </div>
        ) : events.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {events.map(event => (
              <div key={event.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '1rem', borderRadius: 'var(--radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{event.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{getDaysLeft(event.date)}</span>
                </div>
                {event.category === 'EXAM' ? <ClockIcon color="var(--primary)" size={20} /> : <AlertCircle color="#F59E0B" size={20} />}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No upcoming deadlines!</p>
        )}
      </div>
    </main>
  );
}
