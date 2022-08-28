// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
  const mapNum = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  }
  let arr = digits.split('').map(v => mapNum[v])
  return arr.reduce((prev, item) => {
    if(prev.length === 0) { return item }
    return prev.reduce((p, c) => (item.forEach(m => p = [...p, c + m]), p), [])
  }, [])
};