import { Tag, TagProps } from '../@types/api/tag';
import { SelectOption } from '../@types/gallery';
import { Capitalize } from './captalize';

export function createSelectOptionWithTags(
  data: Tag[] | TagProps[],
): SelectOption[] {
  return data.map((tag) => {
    return { value: String(tag.id), label: Capitalize(tag.name) };
  });
}
