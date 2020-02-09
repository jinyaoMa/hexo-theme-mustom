import ajax from "./ajax.js";

const store = {};

/**
 * Get data from api
 * 
 * @param {String} apiPath 
 * @param {Function} callback 
 */
export default (apiPath, callback) => {
  if (store[apiPath]) {
    callback && callback(store[apiPath]);
  } else {
    ajax({
      url: `/api/${apiPath}.json`,
      method: 'get',
      dataType: 'json',
      success(data) {
        store[apiPath] = data;
        callback && callback(store[apiPath]);
      }
    });
  }
}