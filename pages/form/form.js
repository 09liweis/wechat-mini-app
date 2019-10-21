// pages/form/form.js
const app = getApp();
const api = app.globalData.api;
Page({

  /**
   * Page initial data
   */
  data: {
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const id = options.id;
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
  bindStepChange: function (e) {
    let step = this.data.step;
    step.name = e.detail.value;
    this.setData({ step });
  },
  stepSubmit:function() {
    let steps = Object.assign([],this.data.steps);
    const step = Object.assign({},this.data.step);
    steps.push(step);
    this.setData({steps});
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
    if (todo._id) {
      method = 'PUT';
      url = api + todo._id;
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
      }
    })
  }
})