function bucketSort(arr) {
  let res = arr.reduce((prev, item) => (prev[item]++ || (prev[item] = 1), prev), {})
  return Object.keys(res).reduce((prev, item) => [...prev, ...new Array(Number(res[item])).fill(Number(item))], [])
}
console.log(bucketSort([1, 8, 3, 6, 3, 5, 8, 3, 6, 2, 9, 0, 54]))
