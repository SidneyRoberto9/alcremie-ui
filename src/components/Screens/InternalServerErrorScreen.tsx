import { useMediaQuery } from '@chakra-ui/react';
import { CloudSlash } from 'phosphor-react';

import { Absolute } from '../Absolute';
import { Screen } from './Screen';

export function InternalServerErrorScreen() {
  const [isLessThan800] = useMediaQuery('(max-width: 800px)');

  return (
    <Absolute>
      <Screen
        icon={<CloudSlash size={isLessThan800 ? 150 : 300} />}
        title={'Internal Server Error'}
      />
    </Absolute>
  );
}
