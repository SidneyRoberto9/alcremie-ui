import React from 'react';
import { Send } from 'lucide-react';

import { Box } from '@/component/Box';
import { UploadArea } from '@/component/upload/UploadArea';
import { FilesView } from '@/component/upload/FilesView';

export default function page() {
  return (
    <Box>
      <UploadArea />
      <FilesView />
      <Send />
    </Box>
  );
}
