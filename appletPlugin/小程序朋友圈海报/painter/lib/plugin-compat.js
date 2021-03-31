module.exports = {
  getApp() {
    let systemInfo = wx.getSystemInfoSync();
    return {
      systemInfo
    }
  }
}
