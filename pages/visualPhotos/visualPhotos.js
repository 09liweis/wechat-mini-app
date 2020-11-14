// pages/visualPhotos/visualPhotos.js
const { wxRequest,DOUBAN_DETAIL,showLoading } = require('../../utils/util.js');
Page({

  /**
   * Page initial data
   */
  data: {
    douban_id:'',
    photos:[],
    types:[],
    type: 'S',
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
    this.setData({page:this.data.page+1});
    this.getPhotos();
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  selectType:function(e) {
    const {type} = e.currentTarget.dataset;
    this.setData({type,page:1});
    wx.pageScrollTo({
      scrollTop:true,
      duration: 0,
    })
    this.getPhotos();
  },

  getPhotos: function() {
    const {douban_id,page,type} = this.data;
    const url = DOUBAN_DETAIL + 'photos';
    const self = this;
    const data = {douban_id,page,type};
    showLoading();
    wxRequest(url,{method:'POST',data}, function(res) {
      wx.hideLoading();
      const {statusCode,data} = res;
      console.log(statusCode,data);
      if (statusCode == 200) {
        const {title,photos,types,type} = data;
        wx.setNavigationBarTitle({
          title: title,
        });
        let currentPhotos = self.data.photos;
        if (page > 1) {
          currentPhotos = currentPhotos.concat(photos);
        } else {
          currentPhotos = photos;
        }
        self.setData({photos:currentPhotos,types,type});
      }
    })
  }
})