'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Clock as ClockIcon, Calendar as CalendarIcon, Loader2, ArrowLeft } from 'lucide-react';

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

  // Mock progress data for semester
  const totalWeeks = 21;
  const completedWeeks = 15;
  const progressPercentage = Math.round((completedWeeks / totalWeeks) * 100);

  return (
    <main className="app-container">
      <header style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link href="/" className="btn-secondary" style={{ padding: '0.6rem' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Academic Clock
          </h1>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Visualize your semester timeline and deadlines</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>Current Semester</h2>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>ODD 2026</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>45</span>
              <span className="text-muted" style={{ fontSize: '0.9rem', marginLeft: '0.35rem' }}>Days Left</span>
            </div>
          </div>
          
          <div style={{ width: '100%', height: '10px', background: 'var(--background)', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid var(--border)' }}>
            <div style={{ width: `${progressPercentage}%`, height: '100%', background: '#F0CA63', borderRadius: '4px' }}></div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            <span>{completedWeeks} weeks completed</span>
            <span>{totalWeeks - completedWeeks} weeks remaining</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          <CalendarIcon size={20} /> Upcoming Deadlines
        </h3>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <Loader2 size={24} className="lucide-spin text-muted" />
          </div>
        ) : events.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {events.map(event => (
              <div key={event.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ padding: '0.6rem', background: event.category === 'EXAM' ? '#92C4DC' : '#ED765F', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    {event.category === 'EXAM' ? <ClockIcon color="var(--text-main)" size={20} /> : <AlertCircle color="var(--surface)" size={20} />}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0, marginBottom: '0.15rem' }}>{event.title}</h4>
                    <span className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{getDaysLeft(event.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', background: 'var(--background)', borderRadius: '50%', border: '1px solid var(--border)' }}>
              <CalendarIcon size={32} className="text-muted" />
            </div>
            <p className="text-muted" style={{ fontSize: '1.05rem' }}>No upcoming deadlines!</p>
          </div>
        )}
      </div>
    </main>
  );
}
