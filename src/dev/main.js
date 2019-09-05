import Vue from 'vue'
import App from './App.vue'
import MarkDownEditor from '../index.js'


Vue.use(MarkDownEditor);
new Vue({
  el: '#app',
  render: h => h(App)
})
