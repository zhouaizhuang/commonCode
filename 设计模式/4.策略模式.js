//原始代码缺陷
// 1、函数庞大 
// 2、缺乏弹性，如果增加一种新的绩效等级C,或者改变绩效S的奖金系数就必须深入这个函数实现
// 3、算法复用性差，如果其他地方也需要重用这些计算奖金的方法，选择则只有赋值粘贴
function rewardCalc(level, salary){
  if(level === 'S') {
    return salary * 4
  } else if(level === 'A') {
    return salary * 3
  } else if(level === 'B') {
    return salary * 2
  }
}
computeMoney('B', 20000)



// ==============>改造============>
const funcA = salary => salary * 4
const funcB = salary => salary * 3
const funcC = salary => salary * 2
function computeMoney(level, salary) {
  const funcByLevel= {
    A: funcA,
    B: funcB,
    C: funcC,
  }
  return funcByLevel[level](salary)
}
computeMoney('S', 1000) // 4000