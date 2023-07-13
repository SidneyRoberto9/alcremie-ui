import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { useContextSelector } from 'use-context-selector';
import { z } from 'zod';

import { TagIds, TagProps } from '../../@types/api/tag';
import { CreateImg, SelectOption } from '../../@types/gallery';
import { galleryContext } from '../../context/useGallery';
import { uploadTagStyle } from '../../styles/react-select-tag';
import { createSelectOptionWithTags } from '../../utils/create-select-option';
import { Absolute } from '../Absolute';
import { TextTitle } from '../TextTitle';
import { InputFileUpload } from './InputFileUpload';
import { InputTextUpload } from './InputTextUpload';

const uploadSchema = z.object({
  source: z.string().optional(),
  file: z.any(),
  nsfw: z.boolean().default(false),
});

export type UploadSchema = z.infer<typeof uploadSchema>;
export type UploadSchemaKeys = Required<keyof UploadSchema>;

interface FormUploadProps {
  tags: TagProps[];
}

export function FormUpload({ tags }: FormUploadProps) {
  const createImage = useContextSelector(
    galleryContext,
    ({ createImage }) => createImage,
  );

  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const selectedRef = useRef<any>(null);
  const options = createSelectOptionWithTags(tags);
  const [isLessThan680] = useMediaQuery('(max-width: 680px)');

  async function handleUpload(data: UploadSchema) {
    const tags: TagIds[] = selectedRef.current
      .getValue()
      .map((tag: SelectOption) => {
        return {
          id: tag.value,
        };
      });

    if (tags.length <= 0) {
      return setError('file', {
        message: 'Please select at least 1 tags!!',
      });
    }

    const { source, nsfw, file } = data;

    if (file.length <= 0) {
      return setError('file', {
        message: 'Please select an image!!',
      });
    }

    await createImage({
      file: file[0] as File,
      source: source || '',
      nsfw,
      tags,
    } satisfies CreateImg);

    selectedRef.current.clearValue();
    reset();
  }

  return (
    <Absolute
      __css={{
        'input::file-selector-button': {
          display: 'none',
        },
      }}
    >
      <Flex
        maxW={'40rem'}
        w={isLessThan680 ? '21rem' : '40rem'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={'1rem'}
      >
        <TextTitle>File Upload</TextTitle>

        <Flex
          as={'form'}
          width={'100%'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          gap={'0.875rem'}
          padding={'1.25rem 1.75rem'}
          onSubmit={handleSubmit(handleUpload)}
        >
          <InputTextUpload
            name="source"
            label="Source"
            placeholder="https://www.pixiv.net/en/artworks/90302611"
            register={register}
          />

          <InputFileUpload
            label="Choose File"
            name="file"
            register={register}
          />

          <FormControl width={'100%'}>
            {isLessThan680 && (
              <FormLabel fontWeight={'bold'}>Select your tags</FormLabel>
            )}

            <Box
              id={'select-box-2'}
              instanceId={'select-box-2'}
              as={ReactSelect}
              width={'100%'}
              color={'gray.900'}
              options={options}
              isMulti
              placeholder={'Select your tags'}
              ref={selectedRef}
              styles={uploadTagStyle}
              closeMenuOnSelect={false}
            />
          </FormControl>

          <InputGroup>
            <Checkbox
              iconSize="2rem"
              colorScheme={'whiteAlpha'}
              {...register('nsfw')}
            >
              NSFW
            </Checkbox>
          </InputGroup>

          {errors.file && (
            <Text color={'red'}>{String(errors.file.message)}</Text>
          )}

          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              type="submit"
              variant={'primary'}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Upload
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Absolute>
  );
}
