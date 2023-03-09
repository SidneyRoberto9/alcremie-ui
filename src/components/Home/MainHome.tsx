import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CheckCircle } from 'phosphor-react';

interface MainHomeProps {
  imageId: string;
  image: string;
}

export function MainHome({ image, imageId }: MainHomeProps) {
  const router = useRouter();

  function handleNavigateToGallery() {
    router.push('/recent');
  }

  function handleOpenImage() {
    router.replace(`/preview/${imageId}`);
  }

  return (
    <Box display={'block'}>
      <Flex
        gap={10}
        h={{ base: '100%', lg: '75vh' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Flex
          direction={'column'}
          gap={'1rem'}
          h={'100%'}
          maxW={{ base: '100%', lg: '55vw' }}
        >
          <Heading
            color={'white'}
            w={'100%'}
            display={'flex'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            flexWrap={'wrap'}
            gap={4}
            marginY={'1rem'}
            fontSize={{ base: '3.6rem', lg: '4.2rem' }}
            lineHeight={'0.8'}
          >
            The
            <Text
              bgGradient={'linear(to-b, green.300, gray.400 )'}
              bgClip="text"
            >
              API
            </Text>
            and
            <Text
              bgGradient={'linear(to-b, green.300, gray.400 )'}
              bgClip="text"
            >
              Gallery
            </Text>
            for
            <Text
              bgGradient={'linear(to-t, green.300, blue.400 )'}
              bgClip="text"
            >
              Waifu
            </Text>
            images
          </Heading>
          <Text
            fontSize={{
              base: '1.10rem',

              lg: '1.25rem',
            }}
            w={{ base: '100%', lg: '90%' }}
            color={'white'}
            textAlign={'left'}
          >
            Alcremie was created with the intention of simulating platforms like
            Dabooru or SankakuComplex. However, the main inspiration for
            creating the platform/API was WAIFU.IM. Although it didn't exactly
            match my preferences, I decided to create this platform to offer a
            more customized option. I am constantly working to add improvements
            and make the platform more robust and easy to use, with features
            that allow you to create galleries and other applications.
          </Text>
          <Text fontSize={'0.85rem'} color={'white'}>
            Alcremie DOES NOT own any picture, therefore, we return a source
            link to credit the artist.
          </Text>

          <Text fontSize={'2.5rem'} color={'white'}>
            Get Started
          </Text>

          <HStack>
            <Button variant={'default'} onClick={handleNavigateToGallery}>
              Gallery
            </Button>
          </HStack>
        </Flex>

        <Flex
          direction={'column'}
          alignItems={'center'}
          w={'100%'}
          minW={{ base: 'auto', lg: '400px' }}
          h={'100%'}
          transition={'all 250ms ease-in-out'}
          _hover={{
            transform: 'scale(1.05)',
          }}
        >
          <Image
            onClick={handleOpenImage}
            src={image}
            fallbackSrc={'/unset.png'}
            fallbackStrategy={'onError'}
            w={'100%'}
            h={'100%'}
            objectFit={'cover'}
            borderRadius={'8px'}
            cursor={'pointer'}
            __css={{
              WebkitBoxShadow: '0px 0px 25px 1px rgba(0,0,0,0.75)',
              MozBoxShadow: '0px 0px 25px 1px rgba(0,0,0,0.75)',
              boxShadow: '0px 0px 25px 1px rgba(0,0,0,0.75)',
            }}
          />
          <Text
            display={'flex'}
            alignItems={'center'}
            p={'0.35rem'}
            gap={'0.15rem'}
          >
            <CheckCircle size={20} color={'#00b37e'} />
            The API is currently online
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
