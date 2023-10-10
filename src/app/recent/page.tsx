import { Box } from '@/components/Box';
import { SideNavFilter } from '@/components/recent/SideNavFilter';
import { RecentMasonry } from '@/components/recent/RecentMasonry';
import { Pagination } from '@/components/recent/Pagination';

export default function page() {
  return (
    <Box>
      <SideNavFilter />
      <RecentMasonry />
      <Pagination />
    </Box>
  );
}
