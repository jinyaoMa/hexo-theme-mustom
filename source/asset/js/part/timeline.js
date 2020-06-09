import part from "../common/part.js";

let tag = 'timeline';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);

    if (params && params.posts && params.posts.length) {
      let items = element.querySelector('.p-timeline-items');
      let item = items.querySelector('.p-timeline-item');
      let currentYear = '9999';
      let currentYearCount = 0;
      let currentItem = null;
      params.posts.forEach((post, i) => {
        if (post.date.startsWith(currentYear)) {
          let currentRow = currentItem.querySelector('.p-timeline-row').cloneNode(true);
          currentRow.querySelector('.p-timeline-date').innerText = post.date;
          let a = currentRow.querySelector('.p-timeline-title a');
          a.href = post.url;
          a.innerText = a.title = post.title;
          currentRow.querySelector('.p-timeline-excerpt').innerHTML = post.excerpt;
          if (currentItem) {
            currentYearCount += 1;
            currentItem.querySelector('.p-timeline-count').setAttribute('data-lang-params', currentYearCount);
            currentItem.appendChild(currentRow);
          }

        } else {
          // New item
          currentItem = item.cloneNode(true);
          currentItem.querySelector('.p-timeline-year').innerText = currentYear = post.date.substr(0, 4);
          currentYearCount = 1;
          currentItem.querySelector('.p-timeline-count').setAttribute('data-lang-params', currentYearCount);

          let currentRow = currentItem.querySelector('.p-timeline-row');
          currentRow.querySelector('.p-timeline-date').innerText = post.date;
          let a = document.createElement('a');
          a.href = post.url;
          a.innerText = a.title = post.title;
          currentRow.querySelector('.p-timeline-title').appendChild(a);
          currentRow.querySelector('.p-timeline-excerpt').innerHTML = post.excerpt;

          items.appendChild(currentItem);
        }
        
        if (i + 1 === params.posts.length) {
          item.remove();
        }
      });
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};