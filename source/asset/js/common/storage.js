const self = window.localStorage;

const get = key => {
  let value = self.getItem(key);
  if (value) {
    try {
      value = JSON.parse(value);
    } catch (error) {
      if (!isNaN(value)) {
        value = parseFloat(value);
      }
    }
  }
  return value;
};

const set = (key, value) => {
  try {
    self.setItem(key, JSON.stringify(value));
  } catch (error) {
    self.setItem(key, value);
  }
};

const clear = o => {
  self.clear();
};

export default {
  self,
  get,
  set,
  clear
}