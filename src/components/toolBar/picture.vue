<!--图片-->

<template>
    <div class="picture">
      <div class="mark-down-name" @mouseenter="close=false">
        <i class="fa fa-photo " title="图片"></i>
        <div class="tool-bar-box mark-down-form-box" :style="close?'display: none;':''">
          <div>
            <input v-model="name" type="text" placeholder="请输入图片名字">
          </div>
          <div>
            <input v-model="url" type="text" placeholder="请输入图片地址">
          </div>
          <div>
            <input type="file" placeholder="上传图片">
          </div>
          <div>
            <button style="width: 100%;" @click="onClick">确认</button>
          </div>

        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "picture",
      data() {
        return {
          //动态自动注入
          parent: null,
          close: false,

          name: null,
          url: null
        }
      },
      methods: {
        onClick() {
          this.close = true;

          this.parent.insertContent('![',this.name,']('+this.url+')');
        }
      },
    }
</script>

<style>
.picture {

}
</style>
