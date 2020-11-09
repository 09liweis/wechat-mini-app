// pages/visuals.js
const util = require('../../utils/util.js')
const DOUBAN_MOVIE_TAG = 'https://movie.douban.com/j/search_tags?type=movie&tag=热门&source=';
const DOUBAN_MOVIES = 'https://movie.douban.com/j/search_subjects?type=movie&tag=热门&sort=recommend&page_limit=20&page_start=0';
Page({

  /**
   * Page initial data
   */
  data: {
    visuals:[],
    page:1,
    limit:10,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getVisuals();
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
    this.setData({page:1});
    this.getVisuals();
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    this.setData({page:this.data.page+1});
    this.getVisuals();
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  toDetail: function(e) {
    const douban_id = e.currentTarget.dataset.doubanid;
    wx.navigateTo({
      url: '/pages/visualDetail/visualDetail?douban_id=' + douban_id,
    })
  },

  getVisuals: function() {
    let url = 'https://what-i-watched.herokuapp.com/api/visuals';
    const {page,limit} = this.data;
    url += `?page=${page}&limit=${limit}`;
    const self = this;
    util.wxRequest(url,{},function(res) {
      const {statusCode,data} = res;
      if (statusCode == 200) {
        let visuals = [];
        const results = data.results;
        console.log(results);
        if (page > 1) {
          visuals = self.data.visuals.concat(results);
        } else {
          visuals = results;
        }
        self.setData({visuals});
      }
    });
  }
})