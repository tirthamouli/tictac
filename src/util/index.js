/**
 * Get a random item from a set
 *
 * @param {Set<string>} set
 * @returns {string}
 */
export const getRandomItemFromSet = (set) => {
  const items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
};
