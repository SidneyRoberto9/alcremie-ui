import { Button, Flex, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CheckCircle } from 'phosphor-react';

interface MainHomeProps {
  image: string;
}

export function MainHome({ image }: MainHomeProps) {
  const router = useRouter();

  function handleNavigateToGallery() {
    router.push('/recent');
  }

  function handleOpenImage() {
    window.open(image, '_blank');
  }

  return (
    <HStack spacing={10} h={'75vh'}>
      <Flex direction={'column'} gap={'1rem'} h={'100%'} maxW={'55vw'}>
        <Heading
          color={'white'}
          w={'100%'}
          display={'flex'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          flexWrap={'wrap'}
          gap={4}
          fontSize={'4.5rem'}
        >
          The
          <Text bgGradient={'linear(to-b, green.300, gray.400 )'} bgClip="text">
            API
          </Text>
          and
          <Text bgGradient={'linear(to-b, green.300, gray.400 )'} bgClip="text">
            Gallery
          </Text>
          for
          <Text bgGradient={'linear(to-t, green.300, blue.400 )'} bgClip="text">
            Waifu
          </Text>
          images
        </Heading>
        <Text
          fontSize={'1.25rem'}
          w={'90%'}
          color={'white'}
          textAlign={'justify'}
        >
          Alcremie was created with the intention of simulating platforms like
          Dabooru or SankakuComplex. However, the main inspiration for creating
          the platform/API was WAIFU.IM. Although it didn't exactly match my
          preferences, I decided to create this platform to offer a more
          customized option. I am constantly working to add improvements and
          make the platform more robust and easy to use, with features that
          allow you to create galleries and other applications.
        </Text>
        <Text fontSize={'0.85rem'} color={'white'}>
          Alcremie DOES NOT own any picture, therefore, we return a source link
          to credit the artist.
        </Text>

        <Text fontSize={'2.5rem'} color={'white'}>
          Get Started
        </Text>

        <HStack>
          <Button
            bg={'green.300'}
            transition={'filter 250ms ease-in-out'}
            _hover={{
              filter: 'brightness(0.8)',
            }}
            onClick={handleNavigateToGallery}
          >
            Gallery
          </Button>
        </HStack>
      </Flex>

      <Flex
        direction={'column'}
        alignItems={'center'}
        w={'100%'}
        minW={'400px'}
        h={'100%'}
        transition={'all 250ms ease-in-out'}
        _hover={{
          transform: 'scale(1.05)',
        }}
      >
        <Image
          onClick={handleOpenImage}
          src={image}
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
    </HStack>
  );
}
