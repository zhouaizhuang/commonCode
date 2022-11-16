/**
 * 快速排序算法
 * @param {*} arr 需要排序的数组 
 * @returns 
 */
function quickSort (arr) {
  if (arr.length <= 1) { return arr }
  const [x0, ...xn] = arr
  let [left, right] = [[], []]
  xn.forEach(item => item < x0 ? left.push(item) : right.push(item))
  return [...quickSort(left), x0, ...quickSort(right)]
}
console.log(quickSort([6, 2, 1, 5, 2, 8, 23, 8, 39, 32, 19, 54]))
