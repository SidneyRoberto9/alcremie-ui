import { Image } from '@chakra-ui/react';

interface AvatarProps {
  src: string;
}

export function Avatar({ src }: AvatarProps) {
  return <Image src={src} w={30} h={30} borderRadius="full" />;
}
