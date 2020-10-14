// pages/transactions/transactions.js
const util = require('../../utils/util.js')
Page({

  /**
   * Page initial data
   */
  data: {
    transactions:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getTransactions();
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

  getTransactions: function() {
    const self = this;
    const url = 'https://samliweisen.herokuapp.com/api/transactions';
    util.wxRequest(url, 'POST',function(res) {
      console.log(res);
      if (res.statusCode == 200) {
        self.setData({transactions:res.data});
      } else {
        console.warn('Error');
      }
    });
  }
})