# uniapp技术调研：
##  优势：
##    1、适配多端，初期开发成本低
##  
##  劣势：
##    1、由于要做多端适配。uniapp现在现存的bug很多。github仓库上截止现在已解决2616个issue     未解决1001个issue未解决
##    2、复杂项目适配多端，一些地方技术无法在多端一致实现，这个功能是否放弃
##    3、有些uni无法实现的，就需要懂原生开发的技术，这点可能会导致一些问题无法解决
##    4、调头困难，如果后续开发了不少功能，采用的uniapp。某一些重要功能发现无法实现。是否放弃，回到原生小程序 + ios + 安卓开发。
##    5、app端性能不好，小程序端包体积明显偏大
##    6、版本之前兼容性差，每次升级uniapp，解决一些历史问题的同时，又有较大概率出现新的生产事故。但是不升级又无法解决原有bug
##    7、出现问题，很难找到解决方案。有的甚至官方直接说明无法解决
##    8、未来功能做多了之后。可能多端支持的收益已经难以覆盖，做兼容的成本。再换回原生，代价又会很高，会陷于两难
##    
##    
##    通常这种跨端，往往是让前端跨两个端： 小程序 + H5。这两个端的问题相对较少
##      因为这个是前端熟悉的技术栈。局部前端能为了适配，通过条件编译，搞出两套代码
##      但是app如果遇到uniapp提供的api搞不定的，往往需要ios+android开发插件辅助解决。无能为力
##    
##
##    1、uniapp问题太多
##    2、我们项目并非简单项目，未来必然要出现很多适配问题
##    3、出现原生app问题我们无法解决
        
        
      
# 跨端框架uniapp现存的问题： 
##    1、未解决的issue过多，且占比过高。uniapp的github仓库，未解决的问题有1001个，占全部已发现问题的约三分之一
##    2、版本之间兼容性差，为了解决历史问题，升级uniapp版本。但是又有较大概率出现新的生产事故
##    3、兼容多端的时候，前端懂H5、小程序，一定程度上可以写条件编译代码解决适配。但是安卓和ios前端不懂，无能为力
##    4、功能开发多了以后。多端适配花费的时间成本，可能已经超过了多端开发成本。这也就是为什么很多人只建议用uniapp开发简单应用
##    5、部分问题，由于多端无法统一，uniapp官方也给不出解决方案。直接告诉开发者这无法解决
##    6、如果已经开发了很久，此时出现一些必须实现的功能，多端无法支持。放弃uniapp，还是说放弃功能，让自己陷入两难
##    7、可以选择的第三方库，必须支持uniapp。否则跨端无从谈起