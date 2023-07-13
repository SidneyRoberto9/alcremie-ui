import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Textarea,
  Text,
  Input,
  FormLabel,
  FormControl,
  Flex,
  CircularProgress,
  Button,
  useToast,
  useMediaQuery,
} from '@chakra-ui/react';

import { TextTitle } from '../TextTitle';
import { Absolute } from '../Absolute';
import { api } from '../../server/api';

const contactDataEmailSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().min(1).max(100),
  message: z.string().min(1).max(5000),
});

type ContactDataEmail = z.infer<typeof contactDataEmailSchema>;

export function FormContact() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ContactDataEmail>({
    resolver: zodResolver(contactDataEmailSchema),
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [isLessThan680] = useMediaQuery('(max-width: 680px)');
  const toast = useToast();

  async function handleSendEmail(data: ContactDataEmail) {
    try {
      setIsLoadingSubmit(true);
      await api.post('/email', data);

      reset();
      toast({
        title: 'Email sent!',
        description: 'The email was sent successfully.',
        status: 'success',
        duration: 3500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while sending the email.',
        status: 'error',
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  return (
    <Absolute>
      {isLoadingSubmit ? (
        <Absolute bg={'gray.750'}>
          <CircularProgress isIndeterminate color={'green.300'} size={150} />
        </Absolute>
      ) : (
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          padding={'1rem'}
          maxW={'40rem'}
          w={isLessThan680 ? '21rem' : '40rem'}>
          <TextTitle>Contact Us</TextTitle>

          <Flex
            as={'form'}
            width={'100%'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            gap={'0.875rem'}
            padding={'1.25rem 1.75rem'}
            onSubmit={handleSubmit(handleSendEmail)}>
            <FormControl width={'100%'}>
              <FormLabel fontWeight={'bold'}>Name</FormLabel>
              <Input
                _focusVisible={{
                  borderColor: errors.name ? 'red' : 'green.300',
                }}
                type="text"
                {...register('name', { required: true })}
              />
            </FormControl>

            <FormControl width={'100%'}>
              <FormLabel fontWeight={'bold'}>Email</FormLabel>
              <Input
                _focusVisible={{
                  borderColor: errors.email ? 'red' : 'green.300',
                }}
                type="email"
                {...register('email', { required: true })}
              />
            </FormControl>

            <FormControl width={'100%'}>
              <FormLabel fontWeight={'bold'}>Message</FormLabel>
              <Textarea
                rows={6}
                _focusVisible={{
                  borderColor: errors.message ? 'red' : 'green.300',
                }}
                {...register('message', { required: true })}
              />
            </FormControl>

            {(errors.name || errors.email || errors.message) && (
              <Text color={'red'}>Preencha os campos necessários...</Text>
            )}

            <Flex width={'100%'} justifyContent={'flex-end'}>
              <Button
                type="submit"
                variant={'primary'}
                _disabled={{
                  filter: 'brightness(0.9)',
                  cursor: 'not-allowed',
                }}
                _hover={{
                  bg: 'green.300',
                  filter: 'brightness(0.75)',
                }}
                isDisabled={isSubmitting || !isValid}
                isLoading={isSubmitting || isLoadingSubmit}>
                Send
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Absolute>
  );
}
