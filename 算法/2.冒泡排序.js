function BubblingSort(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
console.log(BubblingSort([6, 2, 1, 5, 2, 8, 23, 8, 39, 32, 19, 54]))
