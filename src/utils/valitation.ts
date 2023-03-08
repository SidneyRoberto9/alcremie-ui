export function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === '' ||
    value === false ||
    value === 'undefined' ||
    value === 'null' ||
    value === ' '
  );
}
