import { Capitalize } from '@/utils/captalize';
import { SelectOption } from '@/@types/gallery';
import { TagProps, Tag } from '@/@types/api/tag';

export function createSelectOptionWithTags(data: Tag[] | TagProps[]): SelectOption[] {
  return data.map((tag) => {
    return { value: String(tag.id), label: Capitalize(tag.name) };
  });
}
