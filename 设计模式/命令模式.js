// 出拳
const fist = {
  execute(){
    console.log('出拳')
  }
}
// 跳跃
const jump = {
  execute(){
    console.log('跳跃')
  }
}
// 踢
const leg = {
  execute(){
    console.log('踢')
  }
}
// 玩游戏
const playGame = function (){
  return {
    command: [],
    add: function (val){
      this.command.push(val)
    },
    execute: function (){
      this.command.forEach(item => item.execute())
    }
  }
}
// 我的游戏
const myGame = playGame()
myGame.add(fist)
myGame.add(jump)
myGame.add(leg)
myGame.execute()