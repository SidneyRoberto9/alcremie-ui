import { useRouter } from 'next/router';

import { Tooltip, ButtonProps, Button } from '@chakra-ui/react';

interface TagButtonProps extends ButtonProps {
  tooltipLabel: string;
  tag: string;
  name: string;
  noLabel?: boolean;
}

export function TagButton({ tooltipLabel, tag, name, noLabel = false, ...rest }: TagButtonProps) {
  const router = useRouter();

  function handleNavigateToTag() {
    router.push(`/recent?include_tags=${tag.split(' ')[0]}`);
  }

  return noLabel ? (
    <Button
      {...rest}
      onClick={handleNavigateToTag}
      textTransform={'capitalize'}
      variant={'outline'}
      _hover={{
        bg: 'white',
        color: 'gray.750',
      }}>
      {name}
    </Button>
  ) : (
    <Tooltip
      hasArrow
      label={tooltipLabel}
      padding={'1.5rem'}
      placement={'top'}
      bg={'white'}
      color={'gray.750'}>
      <Button
        {...rest}
        onClick={handleNavigateToTag}
        textTransform={'capitalize'}
        variant={'outline'}
        _hover={{
          bg: 'white',
          color: 'gray.750',
        }}>
        {name}
      </Button>
    </Tooltip>
  );
}
