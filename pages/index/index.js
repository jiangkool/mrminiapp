//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
Page({
  data: {
    sliders:[],
    hjUrls:[
      '../../images/hj1.jpg',
      '../../images/hj2.jpg',
      '../../images/hj3.jpg',
      '../../images/hj4.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular:true,
    interval: 5000,
    duration: 1000,
    products: [],
    cases:[]
  },
  showXm:function(e){
    wx.navigateTo({
      url: '/pages/show/index?id=' + e.currentTarget.id,
    })
  },
  call: function(){
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber
    })
  },
  ksyy:function(e){
    wx.navigateTo({
      url: '/pages/baoming/index?id=' + e.currentTarget.id,
    })
  },
  show: function (e) {
    wx.navigateTo({
      url: '/pages/show/index?id=' + e.currentTarget.id,
    })
  },
  openMap:function(){
    wx.openLocation({
      latitude: 30.62478,
      longitude: 114.30491,
      name:"xxxx", 
      address:"xxxxx",
      scale: 18
    })
  },
  onLoad: function () {
    wx.showNavigationBarLoading()
    util.checkSession();
    var that=this;
    if (wx.getStorageSync("sliders") && wx.getStorageSync("products") && wx.getStorageSync("cases")){
      var sliders = wx.getStorageSync("sliders");
      var products = wx.getStorageSync("products");
      var cases = wx.getStorageSync("cases");
      that.setData({
        sliders: sliders,
        products: products,
        cases: cases
      })
     } else {
        wx.request({
          url: app.globalData.appUrl+'/wechat/getHomeData',
          success: function (data) {
            that.setData({
              sliders: data.data.sliders,
              products: data.data.products,
              cases: data.data.cases
            })

            wx.setStorageSync('sliders', data.data.sliders);
            wx.setStorageSync('products', data.data.products);
            wx.setStorageSync('cases', data.data.cases);
          },
          fail:function(){
            console.log('Filed!!!')
          },
          complete: function () {
            console.log('completed!!!')
          }
        })
    }
  },
  onReady: function () {
    wx.hideNavigationBarLoading()
  },
  onPullDownRefresh: function () {
    this.getHomeData();
    console.log('Page has been updated!');
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 2000)
    wx.stopPullDownRefresh()

  },
  getHomeData:function(){
    var that=this;
    wx.request({
      url: app.globalData.appUrl+'/wechat/getHomeData',
      success: function (data) {
        that.setData({
          sliders: data.data.sliders,
          products: data.data.products,
          cases: data.data.cases
        })

        wx.setStorageSync('sliders', data.data.sliders);
        wx.setStorageSync('products', data.data.products);
        wx.setStorageSync('cases', data.data.cases);
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.appName
    }
  }
})
