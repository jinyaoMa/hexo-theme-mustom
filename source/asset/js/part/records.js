import part from "../common/part.js";

let tag = 'records';
let element = null;

const _setRecord = (dom, record) => {
  let cover = dom.querySelector('.p-record-cover img');
  let date = dom.querySelector('.p-record-date');
  let title = dom.querySelector('.p-record-title .p-record-inner');
  let type = dom.querySelector('.p-record-type .p-record-inner');
  let author = dom.querySelector('.p-record-author .p-record-inner');
  let source = dom.querySelector('.p-record-source .p-record-inner');
  let summary = dom.querySelector('.p-record-summary .p-record-inner');
  let progress = dom.querySelector('.p-record-progress .p-record-inner');

  record.cover && (cover.src = record.cover);
  record.date && (date.innerText = record.date.replace(/\s/g, ''));
  record.title && (title.innerText = record.title);
  type.setAttribute('data-lang', `records.types.${record.type ? record.type : 'default'}`);
  record.author && (author.innerText = record.author);
  record.source && (source.innerText = record.source);
  record.summary && (summary.innerText = record.summary);

  let progressCurrent = progress.querySelector('.p-record-progress-current');
  if (record.progress && progressCurrent) {
    let newProgress = record.progress.replace(/\s/g, ''); // clean space
    let isNT = /^[0-9]+\/[0-9]+$/.test(newProgress); // format 'number/total'
    let isPercent = /^[0-9]{1,3}%$/.test(newProgress); // format '100%'
    if (isNT) {
      let divis = newProgress.split('/');
      let result = parseInt(divis[0]) / parseInt(divis[1]) * 100;
      progressCurrent.style.width = result.toFixed() + '%';
      progressCurrent.innerText = newProgress.replace('/', ' / ');
      progressCurrent.classList.add(result < 50 ? 'low' : 'high');
    } else if (isPercent) {
      progressCurrent.style.width = newProgress;
      progressCurrent.innerText = newProgress;
      progressCurrent.classList.add(parseFloat(newProgress.replace('%', '')) < 50 ? 'low' : 'high');
    } else { // isWords
      progressCurrent.innerText = record.progress.trim();
      progressCurrent.classList.add('high');
    }
  } else {
    progressCurrent.style.width = 0;
  }
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);

    if (params && params.data && params.data.length) {
      let cache = element.querySelector('.p-record');
      params.data.forEach((record, i) => {
        if (i + 1 === params.data.length) {
          _setRecord(cache, record);
        } else {
          let temp = cache.cloneNode(true);
          _setRecord(temp, record);
          cache.before(temp);
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