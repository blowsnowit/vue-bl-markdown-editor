const MarkDownEditor = require('./components/MarkDownEditor');
const VueMarkDownEditor = {
  markDownEditor: MarkDownEditor,
  'bold': require('./components/toolBar/bold.vue'), //粗体
  'italic': require('./components/toolBar/italic.vue'), //斜体
  'header': require('./components/toolBar/header.vue'),  //标题
  'underline': require('./components/toolBar/underline.vue'), //下划线
  'strikethrough': require('./components/toolBar/strikethrough.vue'), //中划线
  'thumbTack': require('./components/toolBar/thumb-tack.vue'),  //标记
  'superscript': require('./components/toolBar/superscript.vue'), //上角标
  'subscript': require('./components/toolBar/subscript.vue'),   //下角标
  'alignLeft': require('./components/toolBar/align-left.vue'),  //居左
  'alignCenter': require('./components/toolBar/align-center.vue'), //居中
  'alignRight': require('./components/toolBar/align-right.vue'),  //居右
  'quoteLeft': require('./components/toolBar/quote-left.vue'),  //段落引用
  'listOl': require('./components/toolBar/list-ol.vue'),     //有序列表
  'listUl': require('./components/toolBar/list-ul.vue'),    //无须列表
  'link': require('./components/toolBar/link.vue'),      //链接
  'picture': require('./components/toolBar/picture.vue'),   //图片
  'code': require('./components/toolBar/code.vue'),      //代码块
  'table': require('./components/toolBar/table.vue'),     //表格
  'emoji': require('./components/toolBar/emoji.vue'),
  'undo': require('./components/toolBar/undo.vue'),     //上一步
  'repeat': require('./components/toolBar/repeat.vue'),   //下一步
  'trash': require('./components/toolBar/trash.vue'),    //清空
  install: function(Vue) {
    Vue.component('mark-down-editor', MarkDownEditor.default);
  }
};

module.exports = VueMarkDownEditor;
