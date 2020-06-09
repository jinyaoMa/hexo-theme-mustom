import part from "../common/part.js";

let tag = 'recentposts';
let element = null;
let posts = [];
let count = 10;

const setPost = (post, dom) => {
  let cover = dom.querySelector('.p-recentpost-cover span');
  cover.innerHTML = '';
  if (post.cover) {
    let img = document.createElement('img');
    img.onload = o => {
      let cTemp = dom.querySelector('.p-recentpost-cover');
      if (cTemp && img.offsetWidth > cTemp.offsetWidth && img.offsetHeight > cTemp.offsetHeight) {
        img.style.height = cTemp.offsetHeight + 'px';
      }
    };
    img.src = post.cover;
    cover.appendChild(img);
  } else {
    dom.classList.add('nocover');
  }
  let title = dom.querySelector('.p-recentpost-title-link');
  title.href = post.url;
  title.innerText = title.title = post.title;
  let date = dom.querySelector('.p-recentpost-date span');
  date.innerText = post.date;
  let updated = dom.querySelector('.p-recentpost-updated span');
  updated.innerText = post.updated;
  let categories = dom.querySelector('.p-recentpost-categories span');
  categories.innerHTML = '';
  post.categories.forEach((cat, j) => {
    let a = document.createElement('a');
    a.href = cat.url;
    a.innerText = cat.name;
    j !== 0 && categories.append(' , ');
    categories.appendChild(a);
  });
  if (!post.categories.length) {
    let c = dom.querySelector('.p-recentpost-categories');
    c && (c.style.display = 'none');
  }
  let excerpt = dom.querySelector('.p-recentpost-excerpt');
  excerpt.innerHTML = post.excerpt;
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);

    if (params && params.posts && params.posts.length) {
      posts = params.posts.concat();

      let items = element.querySelector('.p-recentposts-items');
      let item = element.querySelector('.p-recentpost');
      let more = element.querySelector('.p-recentposts-more');
      let visible = posts.splice(0, count);
      visible.forEach((p, i) => {
        if (i + 1 === visible.length) {
          setPost(p, item);
        } else {
          let cache = item.cloneNode(true);
          setPost(p, cache);
          item.before(cache);
        }
      });
      if (posts.length === 0) {
        more.style.display = 'none';
      }
      more.onclick = e => {
        let newPosts = posts.splice(0, count);
        newPosts.forEach(p => {
          let cache = item.cloneNode(true);
          setPost(p, cache);
          items.appendChild(cache);
          cache.querySelectorAll('a').forEach(link => {
            link.removeAttribute('data-listened'); // reset signal For listen2Links()
          });
        });
        if (posts.length === 0) {
          more.style.display = 'none';
        }
        params.onMore && params.onMore(more);
      };
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};