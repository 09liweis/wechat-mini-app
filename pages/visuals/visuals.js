// pages/visuals.js
const util = require('../../utils/util.js')
Page({

  /**
   * Page initial data
   */
  data: {
    visuals:[],
    page:1,
    limit:10,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getVisuals();
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

  getVisuals: function() {
    let url = 'https://what-i-watched.herokuapp.com/api/visuals';
    const {page,limit} = this.data;
    url += `?page=${page}&limit=${limit}`;
    const self = this;
    util.wxRequest(url,{},function(res) {
      const {statusCode,data} = res;
      if (statusCode == 200) {
        self.setData({visuals:data.results});
      }
    });
  }
})