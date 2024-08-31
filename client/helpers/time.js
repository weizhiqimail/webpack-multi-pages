const moment = require('moment');

// 等待时间
async function sleep(time = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`sleep 等了 ${time}毫秒`);
      resolve();
    }, time);
  });
}

// 格式化时间
function formatTime(time = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(time).format(format);
}

function logTime(text, time = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  const newTime = formatTime(time, format);
  console.log(`[${newTime}]: `, text);
}

module.exports = {
  formatTime,
  sleep,
  logTime,
};
