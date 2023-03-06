export function Capitalize(text: string) {
  return text.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
}
