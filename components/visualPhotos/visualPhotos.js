// components/visualPhotos/visualPhotos.js
Component({
  /**
   * Component properties
   */
  properties: {
    photos:{
      type:Array
    },
    douban_id:{
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
      const {douban_id} = this.data;
      wx.navigateTo({
        url: '/pages/visualPhotos/visualPhotos?douban_id=' + douban_id,
      })
    },
  }
})
