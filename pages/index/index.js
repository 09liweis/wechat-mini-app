//index.js
//获取应用实例
const { wxRequest, dayDiff } = require('../../utils/util.js');
const app = getApp()
const TODO_API = 'https://samliweisen.herokuapp.com/api/todos/';

Page({
  data: {
    btnSz:'mini',
    todos:[],
    showOption:false,
    optionView:{
      left: null,
      top: null
    },
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
    wxRequest(TODO_API,{},function(res) {
      const {statusCode,data} = res;
      if (statusCode == 200) {
        for (let i = 0; i < data.length; i++) {
          var day = dayDiff(data[i].date);
          if (day > 0) {
            day = `${day} day left`;
          } else {
            day = `${Math.abs(day)} day pass`;
          }
          data[i].deadline = day;
        }
        self.setData({ todos: data });
        wx.stopPullDownRefresh();
      }
    });
  },
  toForm:function(e) {
    const todoId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/form/form?id='+todoId,
    })
  },
  longPress:function(e) {
    const {x,y} = e.detail;
    const {index,id} = e.currentTarget.dataset;
    console.log(index,id);
    
    // this.setData({showOption:true,optionView:{left:x,top:y}});
  },
  deleteTodo:function(id,idx) {
    const url = TODO_API+id;
    const self = this;
    const todos = this.data.todos;
    wxRequest(url,{method:'DELETE',data:{}},function(res) {
      const {statusCode,data} = res;
      if (statusCode == 200) {
        todos.splice(idx,1);
        self.setData({todos});
      }
    });
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
