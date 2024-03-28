import { Box } from '@/component/Box';
import { FilesView } from '@/component/upload/FilesView';
import { Send } from '@/component/upload/Send';
import { UploadArea } from '@/component/upload/UploadArea';

export default function page() {
  return (
    <Box className="max-w-7xl m-auto mt-10">
      <UploadArea />
      <FilesView />
      <Send />
    </Box>
  );
}
