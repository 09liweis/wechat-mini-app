const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const wxRequest = (url,opt,cb) => {
  var method = 'GET';
  var data = {};
  if (opt) {
    if (opt.method) {
      method = opt.method;
    }
    if (opt.date) {
      data.date = opt.date;
    }
  }
  wx.request({
    url,
    method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    data,
    dataType:'json',
    success(res) {
      return cb(res);
    },
    fail(res) {
      return cb(res);
    }
  })
}

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : '0' + month;
  let day = date.getDate();
  day = day > 9 ? day : '0' + day;
  return {
    year,
    month,
    day
  }
}

module.exports = {
  formatTime: formatTime,
  wxRequest: wxRequest,
  getCurrentDate: getCurrentDate
}
