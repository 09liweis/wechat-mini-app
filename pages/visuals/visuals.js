// pages/visuals.js
const {wxRequest} = require('../../utils/util.js')
const DOUBAN_MOVIE_TAG = 'https://movie.douban.com/j/search_tags?type=movie&tag=热门&source=';
const DOUBAN_MOVIES = 'https://samliweisen.herokuapp.com/api/visuals/douban';
Page({

  /**
   * Page initial data
   */
  data: {
    visuals:[],
    page:1,
    limit:30,
    tag:'sam',
    tags: [
      'sam',
      '热门',
      '最新',
      '豆瓣高分',
      '冷门佳片',
      '华语',
      '欧美',
      '韩国',
      '日本'
    ]
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
    this.getData();
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    this.setData({page:this.data.page+1});
    this.getData()
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  getData: function() {
    const {tag} = this.data;
    if (tag != 'sam') {
      this.getDoubans();
    } else {
      this.getVisuals();
    }
  },

  selectTag: function(e) {
    const {tag} = e.currentTarget.dataset;
    this.setData({tag,page:1});
    wx.pageScrollTo({
      scrollTop:0,
      duration: 0,
    })
    this.getData();
  },
  showLoading: function() {
    wx.showLoading({
      title: '努力加载中',
    });
  },
  hideLoading: function() {
    wx.hideLoading();
  },

  getDoubans:function() {
    const {tag,page,limit} = this.data;
    const self = this;
    self.showLoading();
    console.log(page,limit);
    wxRequest(DOUBAN_MOVIES,{method:'POST',data:{tag,page,limit}},function(res) {
      const {statusCode,data} = res;
      self.hideLoading();
      if (statusCode == 200) {
        let visuals = [];
        const results = data.visuals;
        if (page > 1) {
          visuals = self.data.visuals.concat(results);
        } else {
          visuals = results;
        }
        self.setData({visuals});
      }
    });
  },

  getVisuals: function() {
    let url = 'https://what-i-watched.herokuapp.com/api/visuals';
    const {page,limit} = this.data;
    url += `?page=${page}&limit=${limit}`;
    const self = this;
    self.showLoading();
    wxRequest(url,{},function(res) {
      const {statusCode,data} = res;
      self.hideLoading();
      if (statusCode == 200) {
        let visuals = [];
        const results = data.results;
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