<!--高级 录音 工具栏-->

<template>
    <div class="audio">
      <i v-if="!isStart" class="fa fa-microphone-slash" title="开始录制" @click="start"></i>
      <i v-else class="fa fa-microphone" title="停止录制" @click="stop" style="color: red;"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    import RecorderUtil from "../utils/RecorderUtil";

    export default {
        name: "Audio",
      data() {
        return {   //自动注入
          parent: null,

          isStart: false,
          config: {}
        }
      },
      created(){
        this.config = this.parent.config.audio;
      },
      methods: {
        onClick(name,url) {
          this.parent.insertContent('![',name,']('+url+')');
        },
        start() {
          this.isStart = true;
          RecorderUtil.start();
        },
        stop(){
          this.isStart = false;
          RecorderUtil.stop();
          let blob = RecorderUtil.blob;
          let file = new File([blob], 'audio.wav', {type: blob.type});
          this.uploadFile(file);
        },
        uploadFile(file){
          console.log('uploadFile',file);
          this.config.uploadCallback(file).then(data=>{
            console.log('上传完毕回调',data);
            this.onClick(data.name,data.url);
          });
        }
      },
    }
</script>

<style>
.audio {

}
.markdown-body .audioplayer{
  height: 20px;
}
.markdown-body .audioplayer:focus{
  outline: none;
}
</style>
