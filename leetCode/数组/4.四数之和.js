/**
 * leetcode 题号18
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
 var fourSum = function(nums, target) {
  const len = nums.length
  if(len < 4) { return [] }
  nums = nums.sort((a, b) => a - b)
  let result = []
  for(let i = 0; i < len - 3; i++) {
    if(i > 0 && nums[i] === nums[i-1]) { continue } // 从左往右有重复的，去重
    // if(nums[i] + nums[i+1] + nums[i+3] + nums[i+4] > target) {break}
    // if(nums[i] + nums[len - 3] + nums[len -2] + nums[len -1] < target) {continue}
    for(let j = i+1; j < len - 2; j++) {
      if(j > i+1 && nums[j] === nums[j - 1]) {continue} // 从右往左有重复的，去重
      let [x1, x2] = [j + 1, len -1]
      while(x1 < x2) {
        const sum = nums[i] + nums[j] + nums[x1] + nums[x2]
        // console.log(nums[i])
        // console.log(nums[j])
        // console.log(nums[x1])
        // console.log(nums[x2])
        if(sum === target) {
          result.push([nums[i], nums[j], nums[x1], nums[x2]])
          while(x1 < x2 && nums[x1] === nums[x1 + 1]) { x1++ }
          while(x1 < x2 && nums[x2] === nums[x2 - 1]) { x2-- }
          x1++
          x2--
        } else if(sum < target){
          x1++
        } else {
          x2--
        }
      }
    }
  }
  return [...new Set(result.map(item => item.join(',')))].map(item => item.split(',').map(Number))
 }