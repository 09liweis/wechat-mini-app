// pages/detail/detail.js
const app = getApp();
const api = app.globalData.api;
Page({

  /**
   * Page initial data
   */
  data: {
    todo:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const id = options.id;
    const self = this;
    wx.request({
      url: api+id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        self.setData({ todo: res.data });
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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
  editTodo:function(e) {
    const todo = e.currentTarget.dataset.todo;
    wx.navigateTo({
      url: '/pages/form/form?id=' + todo._id,
    })
  },
  delTodo: function (e) {
    const todo = e.currentTarget.dataset.todo;
    wx.request({
      url: api+todo._id,
      method:'DELETE',
      success(res) {
        wx.navigateBack({});
      }
    })
  }
})