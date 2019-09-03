<template>
  <div id="app">
    <mark-down-editor ref="editor" v-model="content" height="95vh" :config="config"></mark-down-editor>
  </div>
</template>

<script>
import http from './utils/axios';
export default {
  name: 'app',
  data() {
    return {
      content: "```apache\n# rewrite`s rules for wordpress pretty url\nLoadModule rewrite_module  modules/mod_rewrite.so\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . index.php [NC,L]\n\nExpiresActive On\nExpiresByType application/x-javascript  \"access plus 1 days\"\n\nOrder Deny,Allow\nAllow from All\n\n<Location /maps/>\n  RewriteMap map txt:map.txt\n  RewriteMap lower int:tolower\n  RewriteCond %{REQUEST_URI} ^/([^/.]+)\\.html$ [NC]\n  RewriteCond ${map:${lower:%1}|NOT_FOUND} !NOT_FOUND\n  RewriteRule .? /index.php?q=${map:${lower:%1}} [NC,L]\n</Location>\n```",
      config: {
        // 配置多个表情
        emojis:[{name:'test',datas:['表情1','表情2']}],
        // 配置图片上传
        picture:{
          // 需要传回去上传后的路径
          uploadCallback: this.upload
        }
      },
      // toolBars:[
      //   'about','bold','italic'
      // ]
    }
  },
  mounted(){
    console.log(this.$refs.editor);
    let editor = this.$refs.editor;

    //添加工具栏1
    let toolBar1 = editor.registerToolBarComponent('demo1',require('./toolBar/Example1.vue'));
    editor.addToolBar(toolBar1);
    //添加工具栏2
    let toolBar2 = editor.registerToolBarComponent('demo2',require('./toolBar/Example2.vue'));
    editor.addToolBar(toolBar2);
  },
  methods: {
    upload(file,from) {
      console.log('upload',file);
      let data = new FormData();
      data.append('smfile',file);
      //请自行解决跨域问题
      //此处仅限测试使用
      return new Promise(resolve => {
        http.requestPost({
          api: "https://sm.ms/api/upload",
          param: data
        }).then(response=>{
          resolve({url: response.data.url,name: response.data.filename});
        })
      })
    }
  },
}
</script>

<style>

</style>
