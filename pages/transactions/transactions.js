// pages/transactions/transactions.js
const {wxRequest,getCurrentDate} = require('../../utils/util.js');
const API = 'https://samliweisen.herokuapp.com/api/transactions/';
Page({

  /**
   * Page initial data
   */
  data: {
    dateType:'month',
    dateTypes:['year','month','day'],
    date:'',
    page: 0,
    transactions:[],
    total: 0,
    hideFilters:true,
    categories:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const {date} = options;
    let currentDate = '';
    if (date) {
      currentDate = date;
    } else {
      const {year,month} = getCurrentDate();
      currentDate = `${year}-${month}`;
    }
    this.getCategories();
    this.setData({date:currentDate});
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
    let {transactions,page} = this.data;
    if (transactions.length == 10) {
      page += 1;
      this.setData({page});
      this.getTransactions();
    }
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    const date = this.data.date;
    let path = 'pages/transactions/transactions?';
    if (date) {
      path += `date=${date}`;
    }
    return {
      title: date,
      path,
      success: (res) => {
        console.log('success');
      },
      fail: (res) => {
        console.log('fail');
      }
    }
  },

  radioChange:function(e) {
    this.setData({dateType:e.detail.value});
  },

  getDateTime: function(e) {
    this.setData({date:e.detail.value});
    // this.getTransactions();
  },

  showFitlers: function() {
    this.setData({hideFilters:false});
  },

  cancel: function() {
    this.setData({hideFilters:true});
  },

  confirmFilters:function() {
    this.setData({page:0});
    this.getTransactions();
  },

  handleTransactionsData: function() {
    const transactions = this.data.transactions;
    let total = 0;
    transactions.forEach(t => {
      var price = Math.abs(t.price);
      if (t.price < 0) {
        t.priceType = 'credit';
        total += price;
      } else {
        t.priceType = 'debit';
      }
      t.price = price;
    });
    total = total.toFixed(2);
    this.setData({total,transactions});
  },

  getCategories: function() {
    const url = API + 'categories';
    const self = this;
    wxRequest(url,{},function(res) {
      const {statusCode, data} = res;
      if (statusCode == 200) {
        console.log(data);
      }
    });
  },

  getTransactions: function() {
    let {transactions,date,page} = this.data;
    const self = this;
    wx.showLoading({
      title: '努力加载中',
    });
    const url = 'https://samliweisen.herokuapp.com/api/transactions';
    var opt = {
      method:'POST',
      data: {
        date,
        limit:'all',
        page
      }
    };
    wxRequest(url, opt,function(res) {
      wx.hideLoading();
      self.setData({hideFilters:true});
      if (res.statusCode == 200) {
        if (page > 0) {
          transactions = transactions.concat(res.data);
        } else {
          transactions = res.data;
        }
        self.setData({transactions});
        self.handleTransactionsData();
      } else {
        console.warn('Error');
      }
    });
  }
})