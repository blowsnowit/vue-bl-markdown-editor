<template>
  <div id="app">
    <mark-down-editor ref="editor" v-model="content" height="95vh" :config="config">
      <slot-example1 slot="tool-bar-left-head" :parent="parent"></slot-example1>
      <slot-example2 slot="tool-bar-left-foot" :parent="parent"></slot-example2>
    </mark-down-editor>
  </div>
</template>

<script>
import http from './utils/axios';
import SlotExample1 from "./toolBar/SlotExample1";
import SlotExample2 from "./toolBar/SlotExample2";
export default {
  name: 'app',
  components: {SlotExample2, SlotExample1},
  data() {
    return {
      content: "",
      config: {
        // 配置多个表情
        emojis:[{name:'test',datas:['表情1','表情2']}],
        // 配置图片上传
        picture:{
          // 需要传回去上传后的路径
          uploadCallback: this.upload
        },
        audio:{
          // 需要传回去上传后的路径
          uploadCallback: this.upload
        }
      },
      parent: null
      // toolBars:[
      //   'about','bold','italic'
      // ]
    }
  },
  mounted(){
    console.log(this.$refs.editor);
    let editor = this.$refs.editor;
    this.parent = editor;
    console.log(this.parent);
    editor.md.use(require('markdown-it-html5-embed'),{
      html5embed: {
        useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default)
        useLinkSyntax: true,   // Enables video/audio embed with []() syntax
        attributes: {
          'audio': 'width="320" height="30" controls class="audioplayer"',
          'video': 'width="320" height="240" class="audioplayer" controls'
        },
        isAllowedHttp: true
      },

    });
    console.log(editor.md);
    //添加工具栏1
    let toolBar1 = editor.registerToolBarComponent('demo1',require('./toolBar/Example1.vue'));
    editor.addToolBar(toolBar1);
    //添加工具栏2
    let toolBar2 = editor.registerToolBarComponent('demo2',require('./toolBar/Example2.vue'));
    editor.addToolBar(toolBar2);

    //添加录音工具栏
    let audio = editor.registerToolBarComponent('audio',require('./toolBar/Audio.vue'));
    editor.addToolBar(audio);
  },
  methods: {
    upload(file,from) {
      console.log('upload',file);
      let data = new FormData();
      data.append('file',file);
      //请自行解决跨域问题
      //此处仅限测试使用(1小时自动删除文件，请勿非测试使用)
      return new Promise((resolve,reject) => {
        http.requestPost({
          api: "http://file.bload.cn:8099/api/upload",
          param: data
        }).then(response=>{
          if (response.code === 1){
            resolve({url: "http://file.bload.cn:8099/"+response.url,name: response.filename});
          }else{
            alert('上传失败');
            reject(response.data);
          }
        })
      })
    }
  },
}
</script>

<style>

</style>
