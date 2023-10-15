'use client';
import { useGallery } from '@/context/useGallery';
import { LoadingPage } from '@/component/LoadingPage';
import { CustomMasonry } from '@/component/CustomMasonry';
import { Box } from '@/component/Box';
import { SideNavFilter } from '@/component/gallery/SideNavFilter';
import { Pagination } from '@/component/gallery/Pagination';

export default function page() {
  const { images, isLoading } = useGallery();

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
