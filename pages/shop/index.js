const util = require('../../utils/util.js');

const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
var data_list= []
var curPage = 1;
var category_id=0;
var app = getApp();
Page({
  data: {
    ui: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true,
      windowHeight:0
    }
    
  },
  ksyy: function (e) {
    wx.navigateTo({
      url: '/pages/baoming/index?id=' + e.currentTarget.id,
    })
  },
  submitSearch:function (e) {
    console.log(e.detail.value)
    wx.navigateTo({
      url: '../search/index?keywords=' + e.detail.value,
    })
  },
  showCat:function(e){
    //console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../category/index?id=' + e.currentTarget.id,
    })

  },
  show: function (e) {
    wx.navigateTo({
      url: '/pages/show/index?id=' + e.currentTarget.id,
    })
  },
  onShareAppMessage: function () {
    return {
      title: '美购-医疗美容'
    }
  },
  onPullDownRefresh: function () {
    this.onLoad();
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 2000)
    wx.stopPullDownRefresh()

  },
  onLoad(options) {
    util.checkSession();
    wx.showNavigationBarLoading()
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/wechat/category',
      method: 'GET',
      data: {
        page: 1,
        cat_id: category_id,
        token: wx.getStorageSync('token') || []
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //console.log(res.data)
        data_list = res.data.list
        that.setData({
          data_list: data_list
        })
      }
    })


    try {
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
      this.data.ui.offsetLeft = 0;
      this.data.ui.windowWidth = res.windowWidth;
      this.data.ui.windowHeight = res.windowHeight;
      this.setData({ ui: this.data.ui })
    } catch (e) {
    }

    

  },
  onReady: function () {
    wx.hideNavigationBarLoading()
  },
  showMore: function () {
    var that = this;
    util.showLoading();
    setTimeout(function () {
      that.loadMore();
    }, 2000);


  },
  loadMore: function () {
    var that = this;
    wx.request({
      url: app.globalData.appUrl +'/wechat/category',
      method: 'GET',
      data: {
        page: curPage + 1,
        cat_id: category_id,
        token: wx.getStorageSync('token') || []
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        if (res.data.list == null || res.data.list.length == 0) {
          util.showSuccess("我是有底线嘀!", "none");
        } else {
          data_list = data_list.concat(res.data.list);
          curPage = curPage + 1;
          that.setData({
            data_list: data_list
          })
          // 隐藏提示框
          util.hideToast();
        }
      }
    })
  },
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.data.ui.tStart = true;
    this.setData({ ui: this.data.ui })
  },
  handlerMove(e) {
    let { clientX } = e.touches[0];
    let { ui } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    ui.offsetLeft -= offsetX;
    if (ui.offsetLeft <= 0) {
      ui.offsetLeft = 0;
    } else if (ui.offsetLeft >= ui.menuWidth) {
      ui.offsetLeft = ui.menuWidth;
    }
    this.setData({ ui: ui })
  },
  handlerCancel(e) {
    // console.log(e);
  },
  handlerEnd(e) {
    this.data.ui.tStart = false;
    this.setData({ ui: this.data.ui })
    let { ui } = this.data;
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
      //向左
      if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
        ui.offsetLeft = 0;
      } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        if (ui.offsetLeft >= ui.menuWidth / 2) {
          ui.offsetLeft = ui.menuWidth;
        } else {
          ui.offsetLeft = 0;
        }
      }
    } else {
      if (ui.offsetLeft >= ui.menuWidth / 2) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        ui.offsetLeft = 0;
      }
    }
    this.setData({ ui: ui })
  },
  handlerPageTap(e) {
    let { ui } = this.data;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui })
    }
  },
  handlerAvatarTap(e) {
    let { ui } = this.data;
    if (ui.offsetLeft == 0) {
      ui.offsetLeft = ui.menuWidth;
      this.setData({ ui: ui })
    }
  }
})
