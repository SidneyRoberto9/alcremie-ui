import { Box } from '@/component/Box';
import { SideNavFilter } from '@/component/recent/SideNavFilter';
import { RecentMasonry } from '@/component/recent/RecentMasonry';
import { Pagination } from '@/component/recent/Pagination';

export default function page() {
  return (
    <Box>
      <SideNavFilter />
      <RecentMasonry />
      <Pagination />
    </Box>
  );
}
