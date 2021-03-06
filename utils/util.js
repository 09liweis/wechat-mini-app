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

const showToast = ({title='Success',icon='success'}) => {
  wx.showToast({
    title,
    icon
  });
}

const showLoading = (title='加载ing') => {
  wx.showLoading({
    title,
  })
}

const wxRequest = (url,opt,cb) => {
  var method = 'GET';
  var data = {};
  var header = {'content-type': 'application/json'}
  var authToken = getStorage('auth-token');
  if (authToken) {
    header['auth-token'] = authToken;
  }
  if (opt) {
    if (opt.method) {
      method = opt.method;
    }
    if (opt.data) {
      data = opt.data;
    }
  }
  wx.request({
    url,
    method,
    header,
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

const dayDiff = (date) => {
  if (!date) {
    return 0;
  }
  var currentDate = new Date().getTime();
  var deadline = new Date(date).getTime();
  var oneDay = 1000 * 60 * 60 * 24;
  var diff = (deadline - currentDate) / oneDay
  return parseInt(diff);
}
const getStorage = (key) => {
  return wx.getStorageSync(key);
}

module.exports = {
  formatTime: formatTime,
  wxRequest: wxRequest,
  DOUBAN_DETAIL: 'https://samliweisen.herokuapp.com/api/visuals/',
  getCurrentDate: getCurrentDate,
  showToast: showToast,
  showLoading:showLoading,
  dayDiff: dayDiff,
  getStorage: getStorage
}
