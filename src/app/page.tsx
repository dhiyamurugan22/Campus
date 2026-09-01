'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, User as UserIcon, Loader2, Map as MapIcon, ShoppingBag, Clock, Megaphone, PenSquare } from 'lucide-react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader2 size={32} className="lucide-spin text-muted" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <main className="app-container">
      
      {/* Header & User Profile Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Overview
          </h1>
          <p className="text-muted" style={{ fontSize: '1rem' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Student'}
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>{user?.name || 'Student User'}</span>
            <span className="text-muted" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-heading)' }}>ID: {(user as any)?.id?.split('-')[0].toUpperCase() || 'UNVERIFIED'}</span>
          </div>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#F0CA63', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <UserIcon size={20} color="var(--text-main)" />
          </div>
          <button onClick={() => signOut()} className="btn-secondary" style={{ padding: '0.6rem', borderRadius: '50%' }} title="Sign out">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <Link href="/map" className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
          <div style={{ padding: '0.8rem', background: '#CDE8D4', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <MapIcon size={24} color="var(--text-main)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.35rem' }}>Campus Map</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Navigate the campus easily and find departments.</p>
          </div>
        </Link>

        <Link href="/thrift" className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
          <div style={{ padding: '0.8rem', background: '#F0CA63', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <ShoppingBag size={24} color="var(--text-main)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.35rem' }}>Campus Thrift</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Buy, sell, or donate items within the community.</p>
          </div>
        </Link>

        <Link href="/clock" className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
          <div style={{ padding: '0.8rem', background: '#92C4DC', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <Clock size={24} color="var(--text-main)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.35rem' }}>Academic Clock</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Track the semester and upcoming deadlines.</p>
          </div>
        </Link>

        <Link href="/board" className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
          <div style={{ padding: '0.8rem', background: '#ED765F', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <Megaphone size={24} color="var(--surface)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.35rem' }}>Campus Board</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Discover events, announcements, and opportunities.</p>
          </div>
        </Link>

        <Link href="/complaints" className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
          <div style={{ padding: '0.8rem', background: '#E3E0D8', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <PenSquare size={24} color="var(--text-main)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.35rem' }}>Complaints</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Report campus issues or request maintenance.</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
