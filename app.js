//app.js
const util = require('utils/util.js');
App({
  onLaunch: function () {
  util.doLogin();
  },
  globalData:{
  	phoneNumber:'027-66666333',
  	appName:'武汉百佳医疗美容',
  	appUrl: 'https://app.whbjmr.com'
  }
 
})