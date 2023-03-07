import { Box } from '@chakra-ui/react';
import reactSelect from 'react-select';
import { useContextSelector } from 'use-context-selector';

import { GetGalleryDataParams, SelectOption } from '../../@types/gallery';
import { galleryContext } from '../../context/useGallery';
import { useTags } from '../../context/useTags';

export function FilterTags() {
  const getGalleryData = useContextSelector(
    galleryContext,
    ({ getGalleryData }) => getGalleryData,
  );
  const { data } = useTags();

  const options: SelectOption[] = data.map((tag) => {
    return { value: tag.id, label: tag.name };
  });

  options.push({ value: 0, label: 'All' });
  options.push({ value: 1, label: 'NSFW' });

  async function handleChange(props: any) {
    const value = props?.value || false;
    const label = props?.label || false;

    const isFilter = {
      isAll: value === 0 || value === '0',
      isNsfw: value === 1 || value === '1',
      isTag: value != 0 && value != 1 && value != '0' && value != '1',
    };
    console.log(isFilter);

    const params: GetGalleryDataParams = {
      all: isFilter.isAll ? true : false,
      is_nsfw: isFilter.isNsfw ? true : false,
      included_tags: isFilter.isTag ? label : '',
    };

    await getGalleryData(0, params);
  }

  return (
    <Box
      id={'select-box'}
      instanceId={'select-box'}
      as={reactSelect}
      display={'inline-block'}
      color={'gray.900'}
      w={'12rem'}
      p={'0.44rem'}
      onChange={handleChange}
      isClearable={true}
      options={options}
    />
  );
}
