import storage from "./storage.js";

const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent);

const config = Object.assign({
  closeDrawer: false,
  closeAside: false,
  skin: 'default',
  langshift: false,
  night: false,
  transfigure: false,
  lyride: isMobile,
  autoplay: false
}, storage.get('config'));

const get = key => {
  return config[key];
};

const set = (key, value) => {
  if (Object.keys(config).includes(key)) {
    config[key] = value;
    storage.set('config', config);
  }
};

export default {
  get,
  set
}