import RecentProvider from '@/components/recent/RecentProvider';
import { RecentMasonry } from '@/components/recent/RecentMasonry';
import { Pagination } from '@/components/recent/Pagination';

export default function page() {
  return (
    <RecentProvider>
      <div className="relative">
        <RecentMasonry />
        <Pagination />
      </div>
    </RecentProvider>
  );
}
