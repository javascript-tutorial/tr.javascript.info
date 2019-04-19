
function atemiz(dizi) {
  let map = new Map();

  for (let word of dizi) {
    let sorted = word.toLowerCase().split("").sort().join("");
    map.set(sorted, word);
  }

  return Array.from(map.values());
}