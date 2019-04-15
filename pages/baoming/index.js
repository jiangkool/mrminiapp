// index.js
const util = require("../../utils/util.js");
var hid = '', shareBt = '';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hdtitle: '',
    hdthumb: '',
    new_price:0,
    old_price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    util.checkSession();
    var that = this
    //console.log(options.id)
    hid = options.id
    wx.request({
      url: app.globalData.appUrl +'/wechat/getXm',
      method: 'GET',
      data: {
        id: options.id,
        token: wx.getStorageSync('token') || []
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //console.log(res.data)
        shareBt = res.data.data.title
        that.setData({
          hdtitle: res.data.data.title,
          hdthumb: res.data.data.thumb,
          new_price: res.data.data.new_price,
          old_price: res.data.data.old_price
        })

      }
    })
  },
  onPullDownRefresh: function () {
    this.onLoad();
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 2000)
    wx.stopPullDownRefresh()

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading()
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber
    })
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var mobi = util.validateMobile(e.detail.value.phone);
    if (!mobi || !e.detail.value.name) {
      util.alertView('友情提示', '请检查您填写的电话和姓名是否正确！');
      return false;
    } else {
      wx.request({
        url: app.globalData.appUrl +'/wechat/yygh',
        method: 'GET',
        data: {
          hid: hid,
          name: e.detail.value.name,
          phone: e.detail.value.phone,
          bark: e.detail.value.bark,
          token: wx.getStorageSync('token') || []
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //console.log(res.data);
          if (res.data.status == 'ok') {
            wx.showToast({
              title: '预约成功！',
              icon: 'success',
              duration: 3000
            })
            setTimeout(function () {
              util.goBack();
            }, 2000)

          } else {
            util.alertView('友情提示', res.data.msg);
          }
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '【项目预约】：' + shareBt,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})