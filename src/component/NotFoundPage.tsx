import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Alcremie',
  description: 'The Anime Image API',
};

export function NotFoundPage() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
      <img src="/not-found.png" alt="not-found" className="w-24 h-24 object-cover" />
      <p className="text-zinc-50 text-3xl">Page not Found</p>
      <Link
        href="/"
        className="py-2 px-4 text-zinc-50  ring-1 ring-zinc-50 rounded-md outline-none shadow-md">
        Go Home
      </Link>
    </div>
  );
}
