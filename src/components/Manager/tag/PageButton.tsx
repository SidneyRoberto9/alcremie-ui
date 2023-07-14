import { PaginationPage } from '@ajna/pagination';

interface PageButtonProps {
  page: number;
}

export function PageButton({ page }: PageButtonProps) {
  return (
    <PaginationPage
      page={page}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'2rem'}
      minWidth={'2rem'}
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
      _current={{
        filter: 'brightness(0.5)',
      }}
    />
  );
}
