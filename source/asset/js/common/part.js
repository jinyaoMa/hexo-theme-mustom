import ajax from "./ajax.js";

/**
 * Get part
 * 
 * @param {String} tag 
 * @param {Function} callback 
 */
export default function (tag, callback) {
  ajax({
    url: `/asset/part/${tag}.html`,
    method: 'get',
    dataType: 'document',
    success(data) {
      callback && callback(data.body.firstElementChild);
    }
  });
}