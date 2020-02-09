/**
 * Fetch
 * 
 * @param {String} url 
 * @param {Object} params 
 * @param {Function} callback 
 * @param {Boolean} flush 
 */
export default (url, params, callback, flush = false) => {
  let script = document.createElement('script');
  let data = '';
  let cb = null;
  let result = null;
  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (data === '') {
          data += '?' + key + '=' + value;
        } else {
          data += '&' + key + '=' + value;
        }
        if (/(jsonp|callback)/.test(key.toLowerCase())) {
          cb = value;
        }
      }
    }
  }
  if (cb) {
    window[cb] = function (obj) {
      result = obj;
    };
  }
  script.onload = function () {
    if (result) {
      callback && callback(result);
    }
    flush && script.remove();
  }
  script.onerror = function (e) {
    callback && callback(e);
    flush && script.remove();
  }
  script.src = url + data;
  document.head.appendChild(script);
}