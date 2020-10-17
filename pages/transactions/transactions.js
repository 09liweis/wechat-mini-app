// pages/transactions/transactions.js
const util = require('../../utils/util.js')
Page({

  /**
   * Page initial data
   */
  data: {
    date:'',
    transactions:[],
    total: 0
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
    this.getTransactions();
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

  handleTransactionsData: function() {
    const transactions = this.data.transactions;
    let total = 0;
    transactions.forEach(t => {
      total += Math.abs(t.price);
    });
    total = total.toFixed(2);
    this.setData({total});
  },

  getTransactions: function() {
    const self = this;
    wx.showLoading({
      title: '努力加载中',
    });
    const url = 'https://samliweisen.herokuapp.com/api/transactions';
    var opt = {
      method:'POST',
      date:this.data.date
    };
    util.wxRequest(url, opt,function(res) {
      wx.hideLoading();
      console.log(res);
      if (res.statusCode == 200) {
        self.setData({transactions:res.data});
        self.handleTransactionsData();
      } else {
        console.warn('Error');
      }
    });
  }
})