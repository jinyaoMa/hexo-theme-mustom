import part from "../common/part.js";

let tag = 'panels';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    if (params && params.categories && params.tags) {
      let categories = element.querySelector('[data-key="categories"] .p-panel-items');
      let tags = element.querySelector('[data-key="tags"] .p-panel-items');
      // Categories
      let maxLen = 0;
      params.categories.forEach(cat => {
        if (cat.count > maxLen) maxLen = cat.count;
      });
      let minLen = maxLen;
      params.categories.forEach(cat => {
        if (cat.count < minLen) minLen = cat.count;
      });
      let len = maxLen - minLen;
      params.categories.forEach(cat => {
        let size = parseFloat(((cat.count - minLen) / len).toFixed(2));
        let a = document.createElement('a');
        a.innerText = cat.name;
        a.href = cat.url;
        a.style.fontSize = (1 + 0.5 * size) + 'em';
        a.style.opacity = 0.5 + 0.5 * size;
        categories.appendChild(a);
      });
      // Tags
      maxLen = 0;
      params.tags.forEach(tag => {
        if (tag.count > maxLen) maxLen = tag.count;
      });
      minLen = maxLen;
      params.tags.forEach(tag => {
        if (tag.count < minLen) minLen = tag.count;
      });
      len = maxLen - minLen;
      params.tags.forEach(tag => {
        let size = parseFloat(((tag.count - minLen) / len).toFixed(2));
        let a = document.createElement('a');
        a.innerText = tag.name;
        a.href = tag.url;
        a.style.fontSize = (1 + 0.5 * size) + 'em';
        a.style.opacity = 0.5 + 0.5 * size;
        tags.appendChild(a);
      });
    }
    callback && callback(element);
  });
};

export default {
  tag,
  init
};