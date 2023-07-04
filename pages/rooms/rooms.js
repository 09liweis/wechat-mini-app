const { wxRequest, roomRequest } = require("../../utils/util")

// pages/rooms/rooms.js
Page({

  /**
   * Page initial data
   */
  data: {
    rooms:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.fetchRooms();
  },

  fetchRooms:function() {
    roomRequest('',{},(res)=>{
      this.setData({rooms:res.data});
    });
  },

  toRoomPage:function(e) {
    const roomId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/room/room?id='+roomId,
    })
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