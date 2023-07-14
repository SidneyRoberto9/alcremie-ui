import { useContextSelector } from 'use-context-selector';
import AsyncSelect from 'react-select/async';

import { api } from '@/server/api';

import { createSelectOptionWithTags } from '../../utils/create-select-option';
import { selectTagStyle } from '../../styles/react-select-tag';
import { galleryContext } from '../../context/useGallery';
import { SelectOption, GetGalleryDataParams } from '../../@types/gallery';

export function FilterTags() {
  const filterData = useContextSelector(galleryContext, ({ filterData }) => filterData);

  async function handleChange(props: any) {
    const value = props?.value || false;
    const label = props?.label || false;

    const isFilter = {
      isAll: label === 'All' || value === '0',
      isNsfw: label === 'NSFW' || value === '1',
      isTag: value != '0' && value != '1',
    };

    const params: GetGalleryDataParams = {
      all: isFilter.isAll ? true : false,
      is_nsfw: isFilter.isNsfw ? true : false,
      included_tags: isFilter.isTag ? label.toLowerCase() : '',
    };

    filterData(0, params);
  }

  async function optionsFromApi(inputValue: string) {
    const { data } = await api.get(`/tag/search?text=${inputValue}`);

    const options: SelectOption[] = [
      { value: '0', label: 'All' },
      { value: '1', label: 'NSFW' },
      ...createSelectOptionWithTags(data.tags),
    ];

    return options;
  }

  return (
    <AsyncSelect
      id={'select-box'}
      instanceId={'select-box'}
      styles={selectTagStyle}
      onChange={handleChange}
      isClearable={true}
      cacheOptions
      defaultOptions
      loadOptions={optionsFromApi}
    />
  );
}
