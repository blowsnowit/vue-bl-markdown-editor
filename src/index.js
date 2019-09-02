const MarkDownEditor = require('./MarkDownEditor');
const bold =  require('./toolBar/bold.vue'); //粗体
const italic =  require('./toolBar/italic.vue'); //斜体
const header =  require('./toolBar/header.vue');  //标题
const underline =  require('./toolBar/underline.vue'); //下划线
const strikethrough =  require('./toolBar/strikethrough.vue'); //中划线
const thumbTack =  require('./toolBar/thumb-tack.vue');  //标记
const superscript =  require('./toolBar/superscript.vue'); //上角标
const subscript =  require('./toolBar/subscript.vue');   //下角标
const alignLeft =  require('./toolBar/align-left.vue');  //居左
const alignCenter =  require('./toolBar/align-center.vue'); //居中
const alignRight =  require('./toolBar/align-right.vue');  //居右
const quoteLeft =  require('./toolBar/quote-left.vue');  //段落引用
const listOl =  require('./toolBar/list-ol.vue');     //有序列表
const listUl =  require('./toolBar/list-ul.vue');    //无须列表
const link =  require('./toolBar/link.vue');      //链接
const picture =  require('./toolBar/picture.vue');   //图片
const code =  require('./toolBar/code.vue');      //代码块
const table =  require('./toolBar/table.vue');     //表格
const emoji =  require('./toolBar/emoji.vue');
const undo =  require('./toolBar/undo.vue');     //上一步
const repeat =  require('./toolBar/repeat.vue');   //下一步
const trash =  require('./toolBar/trash.vue');    //清空
const about =  require('./toolBar/about.vue');    //关于


const install = function(Vue) {
  Vue.component('mark-down-editor', MarkDownEditor.default);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const VueMarkDownEditor = {
  install: function(Vue) {
    Vue.component('mark-down-editor', MarkDownEditor.default);
  },
  MarkDownEditor,
  bold,
  italic,
  header,
  underline,
  strikethrough,
  thumbTack,
  superscript,
  subscript,
  alignLeft,
  alignCenter,
  alignRight,
  quoteLeft,
  listOl,
  listUl,
  link,
  picture,
  code,
  table,
  emoji,
  undo,
  repeat,
  trash,
  about,
};

module.exports = VueMarkDownEditor;
