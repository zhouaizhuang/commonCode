
/**
 * 两数之和。leetcode 题号1
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 * @举例 twoSum([2,7,11,15], 9)  ---->  [0,1]  --->  因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
 * @举例 twoSum([3,2,4], 6)  ---->  [1,2]
 * @举例 twoSum([3,3], 6)  ---->  [0,1]
 */
// map标记数字下边，has判断是否原始数据
var twoSum = function (nums, target) {
  const len = nums.length
  const obj = nums.reduce((prev, item, index) => {
    prev.set(item, index)
    return prev
  }, new Map())
  // console.log(obj)
  for(let i = 0; i < len; i++) {
    const res = target - nums[i]
    if(obj.has(res) && i !== obj.get(res)) {
      return [i, obj.get(res)]
    }
  }
}
