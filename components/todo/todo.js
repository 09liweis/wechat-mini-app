// components/todo.js
Component({
  /**
   * Component properties
   */
  properties: {
    todo:{
      type:Object
    },
    page:{
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
    toDetail: function (e) {
      if (this.data.page != 'list') {
        return;
      }
      const todo = e.currentTarget.dataset.todo;
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + todo._id,
      })
    },
  }
})
