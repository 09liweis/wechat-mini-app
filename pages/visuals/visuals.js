// pages/visuals.js
const {wxRequest} = require('../../utils/util.js')
const DOUBAN_MOVIES = 'https://samliweisen.herokuapp.com/api/visuals/douban';
const DOUBAN_TAGS = 'https://samliweisen.herokuapp.com/api/visuals/douban/tags';
Page({

  /**
   * Page initial data
   */
  data: {
    visuals:[],
    page:1,
    limit:30,
    tag:'sam',
    type:'movie',
    tags: ['sam'],
    sorts: [],
    sort: 'recommend'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getTags();
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

  changeType: function() {
    var {type,tag} = this.data;
    if (type == 'movie') {
      type = 'tv';
      tag = '热门';
    } else {
      type = 'movie';
      tag = 'sam';
    }
    this.setData({type,tag,page:1});
    this.getTags();
    this.getData();
  },

  getTags:function() {
    const {type} = this.data;
    const self = this;
    wxRequest(DOUBAN_TAGS,{method:'POST',data:{type}},function(res) {
      const {statusCode,data} = res;
      var {tags,sorts} = data;
      tags = ['sam'].concat(tags);
      self.setData({tags,sorts});
    });
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
  selectSort: function(e) {
    const {sort} = e.currentTarget.dataset;
    this.setData({sort,page:1});
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
    const {tag,page,limit,type,sort} = this.data;
    const self = this;
    self.showLoading();
    wxRequest(DOUBAN_MOVIES,{method:'POST',data:{sort,tag,page,limit,type}},function(res) {
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