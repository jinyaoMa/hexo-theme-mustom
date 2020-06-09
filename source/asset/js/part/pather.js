import part from "../common/part.js";
import util from "../common/util.js";

let tag = 'pather';
let element = null;
let abbrMatch = null;
let menus = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);

    if (params) {
      params.abbrMatch && (abbrMatch = params.abbrMatch);
      params.menus && (menus = params.menus);
    }

    callback && callback(element);
  });
};

const update = o => {
  if (!element || !menus || !abbrMatch) return;
  let queue = element.querySelector('.p-pather-queue');
  let pathname = window.location.pathname;

  queue.innerHTML = '';

  let a = document.createElement('a');
  if (/^\/(archives|posts)\//.test(pathname)) {
    a.href = menus.main.archive.url;
    a.setAttribute('data-lang', 'pather.archive');
  } else if (/^\/(categories)\//.test(pathname)) {
    a.href = menus.main.archive.url;
    a.setAttribute('data-lang', 'pather.catarchive');
  } else if (/^\/(tags)\//.test(pathname)) {
    a.href = menus.main.archive.url;
    a.setAttribute('data-lang', 'pather.tagarchive');
  } else if (/^(\/|\/index.html)$/.test(pathname)) {
    a.href = menus.main.home.url;
    a.setAttribute('data-lang', 'pather.home');
  } else {
    let matches = pathname.match(/^\/([a-zA-Z0-9_\-]+)/);
    if (matches.length === 2) {
      util.forIn(menus, menu => {
        if (menu.hasOwnProperty(matches[1])) {
          a.href = menu[matches[1]].url;
          return true;
        }
      });
      a.setAttribute('data-lang', `pather.${matches[1]}`);
    }
  }
  queue.appendChild(a);

  if (/^\/(posts)\//.test(pathname)) {
    let match = pathname.match(/^\/posts\/(\d+)\//);
    if (match) {
      let a = document.createElement('a');
      a.href = pathname;
      a.innerText = a.title = abbrMatch[match[1]];
      queue.appendChild(a);
    }
  }

  if (/^\/(categories)\//.test(pathname)) {
    let names = pathname.replace(/([^\/]+)$/, '').replace(/^\/(categories)\//, '').split('/');
    let current = '/categories/';
    names.forEach(name => {
      if (name.trim() !== '') {
        let a = document.createElement('a');
        a.href = current = current + name + '/';
        a.innerText = a.title = window.decodeURIComponent(name).replace('-', ' ');
        queue.appendChild(a);
      }
    });
  }

  if (/^\/(tags)\//.test(pathname)) {
    let names = pathname.replace(/([^\/]+)$/, '').replace(/^\/(tags)\//, '').split('/');
    let current = '/tags/';
    names.forEach(name => {
      if (name.trim() !== '') {
        let a = document.createElement('a');
        a.href = current = current + name + '/';
        a.innerText = a.title = window.decodeURIComponent(name).replace('-', ' ');
        queue.appendChild(a);
      }
    });
  }

};

export default {
  tag,
  init,
  update
};