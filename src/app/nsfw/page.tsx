'use client';

import { useNSFW } from '@/store/nsfw';
import { CustomMasonry } from '@/component/CustomMasonry';
import { Box } from '@/component/Box';
import { SideNavFilter } from '@/component/nsfw/SideNavFilter';
import { Pagination } from '@/component/nsfw/Pagination';

export default function page() {
  const { images } = useNSFW();

  return (
    <Box>
      <SideNavFilter />
      <CustomMasonry data={images} />
      <Pagination />
    </Box>
  );
}
