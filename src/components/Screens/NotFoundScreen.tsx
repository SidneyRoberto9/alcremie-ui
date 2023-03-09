import { useMediaQuery } from '@chakra-ui/react';
import { Warning } from 'phosphor-react';

import { Absolute } from '../Absolute';
import { Screen } from './Screen';

export function NotFoundScreen() {
  const [isLessThan800] = useMediaQuery('(max-width: 800px)');

  return (
    <Absolute>
      <Screen
        icon={<Warning size={isLessThan800 ? 150 : 300} />}
        title={'Page Not Found'}
      />
    </Absolute>
  );
}
