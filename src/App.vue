<template>
  <div id="app">
    <mark-down-editor></mark-down-editor>
  </div>
</template>

<script>
import MarkDownEditor from "./components/MarkDownEditor";
export default {
  name: 'app',
  components: {MarkDownEditor},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
