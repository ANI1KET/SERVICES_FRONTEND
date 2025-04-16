import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center mt-12">
      <h1 className="text-6xl text-red-500">404</h1>
      <p className="text-2xl">
        {"Oops! The page you're looking for does not exist."}
      </p>
      <p>
        <Link href="/" className="text-lg text-blue-500 hover:underline">
          Go back to homepage
        </Link>
      </p>
    </div>
  );
}
