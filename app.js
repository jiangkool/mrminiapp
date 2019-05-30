//app.js
const util = require('utils/util.js');
App({
  onLaunch: function () {
  util.doLogin();
  },
  globalData:{
  	phoneNumber:'xxxxxx',
  	appName:'医疗美容',
  	appUrl: 'https://app.xxx.com'
  }
 
})
