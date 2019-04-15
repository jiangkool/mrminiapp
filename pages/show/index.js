const util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var shareBt = '';
var app = getApp()
Page({
  data: {
    title: '',
    pubdate:'2018-4-4',
    body:'',
    click:"0"
  },
  onLoad: function (options) {
   // console.log(options.id)
    wx.showNavigationBarLoading()
    util.checkSession();
    var that = this;
    wx.request({
      url: app.globalData.appUrl +'/wechat/getContent',
      method: 'GET',
      data: {
        id: options.id,
        token: wx.getStorageSync('token') || []
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //console.log(res.data.data.created_at)
        shareBt = res.data.data.title
        wx.setNavigationBarTitle({
          title: shareBt
        })
        var body = res.data.data.body;
        WxParse.wxParse('body', 'html', body, that, 5);
        that.setData({
          title: res.data.data.title,
          pubdate: res.data.data.created_at,
          click: res.data.data.click
        })

      }
    })

  },
  onReady: function () {
    wx.hideNavigationBarLoading()
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber
    })
  },
  onShareAppMessage: function () {
    return {
      title: shareBt,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onPullDownRefresh: function () {
    this.onLoad();
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 2000)
    wx.stopPullDownRefresh()

  }

})