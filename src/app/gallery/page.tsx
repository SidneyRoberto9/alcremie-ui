'use client';
import { useGallery } from '@/store/gallery';
import { CustomMasonry } from '@/component/CustomMasonry';
import { Box } from '@/component/Box';
import { SideNavFilter } from '@/component/gallery/SideNavFilter';
import { Pagination } from '@/component/gallery/Pagination';

export default function page() {
  const { images } = useGallery();

  return (
    <Box>
      <SideNavFilter />
      <CustomMasonry data={images} />
      <Pagination />
    </Box>
  );
}
