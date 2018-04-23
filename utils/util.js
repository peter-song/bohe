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

const getFromObject = (obj, keyStr, defaultVal) => {
  let val = defaultVal;
  const keyArr = typeof keyStr == 'string' ? keyStr.split('.') : [];
  keyArr.forEach(key => {
    val = obj[key];
    val && (obj = obj[key]);
  });
  return val ? val : defaultVal;
};

module.exports = {
  formatTime,
  getFromObject
}
