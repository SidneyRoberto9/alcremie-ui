import React from 'react';

import { Box } from '@/components/Box';
import { UploadArea } from '@/components/upload/UploadArea';
import { Send } from '@/components/upload/Send';
import { FilesView } from '@/components/upload/FilesView';

export default function page() {
  return (
    <Box>
      <UploadArea />
      <FilesView />
      <Send />
    </Box>
  );
}
