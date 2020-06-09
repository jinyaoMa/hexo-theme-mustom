import part from "../common/part.js";

let tag = 'brand';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    if (params) {
      element.querySelector('.p-brand-posts-count').innerText = params.numOfPosts;
      element.querySelector('.p-brand-categories-count').innerText = params.numOfCategories;
      element.querySelector('.p-brand-tags-count').innerText = params.numOfTags;
    }
    callback && callback(element);
  });
};

export default {
  tag,
  init
};