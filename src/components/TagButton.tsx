import { Button, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface TagButtonProps {
  tooltipLabel: string;
  tag: string;
}

export function TagButton({ tooltipLabel, tag }: TagButtonProps) {
  const router = useRouter();

  function handleNavigateToTag() {
    router.push(`/recent?include_tags=${tag}`);
  }

  return (
    <Tooltip
      hasArrow
      label={tooltipLabel}
      padding={'1.5rem'}
      placement={'top'}
      bg={'white'}
      color={'gray.750'}
    >
      <Button
        onClick={handleNavigateToTag}
        textTransform={'capitalize'}
        variant={'outline'}
        _hover={{
          bg: 'white',
          color: 'gray.750',
        }}
      >
        {tag}
      </Button>
    </Tooltip>
  );
}
