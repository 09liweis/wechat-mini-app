const { wxRequest,DOUBAN_DETAIL,showLoading } = require('../../utils/util.js');
Page({

  /**
   * Page initial data
   */
  data: {
    loading: false,
    douban_id:'',
    casts:[],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let {douban_id} = options;
    this.setData({douban_id:douban_id || '26100958'});
    this.getCasts();
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

  getCasts:function() {
    const {douban_id} = this.data;
    const self = this;
    const url = DOUBAN_DETAIL + 'celebrities';
    showLoading();
    wxRequest(url,{method:'POST',data:{douban_id}},function(res) {
      const {statusCode,data} = res;
      console.log(statusCode, data);
      wx.hideLoading();
      if (statusCode == 200) {
        self.setData({casts:data.casts});
      }
    });
  }
})