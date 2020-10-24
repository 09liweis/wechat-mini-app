//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    btnSz:'mini',
    todos:[],
    // selected:'',
    // animation: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getTodos();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPullDownRefresh:function(){
    this.getTodos();
  },
  getTodos:function() {
    const self = this;
    wx.request({
      url: app.globalData.api,
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success(res) {
        if (res.statusCode == 200) {
          self.setData({ todos: res.data });
          wx.stopPullDownRefresh();
        } else {
          console.log(res);
        }
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  toForm:function(e) {
    const todoId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/form/form?id='+todoId,
    })
  },
  toDetail: function (e) {
    // const {offsetLeft,offsetTop,dataset} = e.currentTarget;
    // let {todo, index} = dataset;
    // todo.index = index;
    // todo.left = offsetLeft;
    // todo.top = offsetTop;
    // let animation = wx.createAnimation({
    //   duration: 1000,
    //   delay: 400,
    //   timingFunction: 'ease'
    // });
    // animation.top(0).rotateX('180deg').step();
    // todo.animation = animation.export();
    // console.log(todo.animation);
    // console.log(offsetLeft, offsetTop);
    // this.setData({selected:todo,animation:animation.export()});
  },
})
