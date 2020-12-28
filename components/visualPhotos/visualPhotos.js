// components/visualPhotos/visualPhotos.js
Component({
  /**
   * Component properties
   */
  properties: {
    photos:{
      type:Array
    },
    doubanId:{
      type:String
    },
    castId:{
      type:String
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    openPhotos: function() {
      const douban_id = this.properties.doubanId;
      const cast_id = this.properties.castId;
      let baseUrl = '/pages/visualPhotos/visualPhotos?';
      if (douban_id) {
        baseUrl += 'douban_id='+douban_id;
      }
      if (cast_id) {
        baseUrl += 'cast_id='+cast_id;
      }
      wx.navigateTo({
        url: baseUrl
      })
    },
  }
})
