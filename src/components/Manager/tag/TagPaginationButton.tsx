import React, { FC } from 'react';

import { ButtonProps, Button } from '@chakra-ui/react';

interface PaginationProps extends ButtonProps {
  label: string | number;
  component?: FC;
  named?: boolean;
}

export function TagPaginationButton({
  label,
  component,
  named = false,

  ...rest
}: PaginationProps) {
  if (component) {
    return (
      <Button
        as={component}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        width={named ? '5rem' : '2rem'}
        minWidth={named ? '5rem' : '2rem'}
        borderRadius={'4px'}
        height={'2rem'}
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
        {...rest}>
        {label}
      </Button>
    );
  }

  return (
    <Button
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={named ? '5rem' : '2rem'}
      minWidth={named ? '5rem' : '2rem'}
      borderRadius={'4px'}
      height={'2rem'}
      margin={'0.15rem 0.25rem'}
      fontSize={'0.9rem'}
      fontWeight={'500'}
      cursor={'pointer'}
      textTransform={'capitalize'}
      color={'white'}
      bg={'green.300'}
      transition={'filter 250ms ease-in-out'}
      _hover={{}}
      _disabled={{
        cursor: 'not-allowed',
        filter: 'brightness(0.5)',
      }}
      {...rest}>
      {label}
    </Button>
  );
}
