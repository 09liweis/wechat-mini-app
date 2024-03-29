const { wxRequest } = require('../../utils/util.js');
const DOUBAN_DETAIL = 'https://samliweisen.onrender.com/api/movies/douban/';
// pages/visualDetail/visualDetail.js
Page({

  /**
   * Page initial data
   */
  data: {
    douban_id:'',
    v:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let {douban_id} = options;
    this.setData({douban_id:douban_id || '27073752'});
    this.getVisualDetail();
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
  showLoading: function() {
    wx.showLoading({
      title: '加载数据中(^ o ^)',
    });
  },
  openCasts: function() {
    const {douban_id} = this.data;
    wx.navigateTo({
      url: '/pages/visualCasts/visualCasts?douban_id=' + douban_id,
    })
  },
 
  getVisualDetail: function() {
    const {douban_id} = this.data;
    const url = DOUBAN_DETAIL+douban_id;
    const self = this;
    this.showLoading();
    wxRequest(url,{method:'GET',data:{}},function(err,res){
      wx.hideLoading();
      const {statusCode,data} = res;
      if (statusCode == 200) {
        self.setData({v:data});
        wx.setNavigationBarTitle({
          title: data.title,
        });
      }
    });
  }
})