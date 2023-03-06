import {
  Button,
  CircularProgress,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Check, Trash, X } from 'phosphor-react';

import { TagProps } from '../../@types/api/tag';
import { useTags } from '../../context/useTags';
import { Capitalize } from '../../utils/captalize';

interface TableDataProps {
  data: TagProps[];
}

export function TableTags({ data }: TableDataProps) {
  const { deleteTag, isLoading } = useTags();

  async function handleDeleteTagById(id: string) {
    await deleteTag(id);
  }

  return isLoading ? (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      padding={'3rem'}
      margin={'0 3rem'}
      bg={'gray.850'}
      borderRadius={'1rem'}
      height={'50vh'}
    >
      <CircularProgress isIndeterminate color={'green.300'} size={150} />
    </Flex>
  ) : (
    <TableContainer
      padding={'3rem'}
      margin={'0 3rem'}
      bg={'gray.850'}
      borderRadius={'1rem'}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color={'gray.450'}>Name</Th>
            <Th color={'gray.450'}>Description</Th>
            <Th color={'gray.450'}>NSFW</Th>
            <Th color={'gray.450'}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ id, name, description, is_nsfw }) => (
            <Tr key={id}>
              <Td>{Capitalize(name)}</Td>
              <Td>{description}</Td>
              <Td>
                <Button
                  isDisabled={true}
                  colorScheme={is_nsfw ? 'green' : 'orange'}
                  p={0}
                  _disabled={{
                    color: 'white',
                    cursor: 'initial',
                  }}
                >
                  {is_nsfw ? <Check size={20} /> : <X size={20} />}
                </Button>
              </Td>
              <Td>
                <Button
                  colorScheme={'red'}
                  p={0}
                  onClick={() => handleDeleteTagById(String(id))}
                >
                  <Trash size={24} />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
