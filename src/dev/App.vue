<template>
  <div id="app">
    <mark-down-editor ref="editor"></mark-down-editor>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted(){
    console.log(this.$refs.editor);
    let editor = this.$refs.editor;

    //添加工具栏1
    let toolBar1 = editor.registerToolBarComponent('demo1',require('./toolBar/Demo1.vue'));
    editor.addToolBar(toolBar1);
    //添加工具栏2
    let toolBar2 = editor.registerToolBarComponent('demo2',require('./toolBar/Demo2.vue'));
    editor.addToolBar(toolBar2);
  },
}
</script>

<style>

</style>
