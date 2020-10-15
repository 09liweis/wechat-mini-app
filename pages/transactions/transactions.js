// pages/transactions/transactions.js
const util = require('../../utils/util.js')
Page({

  /**
   * Page initial data
   */
  data: {
    date:'',
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

  getDateTime: function(e) {
    this.setData({date:e.detail.value});
    this.getTransactions();
  },

  getTransactions: function() {
    const self = this;
    console.log(this.data.date);
    const url = 'https://samliweisen.herokuapp.com/api/transactions';
    var opt = {
      method:'POST',
      date:this.data.date
    };
    util.wxRequest(url, opt,function(res) {
      console.log(res);
      if (res.statusCode == 200) {
        self.setData({transactions:res.data});
      } else {
        console.warn('Error');
      }
    });
  }
})