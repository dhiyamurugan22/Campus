'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, GraduationCap, Lock, Mail, User } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!email.endsWith('@college.edu')) {
      setError('You must use a valid @college.edu email address.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'An error occurred during signup.');
      } else {
        router.push('/login');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Glow effect inside card */}
        <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '100px', background: 'var(--primary)', filter: 'blur(50px)', opacity: 0.5, borderRadius: '50%' }}></div>

        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
          <GraduationCap size={40} color="var(--primary)" />
        </div>
        
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>CampusOne</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>Create your student account</p>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#fda4af', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'left' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: 'var(--radius)', outline: 'none' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>College Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@college.edu"
                required
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: 'var(--radius)', outline: 'none' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: 'var(--radius)', outline: 'none' }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '1rem', 
              background: 'var(--primary)', 
              color: 'white', 
              border: 'none', 
              padding: '0.9rem', 
              borderRadius: 'var(--radius)', 
              fontWeight: 'bold', 
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px 0 rgba(244, 63, 94, 0.39)'
            }}
          >
            {loading ? <Loader2 size={20} className="lucide-spin" /> : 'Create Account'}
          </button>
        </form>
        
        <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
