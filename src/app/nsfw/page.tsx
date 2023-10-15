'use client';

import { useNSFW } from '@/context/useNSFW';
import { LoadingPage } from '@/component/LoadingPage';
import { CustomMasonry } from '@/component/CustomMasonry';
import { Box } from '@/component/Box';
import { SideNavFilter } from '@/component/nsfw/SideNavFilter';
import { Pagination } from '@/component/nsfw/Pagination';

export default function page() {
  const { images, isLoading } = useNSFW();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Box>
      <SideNavFilter />
      <CustomMasonry data={images} />
      <Pagination />
    </Box>
  );
}
