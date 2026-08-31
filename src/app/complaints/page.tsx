'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Info, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function ComplaintsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hostel / Accommodation',
    location: '',
    description: '',
    isAnonymous: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setFormData({ title: '', category: 'Hostel / Accommodation', location: '', description: '', isAnonymous: false });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container" style={{ padding: '1.5rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>←</Link>
          Complaints
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Report campus infrastructure & facility issues</p>
      </header>

      <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #F59E0B', color: '#B45309', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '2rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <Info size={20} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
        <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
          Your complaints are sent directly to the college administration. You can choose to remain anonymous if required. Misuse of this system may lead to disciplinary action.
        </p>
      </div>

      {success && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--secondary)', color: 'var(--secondary)', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '2rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <CheckCircle2 size={20} />
          <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: 'bold' }}>Complaint submitted successfully. You can track its status later.</p>
        </div>
      )}

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>File a New Complaint</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Issue Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Brief summary of the issue" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}>
              <option>Hostel / Accommodation</option>
              <option>Classroom Facilities</option>
              <option>Canteen / Food</option>
              <option>Wi-Fi / Network</option>
              <option>Electricity / Water</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Location / Building</label>
            <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Main Block, 3rd Floor" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Detailed Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} placeholder="Describe the issue in detail..." style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input type="checkbox" id="anonymous" checked={formData.isAnonymous} onChange={e => setFormData({...formData, isAnonymous: e.target.checked})} style={{ width: '1.2rem', height: '1.2rem' }} />
            <label htmlFor="anonymous" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
              <ShieldAlert size={16} /> Submit Anonymously
            </label>
          </div>

          <button type="submit" disabled={loading} style={{ marginTop: '1rem', background: 'var(--primary)', color: 'white', border: 'none', padding: '1rem', borderRadius: 'var(--radius)', fontSize: '1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? <Loader2 size={18} className="lucide-spin" /> : <Send size={18} />} 
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </main>
  );
}
