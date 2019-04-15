
/**
 * Format time.
 * 
 * @param new date
 * @return str time
 */
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * Compare two time check if a>b.
 * 
 * @param datetime a
 * @param datetime b
 * @return bool
 */
function compTime(a, b) {
  var arr = a.split("-");
  var nowtime = new Date(arr[0], arr[1], arr[2]);
  var nowtimes = nowtime.getTime();

  var arrs = b.split("-");
  var lktime = new Date(arrs[0], arrs[1], arrs[2]);
  var lktimes = lktime.getTime();

  if (nowtimes > lktimes) {
    return false;
  }
  else {
    return true;
  }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * Show success toast.
 * 
 * @param str title
 * @param int duration
 */
function showSuccess(title = "成功啦", icon = 'success', duration = 2500) {
  wx.showToast({
    title: title,
    icon: icon,
    duration: (duration <= 0) ? 2500 : duration
  });
}

/**
 * Show a loading model.
 * 
 * @param str title
 * @param int duration
 */
function showLoading(title = "加载中...", duration = 5000) {
  wx.showToast({
    title: title,
    icon: 'loading',
    duration: (duration <= 0) ? 5000 : duration
  });
}

/**
 * Hide a toast.
 * 
 * @return wx.hideToast()
 */
function hideToast() {
  wx.hideToast();
}

/**
 * Alert a models with cancel button.
 * 
 * @param str title
 * @param str content
 * @param bool confirm
 * @param bool showCancel
 */
function alertViewWithCancel(title = "提示", content = "消息提示", confirm, showCancel = "true") {
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  });
}

/**
 * Alert a models without cancel button.
 * 
 * @param str title
 * @param str content
 * @param bool confirm
 */
function alertView(title = "提示", content = "消息提示", confirm) {
  alertViewWithCancel(title, content, confirm, false);
}

/**
 * validate mobile number.
 * 
 * @param mobile number
 * @return bool
 */
function validateMobile(mobile) {
  if (mobile.length == 0) {
    return false;
  }
  if (mobile.length != 11) {
    return false;
  }
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (!myreg.test(mobile)) {
    return false;
  } else {
    return true;
  }
} 

/** 
 * Go back.
 * 
 * @param int m
 */
function goBack(m = 1) {
  wx.navigateBack({
    delta: m
  })
}

function doLogin(){
  // 登录
  wx.login({
    success: res => {
      wx.request({
        url: 'https://app.whbjmr.com/wechat/miniapp/' + res.code,
        success: function (data) {
          wx.setStorageSync('token', data.data.session_key);
          //wx.setStorageSync('sliders', data.data.sliders);
          //wx.setStorageSync('products', data.data.products);
          //wx.setStorageSync('cases', data.data.cases);
        }
      })
    }
  })
}


function checkSession(){
  wx.checkSession({
    fail:function(){
      doLogin();
    }
  })

}

module.exports = {
  formatTime: formatTime,
  showSuccess: showSuccess,
  showLoading: showLoading,
  hideToast: hideToast,
  alertViewWithCancel: alertViewWithCancel,
  alertView: alertView,
  validateMobile: validateMobile,
  goBack: goBack,
  checkSession: checkSession,
  doLogin: doLogin
}
