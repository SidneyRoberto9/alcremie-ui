import { Button, ButtonProps } from '@chakra-ui/react';

interface PaginationProps extends ButtonProps {
  label: string;
}

export function PaginationButton({ label, ...rest }: PaginationProps) {
  return (
    <Button
      width={'4.3rem'}
      minWidth={'4.3rem'}
      borderRadius={'4px'}
      height={'1.65rem'}
      margin={'0.15rem 0.25rem'}
      fontSize={'0.9rem'}
      fontWeight={'500'}
      cursor={'pointer'}
      textTransform={'capitalize'}
      color={'white'}
      bg={'green.300'}
      transition={'filter 250ms ease-in-out'}
      _hover={{
        filter: 'brightness(0.8)',
      }}
      _disabled={{
        cursor: 'not-allowed',
        filter: 'brightness(0.5)',
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}
