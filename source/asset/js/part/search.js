import part from "../common/part.js";

let tag = 'search';
let element = null;
let search = null;
let setClick = null;
let onsearch = null;

const messages = {
  initial: '(..•˘_˘•..)',
  empty: '(╯°Д°)╯︵ ┻━┻'
};

const setup = o => {
  let searchResult = element.querySelector('.p-search-dialog-result');
  let input = element.querySelector('.p-search-dialog-input');
  let button = element.querySelector('.p-search-dialog-button');

  input.onkeydown = e => {
    if (e.code === 'Enter' || e.key === 'Enter') {
      input.blur();
      setClick();
    }
  };

  button.removeEventListener('click', setClick);
  setClick = e => {
    if (input.value.trim().length <= 0) return;
    searchResult.innerHTML = '';
    let keywords = input.value.trim().toLowerCase().split(/[\s\-]+/);

    search.forEach(item => {
      let isMatched = true;
      let title = item.title.trim().toLowerCase();
      let content = item.content.trim().toLowerCase();
      let url = item.url;
      let titleIndex = -1;
      let contentIndex = -1;
      let firstOccur = -1;
      if (title !== '' && content !== '') {
        keywords.forEach((keyword, j) => {
          titleIndex = title.indexOf(keyword);
          contentIndex = content.indexOf(keyword);
          if (titleIndex < 0 && contentIndex < 0) {
            isMatched = false;
          } else {
            if (contentIndex < 0) {
              contentIndex = 0;
            }
            if (j === 0) {
              firstOccur = contentIndex;
            }
          }
        });
      }
      if (isMatched) {
        let _item = document.createElement('div');

        let match_title = item.title.trim();
        if (titleIndex >= 0) {
          keywords.forEach(function (keyword) {
            let regS = new RegExp(keyword, "gi");
            match_title = match_title.replace(regS, "<strong>" + keyword + "</strong>");
          })
        }
        _item.innerHTML += "<a title='" + item.title.trim() + "' href='" + url + "'>" + match_title + "</a>";

        let match_content = item.content.trim();
        if (firstOccur >= 0) {
          let start = firstOccur - 128;
          let end = firstOccur + 128;
          if (start < 0) {
            start = 0;
          }
          if (start === 0) {
            end = 256;
          }
          if (end > match_content.length) {
            end = match_content.length;
          }
          match_content = match_content.substr(start, end);
          keywords.forEach(function (keyword) {
            let regS = new RegExp(keyword, "gi");
            match_content = match_content.replace(regS, "<strong>" + keyword + "</strong>");
          })
          _item.innerHTML += "<p>... " + match_content + " ...</p>";
        }

        searchResult.appendChild(_item);
      }
    });

    if (searchResult.innerHTML === '') {
      let div = document.createElement('div');
      div.innerText = messages.empty;
      div.classList.add('message');
      searchResult.appendChild(div);
    } else {
      onsearch && onsearch(keywords);
    }
  };
  button.addEventListener('click', setClick);
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    if (params) {
      params.search && (search = params.search);
      params.onsearch && (onsearch = params.onsearch);
      setup();
    }
    callback && callback(element);
  });
};

const on = o => {
  if (element) {
    let result = element.querySelector('.p-search-dialog-result');
    let div = document.createElement('div');
    div.innerText = messages.initial;
    div.classList.add('message');
    result.innerHTML = '';
    result.appendChild(div);

    element.classList.add('active');
  }
};

const off = o => {
  if (element) {
    element.classList.remove('active');

    element.querySelector('.p-search-dialog-input').value = '';
  }
};

export default {
  tag,
  init,
  on,
  off
};