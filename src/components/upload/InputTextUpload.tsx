import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  useMediaQuery,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { UploadSchema } from './FormUpload';

interface InputTextUploadProps {
  register: UseFormRegister<UploadSchema>;
  name: 'source' | 'file' | 'nsfw' | `file.${string}`;
  label: string;
  placeholder: string;
}

export function InputTextUpload({
  register,
  label,
  name,
  placeholder,
}: InputTextUploadProps) {
  const [isLessThan680] = useMediaQuery('(max-width: 680px)');

  return isLessThan680 ? (
    <FormControl width={'100%'}>
      <FormLabel fontWeight={'bold'}>{label}</FormLabel>
      <Input
        _focusVisible={{
          borderColor: 'green.300',
        }}
        type="text"
        placeholder={placeholder}
        {...register(name)}
      />
    </FormControl>
  ) : (
    <InputGroup>
      <InputLeftAddon children={label} color={'gray.900'} fontWeight={'bold'} />
      <Input
        type="text"
        _focusVisible={{
          borderColor: 'green.300',
        }}
        placeholder={placeholder}
        {...register(name)}
      />
    </InputGroup>
  );
}
