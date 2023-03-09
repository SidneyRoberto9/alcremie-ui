import { useMediaQuery } from '@chakra-ui/react';
import { Barricade } from 'phosphor-react';

import { Absolute } from '../Absolute';
import { Screen } from './Screen';

export function InProgressScreen() {
  const [isLessThan800] = useMediaQuery('(max-width: 800px)');

  return (
    <Absolute>
      <Screen
        icon={<Barricade size={isLessThan800 ? 150 : 300} />}
        title={'In Progress...'}
      />
    </Absolute>
  );
}
