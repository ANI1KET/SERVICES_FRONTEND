import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '48px', color: '#FF0000' }}>404</h1>
      <p style={{ fontSize: '24px' }}>
        Oops! The page you're looking for does not exist.
      </p>
      <p>
        <Link href="/" style={{ fontSize: '18px', color: '#0070f3' }}>
          Go back to homepage
        </Link>
      </p>
    </div>
  );
}
