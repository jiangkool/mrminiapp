const util = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  formSubmit: function (e) {
    var self = this
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
          name: e.detail.value.name,
          phone: e.detail.value.phone,
          keshi: e.detail.value.keshi,
          yytime: e.detail.value.dytime,
          bark: e.detail.value.beizhu,
          token: wx.getStorageSync('token') || []
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data);
          if (res.data.status == 'ok') {
            wx.showToast({
              title: '预约提交成功！',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    }
  },
  formReset: function () {
    //console.log('form发生了reset事件')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.checkSession();
  
  },
  alert: function (t) {
    wx.showModal({
      title: "系统提示",
      content: t,
      showCancel: false,
      confirmColor: '#000'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 2000)
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '【自助预约挂号】'+app.globalData.appName
    }
  }
})