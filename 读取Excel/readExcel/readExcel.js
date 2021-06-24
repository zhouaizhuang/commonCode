const fs = require('fs')
//const path = require('path')
const nodeXlsx = require('node-xlsx')	//引用node-xlsx模块

//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet)
const ex1 = nodeXlsx.parse("./test.xls")	//读取excel表格

let excel_content = ex1[0].data	//取出excel文件中的第一个工作表中的全部数据

excel_content.splice(0,1)	//一般来说表中的第一条数据可能是标题没有用，所以删掉

//console.log(excel_content)	//查
//excel_content = excel_content.slice(0, 2)
excel_content = excel_content.map(item => {
  const answer = item.pop()
  let [question, ...options] = item
  /*str = question.slice(0, -1) + (question.slice(-1) !== '。' ?  '？' : '。')
  if(['.', '。'].includes(question.slice(-1))) {
    str = question.slice(0, -1) + '？'
  } else {
    str += '？'
  }*/
  options = options.map((item, index)=> {
    const answerArr = ['A','B','C','D','E','F','G','H','I','J']
    return {
      label: answerArr[index],
      desc: item
    }
  }).filter(v => Boolean(v.desc))
  return { question, answer, options }
}).filter(item => item.question && item.options.length)


console.log(JSON.stringify(excel_content))


//let file = path.resolve(__dirname, './file.txt')
//let data = {
//    a: 1
//}
// 异步写入数据到文件
fs.writeFile('./test.txt', JSON.stringify(excel_content, null, 2), { encoding: 'utf8' }, err => {})

