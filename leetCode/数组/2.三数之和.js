/**
 * 三数之和
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
 * 答案中不可以包含重复的三元组
 * @param {number[]} nums
 * @return {number[][]}
 * @举例 nums = [-1,0,1,2,-1,-4]  ---->  [[-1,-1,2],[-1,0,1]]
 */
 var threeSum = function(nums) {
  nums.sort((a, b) => a - b)
  let [result, len] = [[], nums.length]
  for(let i = 0; i < len - 2; i++) {
    while(i > 0 && nums[i] === nums[i-1]) {i++}
    let [x1, x2] = [i + 1, len - 1]
    while(x1 < x2) {
      const sum = nums[i] + nums[x1] + nums[x2]
      if(sum === 0) {
        result.push([nums[i], nums[x1], nums[x2]])
        while(x1 < x2 && nums[x1] === nums[x1 + 1]) {x1++} 
        while(x1 < x2 && nums[x2] === nums[x2 - 1]) {x2--} 
        x1++
        x2--
      } else if(sum > 0) {
        x2--
      } else {
        x1++
      }
    }
  }
  return result
}