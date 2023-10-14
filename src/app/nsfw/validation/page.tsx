import Link from 'next/link';

import { Box } from '@/component/Box';

export default function page() {
  return (
    <Box>
      <div className="flex items-center justify-center h-full">
        <span className="-mt-20 inline-block h-screen align-middle" aria-hidden="true"></span>

        <div className="bg-lucide-800 rounded-lg px-3 py-8 text-center sm:px-8">
          <h1 className="text-center text-5xl text-zinc-50 2">Age Verification</h1>
          <div className="my-6">
            <p>This page may contain age-restricted content.</p>
            <p>You must be 18 years old or older to enter.</p>
          </div>

          <Link
            href="/nsfw"
            className="py-2 px-4 bg-violet-400 text-zinc-50 hover:bg-violet-500 transition-all duration-200 easy rounded-md outline-none shadow-md">
            I'm 18 years old or older
          </Link>
        </div>
      </div>
    </Box>
  );
}
