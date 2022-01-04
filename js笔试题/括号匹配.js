/**
 * 给定一个字符串，字符串只能由 '[', ']', '(', ')', '{', '}'构成，判断字符串是否有效
 * 有效字符串需要满足以下条件：
 * 1、左括号，必须和同类型的右括号匹配
 * 2、左括号必须以正确的顺序闭合
 * @举例 输入'()'  ---->  true
 * @举例 输入'()[]{}'  ---->  true
 * @举例 输入'(]'  ---->  false
 * @举例 输入'([)]'  ---->  false
 * @举例 输入'{()}'  ---->  true
 */

// 我的答案
function checkStr(str){
  let strArr = str.split('')
  if(strArr.length % 2 !== 0) { return false }
  const mapStr = {
    ')': '(',
    '}': '{',
    ']': '[',
  }
  let temp = []
  while(strArr.length) {
    const head = strArr.shift()
    temp.length > 0 && temp.at(-1) === mapStr[head] ? temp.pop() : temp.push(head)
  }
  return temp.length === 0
}
console.log(checkStr('{[](){}}'))