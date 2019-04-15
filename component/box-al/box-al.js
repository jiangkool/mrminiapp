// component/box-al/box-al.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type:Number,
      value:'0'
    },
    thumb:{
     type:String,
     value:'../../images/index_02.jpg'
     },
    title:{
      type:String,
      value:'暂无标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: function () {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('myshowevent', myEventDetail, myEventOption)
    }
  }
})
