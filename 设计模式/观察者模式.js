// Subject 对象
function Subject(){
  this.observers = [];
}
Subject.prototype = {
  add(observer){  // 添加
    this.observers.push(observer);
  },
  notify(){  // 通知
    var observers = this.observers;
    for(var i = 0;i < observers.length;i++){
      observers[i].update();
    }
  },
  remove(observer){  // 删除
    var observers = this.observers;
    for(var i = 0;i < observers.length;i++){
      if(observers[i] === observer){
        observers.splice(i,1);
      }
    }
  },
}

// Observer 对象
function Observer(name){
  this.name = name;
}
Observer.prototype = {
  update(){  // 更新
    console.log('my name is '+this.name);
  }
}

var sub = new Subject();
var obs1 = new Observer('ttsy1');
var obs2 = new Observer('ttsy2');
sub.add(obs1);
sub.add(obs2);
sub.notify();  //my name is ttsy1、my name is ttsy2
