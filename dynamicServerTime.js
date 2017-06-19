document.write('<script src="https://cdn.bootcss.com/jquery/2.2.3/jquery.min.js"><\/script>');
function dynamicServerTime (options) {
  var _this = this;
  var _options = {
    eleId: '', // 存放最终展示时间的元素id
    url: '',  // 请求服务器端地址，传入数据为时间戳，秒单位，如不传，则取客户端当前时间
    duration: 15000,  // 多长时间同步一次服务器端时间，默认15秒
    jsonp: true, // 是否jsonp请求方式
    dataKey: '', // 如果不为jsonp请求方式，则需提供服务端返回时间戳的key
    format: 'y-m-d h:i:s w'
  };
  _this.timeStr = undefined;
  _this.options = Object.assign(_options, options);
  _this.ele = document.getElementById (this.options.eleId);
  if (!_this.ele) {
    throw '未找到id为' + this.options.eleId + '的元素';
  }
  _this.getTimeStr = function () {
    // 清空计时器
    clearTimeout(_this.timeout);
    // 如果url为空，则取客户端当前时间
    if (!_this.options.url) {
      _this.timeStr = parseInt(new Date()/1000);
      _this.setTime (timeStr);
      return;
    }
    var ajaxObj = {
      url: _this.options.url
    };
    if (_this.options.jsonp) {
      ajaxObj.dataType = "jsonp";
      ajaxObj.success = function (data) {
        _this.timeStr = data;
        _this.setTime (_this.timeStr);
      }
    }else{
      ajaxObj.success = function (data) {
        _this.timeStr = data[_this.options.dataKey];
        _this.setTime (_this.timeStr);
      }
    }
    ajaxObj.error = function (msg) {
      console.log (msg)
    };
    $.ajax (ajaxObj);
  };
  _this.setTime = function (timeStr) {
    let myDate = timeStr ? new Date (timeStr*1000) : new Date ();
    let myWeekday = myDate.getDay ();
    let myMonth = addZero(myDate.getMonth () + 1);
    let myDay = addZero(myDate.getDate ());
    let myYear = myDate.getFullYear ();
    let myHours = myDate.getHours ();
    let myMinutes = addZero(myDate.getMinutes ());
    let mySeconds = addZero(myDate.getSeconds ());
    let weekday = '星期' + '日一二三四五六'.charAt (myWeekday);
    let resultStr = _this.options.format.replace('y', myYear).replace('m', myMonth).replace('d', myDay)
      .replace('h', myHours).replace('i', myMinutes).replace('s', mySeconds).replace('w', weekday);
    _this.ele.innerText = resultStr;

    _this.timeout = setTimeout (function () {
      // 每经过1秒钟增加1秒钟的时间戳
      _this.timeStr += 1;
      _this.setTime (_this.timeStr);
    }, 1000);
  };

  _this.init = function () {
    _this.getTimeStr();
    // 每隔15秒同步一次服务器端时间
    _this.setInterval (getTimeStr, _this.options.duration);
  };

  _this.init();

  function addZero (num) {
    return num < 10 ? '0' + num : num;
  }

}
