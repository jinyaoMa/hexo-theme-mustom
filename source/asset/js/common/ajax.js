/**
 * AJAX
 * 
 * @param {Object} options 
 */
export default options => {
  if (!options.method || !options.url) return;
  let request = new XMLHttpRequest();
  request.open(options.method, options.url);
  request.timeout = 30000;
  if (options.method.toLowerCase() === 'post') {
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }
  if (options.timeout) {
    request.timeout = options.timeout;
  }
  if (options.dataType) {
    request.responseType = options.dataType;
  }
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200 && request.response) {
      options.success && options.success(request.response);
    }
  });
  if (options.error) {
    request.addEventListener('error', (e) => {
      options.error(e);
    });
    request.addEventListener('timeout', (e) => {
      options.error(e);
    });
  }
  request.send(options.data ? options.data : null);
}