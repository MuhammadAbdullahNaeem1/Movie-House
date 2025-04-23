import Link from 'next/link';
export default function Custom404() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Oops! We can’t find that page.</p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded">Go Home</Link>
    </div>
  );
}