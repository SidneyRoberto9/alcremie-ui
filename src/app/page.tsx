import { Box } from '@/components/Box';
import { Statistics } from '@/components/home/Statistics';
import { HomeProvider } from '@/components/home/HomeProvider';
import { Hero } from '@/components/home/Hero';

export default function Page() {
  return (
    <HomeProvider>
      <Hero />
      <Statistics />
    </HomeProvider>
  );
}
