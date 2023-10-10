import { Statistics } from '@/component/home/Statistics';
import { HomeProvider } from '@/component/home/HomeProvider';
import { Hero } from '@/component/home/Hero';

export default function Page() {
  return (
    <HomeProvider>
      <Hero />
      <Statistics />
    </HomeProvider>
  );
}
