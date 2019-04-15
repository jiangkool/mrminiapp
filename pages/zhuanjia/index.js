// pages/zhuanjia/index.js
const util = require('../../utils/util.js');
var data_list = []
var curPage = 1;
var category_id = 9;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber
    })
  },
  showZj:function(e){
    wx.navigateTo({
      url: '/pages/show/index?id='+e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.checkSession();
    wx.showNavigationBarLoading()
    var that = this
    wx.getSystemInfo({
      success: function (res) {
       // console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    wx.request({
      url: app.globalData.appUrl+'/wechat/category',
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '【专家荟萃】'+appName
    }
  }
})