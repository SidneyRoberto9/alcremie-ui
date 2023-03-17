import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { z } from 'zod';

import { TagProps } from '../../@types/api/tag';
import { SelectOption } from '../../@types/gallery';
import { api } from '../../server/api';
import { uploadTagStyle } from '../../styles/react-select-tag';
import { createSelectOptionWithTags } from '../../utils/create-select-option';
import { Absolute } from '../Absolute';
import { TextTitle } from '../TextTitle';

const uploadSchema = z.object({
  source: z.string(),
  file: z.any(),
  nsfw: z.boolean().default(false),
});

type UploadSchema = z.infer<typeof uploadSchema>;

interface FormUploadProps {
  tags: TagProps[];
}

export function FormUpload({ tags }: FormUploadProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const toast = useToast();
  const selectedRef = useRef<any>(null);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [isLessThan680] = useMediaQuery('(max-width: 680px)');

  const options = createSelectOptionWithTags(tags);

  async function handleUpload(data: UploadSchema) {
    setIsLoadingSubmit(true);
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

    try {
      await api.post('/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Image uploaded!',
        description: 'The image was uploaded successfully.',
        status: 'success',
        duration: 3500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Image not uploaded!',
        description: 'The image was not uploaded successfully.',
        status: 'error',
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setIsLoadingSubmit(false);
      reset();
    }
  }

  return (
    <Absolute
      __css={{
        'input::file-selector-button': {
          display: 'none',
        },
      }}
    >
      {isLoadingSubmit ? (
        <Absolute bg={'gray.750'}>
          <CircularProgress isIndeterminate color={'green.300'} size={150} />
        </Absolute>
      ) : (
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
            {isLessThan680 ? (
              <FormControl width={'100%'}>
                <FormLabel fontWeight={'bold'}>Source</FormLabel>
                <Input
                  _focusVisible={{
                    borderColor: 'green.300',
                  }}
                  type="text"
                  placeholder="https://www.pixiv.net/en/artworks/90302611"
                  {...register('source', { required: true })}
                />
              </FormControl>
            ) : (
              <InputGroup>
                <InputLeftAddon
                  children="Source"
                  color={'gray.900'}
                  fontWeight={'bold'}
                />
                <Input
                  type="text"
                  _focusVisible={{
                    borderColor: 'green.300',
                  }}
                  placeholder="https://www.pixiv.net/en/artworks/90302611"
                  {...register('source', { required: true })}
                />
              </InputGroup>
            )}

            {isLessThan680 ? (
              <FormControl width={'100%'}>
                <FormLabel fontWeight={'bold'}>Choose File</FormLabel>
                <Input
                  padding={'0.45rem 1rem'}
                  accept="image/*"
                  type="file"
                  {...register('file', { required: true })}
                />
              </FormControl>
            ) : (
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
            )}

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

            {(errors.file || errors.source) && (
              <Text color={'red'}>Preencha os campos necessários...</Text>
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
      )}
    </Absolute>
  );
}
