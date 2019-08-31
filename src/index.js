import MarkDownEditor from './components/index'

const install = function(Vue, opts = {}) {
  Vue.component(MarkDownEditor.name, MarkDownEditor);
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  MarkDownEditor
}
