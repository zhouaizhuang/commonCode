/**最长的回文子串
 * @描述 给你一个字符串 s，找到 s 中最长的回文子串。
 * @param {string} s
 * @return {string}
 * @举例 longestPalindrome('babad') ---> 'bab'    |   'aba'
 * @举例 longestPalindrome('cbbd') ---> 'bb'
 * @举例 longestPalindrome('ac') ---> 'a'
 */
// 方法一：
function longestPalindrome(s) {
  let [len, res] = [s.length, ''] // 字符串长度、最终返回的结果
  const palindrome = (str, left, right) => { // 完美解回文函数
    while(left >= 0 && right < len && str[left] === str[right]) {
      left--
      right++
    }
    return str.substr(left + 1, right - left -1)
  }
  for(let i = 0; i < len; i++) {
    let s1 = palindrome(s, i, i)
    let s2 = palindrome(s, i, i+1)
    if(s1.length > res.length) { res = s1 }
    if(s2.length > res.length) { res = s2 }
  }
  return res
}

// 方法二：
function longestPalindrome2(s) {
  let strArr = s.split('')
  const len = strArr.length
  let res = [strArr[0]]
  for(let i = 0; i < len - 1; i++) {
      let tmpRes = [strArr[i]]
      let [left, right] = [i-1, i+1]
      while(strArr[right] === strArr[i]) { // 如果是重复数据，继续向后找
          tmpRes.push(strArr[right] )
          right++
      }
      while(left >= 0 && right < len) { // 如果开始非重复，从两边扩散
          if(strArr[left] === strArr[right]) {
              tmpRes = [strArr[left], ...tmpRes, strArr[right]]
          } else {
            break
          }
          left--
          right++
      }
      if(tmpRes.length > res.length) {
          res = tmpRes
      }
  }
  return res.join('')
};
console.log(longestPalindrome2("babad"))


