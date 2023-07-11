const { wxRequest, getUserLocation, movieRequest } = require("../../utils/util");

// pages/home.js
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
    this.fetchWeather();
    this.fetchMovies();
  },

  fetchWeather: function() {
    getUserLocation((err,loc)=>{
      console.log(err);
      console.log(loc);
      wxRequest('https://api.openweathermap.org/data/2.5/weather?appid=323b480b81057a727bed54d9532159d6&lat=43.8288928&lon=-79.2789297&units=metric',{},(err,res)=>{
        if (res.data) {
          // console.log(res.data);
          this.setData({
            weather:{
              ...res.data.main,
              city:res.data.name
            }
          });
        }
      });
    });
  },

  fetchMovies:function() {
    movieRequest('in_theatre',{},(err, res)=>{
      if (res?.data?.movies) {
        this.setData({movies:res.data.movies});
      }
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