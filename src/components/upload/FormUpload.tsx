import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { z } from 'zod';

import { SelectOption } from '../../@types/gallery';
import { useTags } from '../../context/useTags';
import { api } from '../../server/api';
import { uploadTagStyle } from '../../styles/react-select-tag';
import { Capitalize } from '../../utils/captalize';
import { TextTitle } from '../TextTitle';

const uploadSchema = z.object({
  source: z.string(),
  file: z.any(),
  nsfw: z.boolean().default(false),
});

type UploadSchema = z.infer<typeof uploadSchema>;

export function FormUpload() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });
  const router = useRouter();
  const { data } = useTags();
  const toast = useToast();

  const selectedRef = useRef<any>(null);

  const options: SelectOption[] = data.map((tag) => {
    return { value: tag.id, label: Capitalize(tag.name) };
  });

  async function handleUpload(data: UploadSchema) {
    const tags = selectedRef.current.getValue().map((tag: SelectOption) => {
      return {
        id: tag.value,
      };
    });

    const { source, nsfw, file } = data;

    const document = {
      source,
      is_nsfw: nsfw,
      tags,
    };

    const formData = new FormData();
    formData.append('picture', file[0]);
    formData.append('document', JSON.stringify(document));

    api
      .post('/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch((err) => {
        toast({
          title: 'Image not uploaded!',
          description: 'The image was not uploaded successfully.',
          status: 'error',
          duration: 3500,
          isClosable: true,
        });
      })
      .then(() => {
        toast({
          title: 'Image uploaded!',
          description: 'The image was uploaded successfully.',
          status: 'success',
          duration: 3500,
          isClosable: true,
        });
        router.replace('/recent');
      });
  }

  return (
    <Box
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      transform={'translate(-50%, -50%)'}
      width={'35rem'}
      bg={'gray.850'}
      borderRadius={'1rem'}
      __css={{
        'input::file-selector-button': {
          display: 'none',
        },
      }}
    >
      <Flex
        w={'100%'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={'1rem'}
      >
        <TextTitle>File Upload</TextTitle>

        <Flex
          as={'form'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          gap={'0.875rem'}
          padding={'1.25rem 1.75rem'}
          onSubmit={handleSubmit(handleUpload)}
        >
          <InputGroup width={'32rem'}>
            <InputLeftAddon
              children="Optional Source"
              color={'gray.900'}
              fontWeight={'bold'}
            />
            <Input
              type="text"
              placeholder="https://www.pixiv.net/en/artworks/90302611"
              {...register('source', { required: true })}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon
              children="Choose File"
              color={'gray.900'}
              fontWeight={'bold'}
            />
            <Input
              padding={'0.45rem 1rem'}
              accept="image/*"
              type="file"
              {...register('file', { required: true })}
            />
          </InputGroup>

          <Box
            as={ReactSelect}
            width={'100%'}
            color={'gray.900'}
            options={options}
            isMulti
            placeholder={'Select your tags'}
            ref={selectedRef}
            styles={uploadTagStyle}
          />

          <InputGroup>
            <Checkbox
              iconSize="2rem"
              colorScheme={'whiteAlpha'}
              {...register('nsfw')}
            >
              NSFW
            </Checkbox>
          </InputGroup>

          {(errors.file || errors.source) && (
            <Text color={'red'}>Preencha os campos necessários...</Text>
          )}

          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              type="submit"
              variant={'default'}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Upload
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
