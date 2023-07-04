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

const SERVER_API_HOST = 'https://samliweisen.onrender.com/api/';

const roomRequest = (endpoint,opt,cb)=> {
  wxRequest(`${SERVER_API_HOST}rooms/${endpoint}`,opt,cb);
}

const movieRequest = (endpoint,opt,cb)=> {
  wxRequest(`${SERVER_API_HOST}movies/${endpoint}`,opt,cb);
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
      return cb(null,res);
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

const getUserLocation = (cb) => {
  wx.authorize({
    scope: 'scope.userLocation',
    success: (res) => {
      wx.getLocation({
        success: function (res) {
          console.log(res);
          const lat = res.latitude;
          const lng = res.longitude;
          return cb(null,{lat,lng})
        },
        fail:(res)=>{
          console.log('fail',res);
          return cb(res);
        }
      })
    },
    fail: (res) => {
      return cb(res);
    },
  });
}

module.exports = {
  formatTime: formatTime,
  wxRequest,
  getUserLocation,
  roomRequest,
  movieRequest,
  DOUBAN_DETAIL: 'https://samliweisen.onrender.com/api/movies/',
  getCurrentDate: getCurrentDate,
  showToast: showToast,
  showLoading:showLoading,
  dayDiff: dayDiff,
  getStorage: getStorage
}
