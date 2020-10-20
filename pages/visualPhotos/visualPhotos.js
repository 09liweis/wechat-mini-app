// pages/visualPhotos/visualPhotos.js
const { wxRequest } = require('../../utils/util.js');
const DOUBAN_DETAIL = 'https://samliweisen.herokuapp.com/api/visuals/';
Page({

  /**
   * Page initial data
   */
  data: {
    douban_id:'',
    photos:[],
    page:1
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let {douban_id} = options;
    this.setData({douban_id:douban_id || '26100958'});
    this.getPhotos();
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
  getPhotos: function() {
    const {douban_id} = this.data;
    const url = DOUBAN_DETAIL + 'photos';
    const self = this;
    const data = {douban_id}
    wxRequest(url,{method:'POST',data}, function(res) {
      wx.hideLoading();
      const {statusCode,data} = res;
      console.log(statusCode,data);
      if (statusCode == 200) {
        self.setData({photos:data.photos});
        console.log(self.data.photos);
      }
    })
  }
})