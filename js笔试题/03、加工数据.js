  /**
   * 需求：将用户的姓和名加工成完整的名字
   * 现在有一个数组，数组中姓名字段:name没数据，但是有他的姓和名单独的字段，分别是firstName和secondName
   * 请将这两个字段拼接好，并且去除多余的空格（备注：因为后台录入的时候多输入了空格）。拼接后的数据放到name字段中
   * 最后返回一个新的数组，这个数组的name是处理后的。
   * 举例
   * const arr = [
   *  {id:'1', name:'', firstName: '王 ', secondName: '大锤  '},
   *  {id:'5', name:'', firstName: ' 陈', secondName: ' 咬 金'},
   *  {id:'6', name:'', firstName: '茅  ', secondName: '十 八 '},
   * ]
   * 执行-----> connectName(arr)
   * 返回结果：[
   *  {id:'1', name:'王大锤', firstName: '王 ', secondName: '大锤  '},
   *  {id:'5', name:'陈咬金', firstName: ' 陈', secondName: ' 咬 金'},
   *  {id:'6', name:'茅十八', firstName: '茅  ', secondName: '十 八 '},
   * ]
   * @param {Array} arr 
   * @returns {Array}
   */
  function connectName(arr){
    // 此处编写实现
    // ...
    return newArr
  }







  /**
   * 初中级工程师。区分主要在于。是否使用es6语法，中级工程师代码会更简洁，初级会写的啰嗦
   * 能实现需求。但是代码复用价值为0
   * @param {*} arr 
   * @returns 
   */
  function connectName(arr){
    return arr.map(item => {
      const { firstName, secondName } = item
      item.name = (firstName + secondName).replace(/[ ]/g, '')
      return item
    })
  }
  /**
   * 中高级工程师
   * 能抽离出空格替换成任意字符串。其他业务中只要有用到空格替换成别的内容的就能用起来
   * @param {*} str 需要处理的字符串
   * @param {*} target 要替换成的目标字符串
   * @returns 
   */
  function replaceBlank(str = '', target = '') {
    return str.replace(/[ ]/g, target)
  }
  // 调用抽离的函数实现
  function connectName(arr){
    return arr.map(item => {
      const { firstName, secondName } = item
      item.name = replaceBlank(firstName + secondName)
      return item
    })
  }