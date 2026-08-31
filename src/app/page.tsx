'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, User as UserIcon, Loader2 } from 'lucide-react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader2 size={40} color="var(--primary)" className="lucide-spin" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <main className="app-container" style={{ padding: '2rem' }}>
      
      {/* User Profile Section */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to right, var(--surface), rgba(244, 63, 94, 0.1))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', boxShadow: '0 4px 14px 0 rgba(244, 63, 94, 0.39)' }}>
            <UserIcon size={32} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{user?.name || 'Student'}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{user?.email || 'student@college.edu'}</p>
            <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', marginTop: '0.4rem', border: '1px solid var(--border)' }}>
              ID: {(user as any)?.id?.split('-')[0].toUpperCase() || 'UNVERIFIED'}
            </span>
          </div>
        </div>
        <button onClick={() => signOut()} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s' }} title="Logout">
          <LogOut size={20} />
        </button>
      </div>

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-main)', fontSize: '2rem' }}>Good Morning 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>What do you need today?</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <Link href="/map" className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '2rem' }}>🗺️</div>
          <h2>Campus Map</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Navigate the campus easily</p>
        </Link>
        <Link href="/thrift" className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '2rem' }}>♻️</div>
          <h2>Campus Thrift</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Buy, sell, or donate items</p>
        </Link>
        <Link href="/clock" className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '2rem' }}>⏰</div>
          <h2>Academic Clock</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage your academic schedule</p>
        </Link>
        <Link href="/board" className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '2rem' }}>📢</div>
          <h2>Campus Board</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Discover events and opportunities</p>
        </Link>
        <Link href="/complaints" className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '2rem' }}>📝</div>
          <h2>Complaints</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Report campus issues</p>
        </Link>
      </div>
    </main>
  );
}
