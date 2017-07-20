const filters = {
  numToWan: function (n) {
    if(n<10000){
      return n
    }else{
      return (n / 10000).toFixed(1) + '万'
    }
  },
  CutStr: function (str, n) {
    if (str.length < n) {
      return str
    } else {
      return str.substr(0, n) + '...'
    }
  },
  calcMode: function (mode) {
    if (mode == 0) {
      return '列表循环'
    } else if (mode == 1) {
      return '单曲循环'
    } else if (mode == 2) {
      return '随机播放'
    } else {
      return mode
    }
  },
  formatDuration: function (interval) {
    interval = Math.floor(interval / 1000)
    const minute = interval / 60 | 0
    const second = interval % 60
    return `${minute}:${second}`
  },
  filterSinger: function (singer) {
    let ret = []
    if (!singer) {
      return ''
    }
    singer.forEach((s) => {
      ret.push(s.name)
    })
    return ret.join('/')
  },
  formatDesc: function (text) {
    let txt = text.split(';')
    return txt
  },
  getDateTimeStamp: function (dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
      return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var result;
    if (monthC >= 1) {
      dateTimeStamp = "" + parseInt(monthC) + "月前";
    }
    else if (weekC >= 1) {
      dateTimeStamp = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
      dateTimeStamp = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
      dateTimeStamp = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
      dateTimeStamp = "" + parseInt(minC) + "分钟前";
    } else
      dateTimeStamp = "刚刚";
    return dateTimeStamp;
  },
  normalAlias: function (array) {
    return '(' + array.join(' ') + ')'
  },
  getLocalTime: function (nS) {
    var now = new Date(nS),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)
  }
}
export default (Vue) => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
