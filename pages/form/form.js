const app = getApp();
const api = app.globalData.api;
Page({

  /**
   * Page initial data
   */
  data: {
    hiddenmodalput:true,
    lat:'',
    lng:''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getUserLocation();
    const id = options.id;
    if (!id) {
      this.setEmptyTodo();
      return;
    }
    const self = this;
    wx.request({
      url: api + id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        const todo = res.data;
        self.setData(todo);
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    this.setEmptyTodo();
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
  getUserLocation:function() {
    const self = this;
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
        wx.getLocation({
          success: function (res) {
            const lat = res.latitude;
            const lng = res.longitude;
            self.setData({lat,lng});
            self.setMap();
          },
        })
      },
      fail: (res) => {
        console.log('失败：', res)
      },
    });
  },
  setMap:function() {
    // var myAmapFun = new amapFile.AMapWX({ key: app.globalData.amapKey });
    // myAmapFun.getPoiAround({
    //   success: function (data) {
    //     console.log(data);
    //     //成功回调
    //   },
    //   fail: function (info) {
    //     //失败回调
    //     console.log(info)
    //   }
    // })
  },
  getEmptyTodo:function() {
    return {
      _id:'',
      name: '',
      status: 'pending',
      date: '',
      steps: [],
      step:{
        name:'',
        status:'pending'
      }
    };
  },
  setEmptyTodo:function() {
    const todo = this.getEmptyTodo();
    this.setData(todo);
  },
  bindNameChange:function(e) {
    this.setData({name:e.detail.value});
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  radioChange:function(e) {
    this.setData({
      status:e.detail.value
    });
  },
  bindStepChange: function (e) {
    let step = this.data.step;
    step.name = e.detail.value;
    this.setData({ step });
  },
  showStepForm:function() {
    this.setData({hiddenmodalput:false});
  },
  stepSubmit:function() {
    let steps = Object.assign([],this.data.steps);
    const step = Object.assign({},this.data.step);
    steps.push(step);
    this.setData({steps,hiddenmodalput:true});
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  submit:function() {
    const data = this.data;
    let todo = this.getEmptyTodo();
    for (let key in todo) {
      todo[key] = data[key];
    }
    if (todo.steps.length == 0) {
      delete todo.steps;
    } else {
      todo.steps = JSON.stringify(todo.steps);
    }
    delete todo.step;
    let method = 'POST';
    let url = api;
    let title = '添加成功';
    if (todo._id) {
      method = 'PUT';
      url = api + todo._id;
      title = '更新成功';
    }
    wx.request({
      url,
      data:todo,
      method,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.navigateBack({})
        wx.showToast({
          title:title,
          icon: 'success',
          duration: 2000
        });
      }
    })
  }
})