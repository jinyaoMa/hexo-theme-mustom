import part from "../common/part.js";

let tag = 'page';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);

    if (params) {
      params.title && (element.querySelector('[p-page-title]').innerText = params.title);
      params.content && (element.querySelector('[p-page-main]').innerHTML = params.content);

      let scripts = element.querySelectorAll('#test script');
      let currentIndex = 0;
      (function run(){
        if (currentIndex < scripts.length) {
          let s = document.createElement('script');
          if (scripts[currentIndex].src === '') {
            s.innerHTML = scripts[currentIndex].innerHTML;
            scripts[currentIndex].parentElement.append(s);
            scripts[currentIndex].remove();
            currentIndex += 1;
            run();
          } else {
            s.async = true;
            s.src = scripts[currentIndex].src;
            s.onload = o => {
              currentIndex += 1;
              run();
            };
            scripts[currentIndex].parentElement.append(s);
            scripts[currentIndex].remove();
          }
        }
      })();

      element.querySelectorAll('#test link[rel~="stylesheet"]').forEach(style => {
        let s = document.createElement('link');
        s.ref = "stylesheet";
        s.href = style.href;
        style.parentElement.append(s);
        style.remove();
      });;
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};