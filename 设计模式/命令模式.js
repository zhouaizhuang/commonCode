const ruy = {
  attack: function (){console.log('攻击')},
  defense: function (){console.log('防御')},
  jump: function (){console.log('跳跃')},
  crouch: function (){console.log('蹲下')},
}
const makeCommand = function (receiver, state) {
  return function (){ receiver[state]() }
}
var commands = {'119': 'jump','115': 'crouch','97': 'defense','100': 'attack'}
var commandStack= []
document.onKeypress = function (e) {
  var keyCode = e.keyCode
  var command = ruy[commands[keyCode]]
  if(command){
    command(); // 执行命令
    commandStack.push(command) // 将执行的命令保存到堆栈
  }
}
document.getElementById('repay').onclick = function () { // 播放录像
  var command = null
  while(command = commandStack.shift()){ command() } // 从堆栈中依次去除命令并执行
}



// =============宏命令===========
var closeDoorCommand = { execute: function () {console.log('关门')} }
var openPcCommand = { execute: function () {console.log('开电脑')} }
var openQQCommand = { execute: function () {console.log('登陆QQ')} }
var MacroCommand = function () {
  return {
    commandsList: [],
    add: function(command){this.commandsList.push(command)},
    execute: function (){
      this.commandsList.forEach(item => item.execute())
    }
  }
}
var macroCommand = MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQCommand)
macroCommand.execute()