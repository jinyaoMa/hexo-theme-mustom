import part from "../common/part.js";

let tag = 'pather';
let element = null;
let abbrMatch = null;
let menus = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);

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
  } else if (/^\/(about)\//.test(pathname)) {
    a.href = menus.main.about.url;
    a.setAttribute('data-lang', 'pather.about');
  } else if (/^\/(resume)\//.test(pathname)) {
    a.href = menus.job.resume.url;
    a.setAttribute('data-lang', 'pather.resume');
  } else if (/^\/(letter)\//.test(pathname)) {
    a.href = menus.job.letter.url;
    a.setAttribute('data-lang', 'pather.letter');
  } else if (/^\/(records)\//.test(pathname)) {
    a.href = menus.others.records.url;
    a.setAttribute('data-lang', 'pather.records');
  } else if (/^\/(gallery)\//.test(pathname)) {
    a.href = menus.others.gallery.url;
    a.setAttribute('data-lang', 'pather.gallery');
  } else {
    a.href = menus.main.home.url;
    a.setAttribute('data-lang', 'pather.home');
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
        a.innerText = a.title = name.replace('-', ' ');
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
        a.innerText = a.title = name.replace('-', ' ');
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