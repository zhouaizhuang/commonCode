export default {
  install: function(Vue, options) {
    //注册全局过滤器
    Vue.filter("formatPhone", function(input) {
      if (input == "tel:undefined" || input == "tel:")
        return "tel:" + window.vueRoot.siteConfig.sitePhone;
      return input.replace(/\s?转\s?/g, ",");
    });
    Vue.filter("noStyle", function(input) {
      return input.replace(/style\s?=\s?["'][^<>]+["']/g, "");
    });
    Vue.filter("fixed2", function(input) {
      if (/\d+\.\d{3,}/.test(input)) return new Number(input).toFixed(2);
      else return input;
    });
    Vue.filter("clearZero", function(input) {
      let str = input + "";
      while (str.lastIndexOf("0") == str.length - 1 && str.indexOf(".") > -1) {
        str = str.substring(0, str.length - 1);
        if (str.indexOf(".") == str.length - 1) {
          str = str.substring(0, str.length - 1);
        }
      }
      return str;
    });
    Vue.directive("focus", {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function(el) {
        // 聚焦元素
        el.focus();
      }
    });
    //注册全局通用方法
    Vue.prototype.$initData = function(data) {
      for (let i in data) {
        this[i] = data[i];
      }
    };
    Vue.prototype.$copy = function(data) {
      return JSON.parse(JSON.stringify(data));
    };
    //array.find魅族浏览器报错，因此自己写一个
    Vue.prototype.$find = function(arr, key, value) {
      for (let i in arr) {
        let element = arr[i];
        if (element[key] == value) return element;
      }
      return {};
    };

    const errorHandler = (error, vm) => {
      console.error("抛出全局异常");
      console.error(vm);
      console.error(error);
      //page.showDialog('页面遇到一个错误：'+error);
    };
    Vue.config.errorHandler = errorHandler;
    Vue.prototype.$throw = error => errorHandler(error, this);
  }
};
