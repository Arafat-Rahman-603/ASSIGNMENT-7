import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-extrabold text-brand mb-4">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Page Not Found</h2>
      <p className="text-lg text-slate-600 max-w-md mb-8">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center justify-center bg-brand hover:bg-brand-light text-white font-semibold py-3 px-8 rounded-md transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
