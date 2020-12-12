const { wxRequest,DOUBAN_DETAIL,showLoading } = require('../../utils/util.js');
Page({

  /**
   * Page initial data
   */
  data: {
    cast_id:'',
    cast:null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let {cast_id} = options;
    this.setData({cast_id:cast_id || '1054453'});
    this.getCast();
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
  getCast:function() {
    const {cast_id} = this.data;
    const self = this;
    const url = DOUBAN_DETAIL + 'cast';
    showLoading();
    wxRequest(url,{method:'POST',data:{cast_id}},function(res) {
      const {statusCode,data} = res;
      console.log(data);
      wx.hideLoading();
      if (statusCode == 200) {
        self.setData({cast:data});
      }
    });
  },
})