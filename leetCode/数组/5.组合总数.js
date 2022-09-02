/**
 * 组合总数
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * @举例 candidates = [2,3,6,7], target = 7   ---->  [[2,2,3],[7]]   2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。 7 也是一个候选， 7 = 7 。
 * @举例 candidates = [2,3,5], target = 8   ---->   [[2,2,2,2],[2,3,3],[3,5]]
 */
var combinationSum = function(candidates, target) {
  const backtracking = function (j, sum) {
    if (sum > target) return;
    if (sum === target) {
      res.push(Array.from(path))
      return
    }
    for(let i = j; i < candidates.length; i++ ) {
      const n = candidates[i]
      if(n > target - sum) continue
      path.push(n)
      sum += n
      backtracking(i, sum)
      path.pop()
      sum -= n
    }
  }
  const res = [], path = []
  candidates.sort() // 排序
  backtracking(0, 0)
  return res
  
};