const MarkDownEditor = require('./MarkDownEditor');
const VueMarkDownEditor = {
  markDownEditor: MarkDownEditor,
  'bold': require('./toolBar/bold.vue'), //粗体
  'italic': require('./toolBar/italic.vue'), //斜体
  'header': require('./toolBar/header.vue'),  //标题
  'underline': require('./toolBar/underline.vue'), //下划线
  'strikethrough': require('./toolBar/strikethrough.vue'), //中划线
  'thumbTack': require('./toolBar/thumb-tack.vue'),  //标记
  'superscript': require('./toolBar/superscript.vue'), //上角标
  'subscript': require('./toolBar/subscript.vue'),   //下角标
  'alignLeft': require('./toolBar/align-left.vue'),  //居左
  'alignCenter': require('./toolBar/align-center.vue'), //居中
  'alignRight': require('./toolBar/align-right.vue'),  //居右
  'quoteLeft': require('./toolBar/quote-left.vue'),  //段落引用
  'listOl': require('./toolBar/list-ol.vue'),     //有序列表
  'listUl': require('./toolBar/list-ul.vue'),    //无须列表
  'link': require('./toolBar/link.vue'),      //链接
  'picture': require('./toolBar/picture.vue'),   //图片
  'code': require('./toolBar/code.vue'),      //代码块
  'table': require('./toolBar/table.vue'),     //表格
  'emoji': require('./toolBar/emoji.vue'),
  'undo': require('./toolBar/undo.vue'),     //上一步
  'repeat': require('./toolBar/repeat.vue'),   //下一步
  'trash': require('./toolBar/trash.vue'),    //清空
  install: function(Vue) {
    Vue.component('mark-down-editor', MarkDownEditor.default);
  }
};

module.exports = VueMarkDownEditor;
