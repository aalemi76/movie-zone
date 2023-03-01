/**
 * @param {any[]} items
 * @param {number} pageNumber
 * @param {number} pageSize
 * @returns {any[]}
 */

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex =
    pageNumber * pageSize <= items.length
      ? pageNumber * pageSize
      : items.length;
  return items.slice(startIndex, endIndex);
}
