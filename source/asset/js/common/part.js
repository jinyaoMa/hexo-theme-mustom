import ajax from "./ajax.js";
/*
const factory = {
  queue: [],
  isWorking: false,
  work(){
    if (!this.isWorking) {
      this.queue.shift()();
    }
  },
  next(){
    if (this.queue.length) {
      window.setTimeout(this.queue.shift(), 16);
    }
  }
};
*/
/**
 * Get part
 * 
 * @param {String} tag 
 * @param {Function} callback 
 */
export default function (tag, callback) {
  /*
  factory.queue.push(o => {
    factory.isWorking = true;
    ajax({
      url: `/asset/part/${tag}.html`,
      method: 'get',
      dataType: 'document',
      success(data) {
        callback && callback(data.body.firstElementChild);
        factory.isWorking = false;
        factory.next();
      }
    });
  });
  factory.work();
  */
  
  let dom = document.querySelector(`.p-${tag}`);
  if (dom) {
    callback && callback(dom);
    dom.classList.remove('HIDE');
  } else {
    ajax({
      url: `/asset/part/${tag}.html`,
      method: 'get',
      dataType: 'document',
      success(data) {
        callback && callback(data.body.firstElementChild);
      }
    });
  }
  
}