// 核心： Vuex就是中介者模式的运用
// 所有对象只需要跟中介者通信就能知道数据的状态。

// 场景：航线上的飞机，只需要和机场的塔台通信，就能知道航线和飞行状态。而不徐亚和所有飞机通信一遍
// 同时塔台作为中介者，知道每架没记的飞行状态，所以可以安排飞机的起降和航线安排