var googleMap = {
  show: function () {
    console.log('googleMap show!')
  }
}
var baiduMap = {
  display: function () {
    console.log('baiduMap show!')
  }
}
var renderMap = function (map) {
  (map.show instanceof Function) && map.show()
}
var baiduMapAdapter = {
  show: function(){
    return baiduMap.display()
  }
}
renderMap(googleMap)
renderMap(baiduMapAdapter)
