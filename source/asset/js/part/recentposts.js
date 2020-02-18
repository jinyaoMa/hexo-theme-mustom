import part from "../common/part.js";

let tag = 'recentposts';
let element = null;
let count = 5;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);

    if (params && params.posts && params.posts.length) {
      let items = element.querySelector('[p-recentposts-items]');
      let item = items.querySelector('[p-recentpost]');
      for (let i = 1; i < count; i++) {
        items.appendChild(item.cloneNode(true));
      }

      el.querySelectorAll('[p-recentpost]').forEach((recentpost, i) => {
        if (params.posts[i].cover) {
          let cover = recentpost.querySelector('[p-recentpost-cover] span');
          let img = document.createElement('img');
          img.src = params.posts[i].cover;
          cover.appendChild(img);
        }
        let title = recentpost.querySelector('[p-recentpost-title-link]');
        title.href = params.posts[i].url;
        title.innerText = title.title = params.posts[i].title;
        let date = recentpost.querySelector('[p-recentpost-date] span');
        date.innerText = params.posts[i].date;
        let updated = recentpost.querySelector('[p-recentpost-updated] span');
        updated.innerText = params.posts[i].updated;
        let categories = recentpost.querySelector('[p-recentpost-categories] span');
        params.posts[i].categories.forEach((cat, j) => {
          let a = document.createElement('a');
          a.href = cat.url;
          a.innerText = cat.name;
          j !== 0 && categories.append(' , ');
          categories.appendChild(a);
        });
        if (!params.posts[i].categories.length) {
          let c = recentpost.querySelector('[p-recentpost-categories]');
          c && (c.style.display = 'none');
        }
        let excerpt = recentpost.querySelector('[p-recentpost-excerpt]');
        excerpt.innerHTML = params.posts[i].excerpt;
      });
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};