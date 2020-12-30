// pages/user/index.js
const {wxRequest,getStorage,showLoading} = require('../../utils/util.js');
const API = 'https://samliweisen.herokuapp.com/api/user/';
Page({

  /**
   * Page initial data
   */
  data: {
    user:{
      eml:'',
      pwd:'',
      nm:''
    },
    err:'',
    isLogin: true,
    hasLogin: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.drawCanvas();
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    if (getStorage('auth-token')) {
      this.setData({hasLogin:true});
      this.getDetail();
    }
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
    this.getDetail();
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
  drawCanvas: function() {
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.setFillStyle('red');
    // ctx.fillRect(10, 10, 150, 75);
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(50,300);
    ctx.lineTo(300,100);
    ctx.lineTo(300,250);
    ctx.closePath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'aqua';
    ctx.lineWidth = 20;
    ctx.stroke();
  },

  getDetail: function() {
    const url = API + 'detail';
    const self = this;
    wxRequest(url,{method:'POST'},function(res) {
      const {statusCode,data} = res;
      self.setData({user:data.user,hasLogin:true});
    });
  },

  logout: function() {
    wx.setStorageSync('auth-token', '');
    this.setData({hasLogin:false,user:{eml:'',pwd:''}});
  },

  handleInput: function(e) {
    const val = e.detail.value;
    const key = e.currentTarget.id;
    let user = this.data.user;
    user[key] = val;
    this.setData(user);
  },

  login: function() {
    const {user,isLogin} = this.data;
    const url = API + (isLogin?'login':'register');
    const self = this;
    showLoading('加载中');
    wxRequest(url,{method:'POST',data:user},function(res) {
      wx.hideLoading();
      const {statusCode, data, header} = res;
      const authToken = header['Auth-Token'];
      if (statusCode == 200 && authToken) {
        wx.setStorageSync('auth-token', authToken);
        self.getDetail();
      } else {
        self.setData({err:data.msg});
      }
    });
  },
  changeMode: function() {
    var isLogin = !this.data.isLogin
    this.setData({isLogin});
  }
})