export function cdn(id: string, width: number, height: number) {
  return `${id}${width}/${height}`;
}
