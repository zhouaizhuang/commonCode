// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
var generateParenthesis = function (n) {
  const res = []
  const dfs = (lRemain, rRemain, str) => { // 左右括号所剩的数量，str是当前构建的字符串
    if (str.length == 2 * n) { // 字符串构建完成
      return res.push(str)           // 加入解集，结束当前递归分支
    }
    if (lRemain > 0) {         // 只要左括号有剩，就可以选它，然后继续做选择（递归）
      dfs(lRemain - 1, rRemain, str + "(")
    }
    if (lRemain < rRemain) {   // 右括号比左括号剩的多，才能选右括号
      dfs(lRemain, rRemain - 1, str + ")") // 然后继续做选择（递归）
    }
  }
  dfs(n, n, "") // 递归的入口，剩余数量都是n，初始字符串是空串
  return res
}
console.log(generateParenthesis(2))
































