import { Box } from '@/components/Box';
import { SideNavFilter } from '@/components/recent/SideNavFilter';
import RecentProvider from '@/components/recent/RecentProvider';
import { RecentMasonry } from '@/components/recent/RecentMasonry';
import { Pagination } from '@/components/recent/Pagination';

export default function page() {
  return (
    <RecentProvider>
      <Box>
        <SideNavFilter />
        <RecentMasonry />
        <Pagination />
      </Box>
    </RecentProvider>
  );
}
