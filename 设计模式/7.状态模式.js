// 按照不同的状态来区分逻辑。能将复杂问题进行分解
// 场景：一个页面做个人业绩的展示。
// 需要展示：
// 如果用户在外边点击的是个人当月数据： 那么显示个人的数据当月的数据
// 如果是选择的截止当月个人数据展示，那么就需要展示截止当月的个人业绩数据
// 如果用户在外边点击的是公司的数据：那么这个页面要展示整个公司的数据
// 这个三种状态其实UI界面差不多。但是个人当月数据、截止当月数据、公司数据
// 需要展示的字段、已经状态颜色会有差异。

// 那么问题来了：
//   1、第一种就是做成一个整体，但是内部不一样的地方分别去判断，实现。
//   2、第二种做法:拆分成三个整体，每个整体对应一个状态

// 方案一：初始代码量少了。但是缺陷是，一旦未来需求增加，不同状态直接的差异之间加大。那么相关的判断代码增多，而且样式布局变得难以调整
// 方案二：初始代码量比较多。但是优点是：各个状态之间没有耦合，后续就算改动再大，这边的代码复杂度并不会显著增加。
// 举例： CRM小程序的首页的进去的业绩展示，采用的就是状态模式