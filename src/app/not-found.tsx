import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-8 text-center text-white">
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
