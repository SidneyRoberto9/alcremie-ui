import { z } from 'zod';
import { useContextSelector } from 'use-context-selector';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Text, Flex, Button, useMediaQuery } from '@chakra-ui/react';

import { InputTextUpload } from './InputTextUpload';
import { InputFileUpload } from './InputFileUpload';
import { TextTitle } from '../TextTitle';
import { Absolute } from '../Absolute';
import { galleryContext } from '../../context/useGallery';
import { SelectOption, CreateImg } from '../../@types/gallery';

const uploadSchema = z.object({
  source: z.string().optional(),
  file: z.any(),
});

export type UploadSchema = z.infer<typeof uploadSchema>;
export type UploadSchemaKeys = Required<keyof UploadSchema>;

export function FormUpload() {
  const createImage = useContextSelector(galleryContext, ({ createImage }) => createImage);

  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const [isLessThan680] = useMediaQuery('(max-width: 680px)');

  async function handleUpload(data: UploadSchema) {
    const { source, file } = data;

    if (file.length <= 0) {
      return setError('file', {
        message: 'Please select an image!!',
      });
    }

    await createImage({
      file: file[0] as File,
      source: source || '',
    } satisfies CreateImg);

    reset();
  }

  return (
    <Absolute
      __css={{
        'input::file-selector-button': {
          display: 'none',
        },
      }}>
      <Flex
        maxW={'40rem'}
        w={isLessThan680 ? '21rem' : '40rem'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={'1rem'}>
        <TextTitle>File Upload</TextTitle>

        <Flex
          as={'form'}
          width={'100%'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          gap={'0.875rem'}
          padding={'1.25rem 1.75rem'}
          onSubmit={handleSubmit(handleUpload)}>
          <InputTextUpload
            name="source"
            label="Source"
            placeholder="https://www.pixiv.net/en/artworks/90302611"
            register={register}
          />

          <InputFileUpload label="Choose File" name="file" register={register} />

          {errors.file && <Text color={'red'}>{String(errors.file.message)}</Text>}

          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              type="submit"
              variant={'primary'}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}>
              Upload
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Absolute>
  );
}
