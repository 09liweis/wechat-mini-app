// components/visual/visual.js
Component({
  /**
   * Component properties
   */
  properties: {
    visual:{
      type:Object
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
    toDetail: function(e) {
      const douban_id = e.currentTarget.dataset.doubanid;
      wx.navigateTo({
        url: '/pages/visualDetail/visualDetail?douban_id=' + douban_id,
      })
    },
  }
})
