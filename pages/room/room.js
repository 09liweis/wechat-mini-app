const { wxRequest, showToast, roomRequest } = require("../../utils/util");
// pages/room/room.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const roomId = options.id;
    if (roomId !== 'undefined') {
      roomRequest(roomId,{},(err,res)=>{
        this.setData(res.data);
      });
    }
  },

  bindRoomNameChange:function(e) {
    this.setData({nm:e.detail.value});
  },

  bindSwitchChange:function(e) {
    this.setData({isAvailable: e.detail.value});
    console.log(e.detail, this.data.isAvailable);
  },

  bindStartDateChange:function(e) {
    this.setData({startDate:e.detail.value});
  },
  bindEndDateChange:function(e) {
    this.setData({endDate:e.detail.value});
  },
  handleRoomSubmit:function(e) {
    if (!this.data.nm) {
      showToast({title:'房间名字不为空',icon:'fail'})
      return;
    }
    wx.showLoading({
      title: '提交中(^ o ^)',
    });
    const opt = {
      method:'POST',
      data:this.data
    };
    let api = '';
    if (this.data._id) {
      opt.method = 'PUT';
      api = '/'+this.data._id;
    }
    roomRequest(api,opt,(err,res)=>{
      const pages = getCurrentPages();
      const parent = pages[0];
      parent.fetchRooms();
      wx.navigateBack({})
      showToast({
        title:'添加成功',
        icon: 'success',
      });
    });
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})