// component/box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id:{
      type: Number,
      value:'0'
    },
    thumb:{
      type: String,
      value: '../../images/box_31.jpg'
    },
    title:{
      type: String,
      value: '暂无标题'
    },
    new_price:{
      type: String,
      value: '0.00'
    },
    old_price:{
      type: String,
      value: '0.00'
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
    ksyy:function() {
      var myEventDetail = {} 
      var myEventOption = {} 
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    show: function () {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('myshowevent', myEventDetail, myEventOption)
    }
  }
})
