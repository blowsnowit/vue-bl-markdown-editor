<template>
  <div id="app">
    <mark-down-editor ref="editor" v-model="content"></mark-down-editor>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      content: "```apache\n# rewrite`s rules for wordpress pretty url\nLoadModule rewrite_module  modules/mod_rewrite.so\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . index.php [NC,L]\n\nExpiresActive On\nExpiresByType application/x-javascript  \"access plus 1 days\"\n\nOrder Deny,Allow\nAllow from All\n\n<Location /maps/>\n  RewriteMap map txt:map.txt\n  RewriteMap lower int:tolower\n  RewriteCond %{REQUEST_URI} ^/([^/.]+)\\.html$ [NC]\n  RewriteCond ${map:${lower:%1}|NOT_FOUND} !NOT_FOUND\n  RewriteRule .? /index.php?q=${map:${lower:%1}} [NC,L]\n</Location>\n```"
    }
  },
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
