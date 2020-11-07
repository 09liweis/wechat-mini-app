//index.js
//获取应用实例
const { wxRequest, dayDiff } = require('../../utils/util.js');
const app = getApp()
const TODO_API = 'https://samliweisen.herokuapp.com/api/todos/';
const DEL_BTN_WIDTH = 240;

Page({
  data: {
    btnSz:'mini',
    todos:[],
    showOption:false,
    selectedTodo:{id:'',idx:''},
    // optionView:{
    //   left: null,
    //   top: null
    // },
    startX:'',
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
  deleteTodo:function(e) {
    const {index,id} = e.currentTarget.dataset;
    const url = TODO_API+id;
    const self = this;
    const todos = this.data.todos;
    wxRequest(url,{method:'DELETE',data:{}},function(res) {
      const {statusCode,data} = res;
      if (statusCode == 200) {
        todos.splice(index,1);
        self.setData({todos});
        return;
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
  touchS: function (e) {
    // console.log('开始：' + JSON.stringify(e))
    // 是否只有一个触摸点
    if(e.touches.length === 1){
      this.setData({
        // 触摸起始的X坐标
        startX: e.touches[0].clientX
      })
    }
  },
  touchM: function (e) {
    // console.log('移动：' + JSON.stringify(e))
    var _this = this
    if(e.touches.length === 1){
     // 触摸点的X坐标
      var moveX = e.touches[0].clientX
      // 计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = _this.data.startX - moveX
     // delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = DEL_BTN_WIDTH;
      var txtStyle = ''
      if (disX == 0 || disX < 0){ // 如果移动距离小于等于0，文本层位置不变
        txtStyle = 'left:0'
      } else if (disX > 0 ){ // 移动距离大于0，文本层left值等于手指移动距离
        txtStyle = 'left:-' + disX + 'rpx'
        if(disX >= delBtnWidth){
          // 控制手指移动距离最大值为删除按钮的宽度
          txtStyle = 'left:-' + delBtnWidth + 'rpx'
        }
      }
      // 获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var todos = _this.data.todos;
      // 将拼接好的样式设置到当前item中
      todos[index].txtStyle = txtStyle
      // 更新列表的状态
      this.setData({todos});
    }
  },
  touchE: function (e) {
    // console.log('停止：' + JSON.stringify(e))
    var _this = this
    if(e.changedTouches.length === 1){
      // 手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      // 触摸开始与结束，手指移动的距离
      var disX = _this.data.startX - endX;
      console.log(disX);
      var delBtnWidth = DEL_BTN_WIDTH;
      // 如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth/2 ? 'left:-' + delBtnWidth + 'rpx' : 'left:0';
      // 获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var todos = _this.data.todos;
      todos[index].txtStyle = txtStyle;
      console.log(txtStyle);
      // 更新列表的状态
      _this.setData({
        todos
      });
    }
  }
})
