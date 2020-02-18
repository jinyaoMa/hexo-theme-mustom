/*
 * pangu.node
 * https://github.com/huei90/pangu.node
 *
 * Copyright (c) 2014 Huei Tan
 * Licensed under the MIT license.
 */

'use strict';

function insert_space(text) {
  var old_text = text || '';
  var new_text;

  /*
   Regular Expressions
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

   Symbols
   ` ~ ! @ # $ % ^ & * ( ) _ - + = [ ] { } \ | ; : ' " < > , . / ?

   3000-303F 中日韓符號和標點
   3040-309F 日文平假名 (V)
   30A0-30FF 日文片假名 (V)
   3100-312F 注音字母 (V)
   31C0-31EF 中日韓筆畫
   31F0-31FF 日文片假名語音擴展
   3200-32FF 帶圈中日韓字母和月份 (V)
   3400-4DBF 中日韓統一表意文字擴展 A (V)
   4E00-9FFF 中日韓統一表意文字 (V)
   AC00-D7AF 諺文音節 (韓文)
   F900-FAFF 中日韓兼容表意文字 (V)
   http://unicode-table.com/cn/
   */

  // 前面"字"後面 >> 前面 "字" 後面
  text = text.replace(/([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(["'])/ig, '$1 $2');
  text = text.replace(/(["'])([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/ig, '$1 $2');

  // 避免出現 '前面 " 字" 後面' 之類的不對稱的情況
  text = text.replace(/(["']+)(\s*)(.+?)(\s*)(["']+)/ig, '$1$3$5');

  // # 符號需要特別處理
  text = text.replace(/([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#(\S+))/ig, '$1 $2');
  text = text.replace(/((\S+)#)([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/ig, '$1 $3');

  // 前面<字>後面 --> 前面 <字> 後面
  old_text = text;
  new_text = old_text.replace(/([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([<\[\{\(]+(.*?)[>\]\}\)]+)([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/ig, '$1 $2 $4');
  text = new_text;
  if (old_text === new_text) {
    // 前面<後面 --> 前面 < 後面
    text = text.replace(/([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([<>\[\]\{\}\(\)])/ig, '$1 $2');
    text = text.replace(/([<>\[\]\{\}\(\)])([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/ig, '$1 $2');
  }
  // 避免出現 "前面 [ 字] 後面" 之類的不對稱的情況
  text = text.replace(/([<\[\{\(]+)(\s*)(.+?)(\s*)([>\]\}\)]+)/ig, '$1$3$5');

  // 中文在前
  text = text.replace(/([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([a-z0-9`@&%=\$\^\*\-\+\|\/\\])/ig, '$1 $2');

  // 中文在後
  text = text.replace(/([a-z0-9`~!%&=;\|\,\.\:\?\$\^\*\-\+\/\\])([\u3040-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/ig, '$1 $2');

  return text;
}

module.exports = insert_space;