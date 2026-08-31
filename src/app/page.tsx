import Link from 'next/link';

export default function Home() {
  return (
    <main className="app-container" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)' }}>Good Morning, Student 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>What do you need today?</p>
      </header>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <Link href="/map" className="card">
          <h2>🗺️ Campus Map</h2>
          <p style={{ color: 'var(--text-muted)' }}>Navigate the campus easily</p>
        </Link>
        <Link href="/thrift" className="card">
          <h2>♻️ Campus Thrift</h2>
          <p style={{ color: 'var(--text-muted)' }}>Buy, sell, or donate items</p>
        </Link>
        <Link href="/clock" className="card">
          <h2>⏰ Academic Clock</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage your academic schedule</p>
        </Link>
        <Link href="/board" className="card">
          <h2>📢 Campus Board</h2>
          <p style={{ color: 'var(--text-muted)' }}>Discover events and opportunities</p>
        </Link>
        <Link href="/complaints" className="card">
          <h2>📝 Complaints</h2>
          <p style={{ color: 'var(--text-muted)' }}>Report campus issues</p>
        </Link>
      </div>
    </main>
  );
}
