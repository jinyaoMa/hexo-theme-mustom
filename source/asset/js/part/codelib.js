import part from "../common/part.js";
import ajax from "../common/ajax.js";

let tag = 'codelib';
let element = null;
let onstart = null;
let onended = null;

// fontawesome icon - <i class="fas fa-file-code fa-fw"></i>
const fileicon = document.createElement('i');
fileicon.className = 'far fa-file-code';

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);

    if (params) {
      if (params.readme) {
        let dom = new DOMParser().parseFromString(params.readme, 'text/html');
        dom.querySelectorAll('a[aria-hidden]').forEach(a => {
          a.remove();
        });
        dom.querySelectorAll('a:not([aria-hidden])').forEach(a => {
          a.target = '_blank';
        });

        let readme = element.querySelector('.p-codelib-readme');
        let more = element.querySelector('.p-codelib-more');
        more.onclick = e => {
          if (readme.classList.contains('active')) {
            readme.classList.remove('active');
          } else {
            readme.classList.add('active');
          }
        };
        readme.insertBefore(dom.body.firstElementChild, more);
      }
      params.onstart && (onstart = params.onstart);
      params.onended && (onended = params.onended);
    }

    callback && callback(element);
  });
};

const update = list => {
  if (!element) return;
  if (list && list.length) {
    let container = element.querySelector('.p-codelib-list');

    list.forEach(item => {
      if (item.type === 'dir') {
        let li = document.createElement('li');
        li.setAttribute('data-git-path', item.path);

        let div = document.createElement('div');
        div.classList.add('codelib-cat');
        div.innerText = item.name;
        li.appendChild(div);

        let ul = document.createElement('ul');
        ul.classList.add('codelib-inner');
        ul.setAttribute('data-git-cat', item.name);
        li.appendChild(ul);

        container.appendChild(li);
        div.onclick = e => {
          if (li.classList.contains('active')) {
            ul.innerHTML = '';
            li.classList.remove('active');
          } else {
            onstart && onstart();

            ajax({
              url: `//api.github.com/repos/jinyaoMa/code-lib/contents/${encodeURIComponent(item.path)}`,
              method: 'get',
              dataType: 'json',
              headers: {
                accept: 'application/vnd.github+json'
              },
              success(data) {
                if (data && data.length) {
                  data.forEach(itm => {
                    if (itm.type === 'file') {
                      let inLi = document.createElement('li');
                      let inA = document.createElement('a');
                      inA.target = '_blank';
                      inA.innerText = itm.name;
                      inA.href = itm.html_url;
                      inLi.appendChild(fileicon.cloneNode(true));
                      inLi.appendChild(inA);
                      ul.appendChild(inLi);
                    }
                  });
                  li.classList.add('active');
                  onended && onended();
                }
              }
            });
          }
        };
      }
    });
  }
};

export default {
  tag,
  init,
  update
};