export default function(level) {
  const min = Math.floor(level * 2 / 3);
  const max = Math.floor(level * 3 / 2);
  return {min, max};
}
