import { Statistics } from '@/components/home/Statistics';
import { HomeProvider } from '@/components/home/HomeProvier';
import { Hero } from '@/components/home/Hero';

export default function Home() {
  return (
    <HomeProvider>
      <Hero />
      <Statistics />
    </HomeProvider>
  );
}
