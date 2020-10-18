const { wxRequest } = require('../../utils/util.js');
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
    this.setData({douban_id:douban_id || '26100958'});
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
  getVisualDetail: function() {
    const {douban_id} = this.data;
    const url = 'https://samliweisen.herokuapp.com/api/visuals/summary';
    const self = this;
    wx.showLoading({
      title: '加载数据中(^ o ^)',
      mask:true
    });
    wxRequest(url,{method:'POST',data:{douban_id}},function(res){
      wx.hideLoading();
      const {statusCode,data} = res;
      if (statusCode == 200) {
        console.log(data);
        self.setData({v:data});
      }
    });
  }
})