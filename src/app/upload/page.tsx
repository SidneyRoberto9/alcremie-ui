import React from 'react';

import { Box } from '@/component/Box';
import { UploadArea } from '@/component/upload/UploadArea';
import { Send } from '@/component/upload/Send';
import { FilesView } from '@/component/upload/FilesView';

export default function page() {
  return (
    <Box className="max-w-7xl m-auto mt-10">
      <UploadArea />
      <FilesView />
      <Send />
    </Box>
  );
}
