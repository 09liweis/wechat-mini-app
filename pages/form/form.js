// pages/form/form.js
const app = getApp();
const api = app.globalData.api;
Page({

  /**
   * Page initial data
   */
  data: {
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    this.setEmptyTodo();
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  getEmptyTodo:function() {
    return {
      name: '',
      status: 'pending',
      date: '',
      steps: []
    };
  },
  setEmptyTodo:function() {
    const todo = this.getEmptyTodo();
    this.setData(todo);
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  submit:function() {
    const data = this.data;
    let todo = this.getEmptyTodo();
    for (let key in todo) {
      todo[key] = data[key];
    }
    console.log(todo);
    wx.request({
      url: api,
      data:todo,
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        wx.navigateBack({})
      }
    })
  }
})