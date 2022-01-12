/**
 * 《最接近的三数之和》
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 * 返回这三个数的和。
 * 假定每组输入只存在恰好一个解。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * @举例 nums = [-1,2,1,-4], target = 1  ----> 2   与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 * @举例 nums = [0,0,0], target = 1  ----> 0   与 target 最接近的和是 0 (0 + 0 + 0 = 0) 。
 * 
 */
var threeSumClosest = function(nums, target) {
  const len = nums.length
  if(len < 3) { return nums.reduce((prev, item) => prev+item, 0) }
  nums.sort((a, b) => a - b)
  let res = undefined
  for(let i = 0; i < len; i++) {
    let [left, right] = [i + 1, len - 1]
    while(left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if(sum === target) {
        return sum
      } else if(sum > target) {
        if(res === undefined) {
          res = sum
        } else if(Math.abs(sum - target) < Math.abs(res - target)){
          res = sum
        }
        right--
      } else {
        if(res === undefined) {
          res = sum
        } else if(Math.abs(sum - target) < Math.abs(res - target)){
          res = sum
        }
        left++
      }
    }
  }
  return res
}