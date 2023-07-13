import { UseFormRegister } from 'react-hook-form';

import {
  InputLeftAddon,
  InputGroup,
  Input,
  FormLabel,
  FormControl,
  useMediaQuery,
} from '@chakra-ui/react';

import { UploadSchemaKeys, UploadSchema } from './FormUpload';

interface InputFileUploadProps {
  register: UseFormRegister<UploadSchema>;
  name: UploadSchemaKeys;
  label: string;
}

export function InputFileUpload({ register, label, name }: InputFileUploadProps) {
  const [isLessThan680] = useMediaQuery('(max-width: 680px)');

  return isLessThan680 ? (
    <FormControl width={'100%'}>
      <FormLabel fontWeight={'bold'}>{label}</FormLabel>
      <Input
        padding={'0.45rem 1rem'}
        accept="image/*"
        type="file"
        {...register(name, { required: true })}
      />
    </FormControl>
  ) : (
    <InputGroup>
      <InputLeftAddon children={label} color={'gray.900'} fontWeight={'bold'} />
      <Input
        padding={'0.45rem 1rem'}
        accept="image/*"
        type="file"
        {...register(name, { required: true })}
      />
    </InputGroup>
  );
}
