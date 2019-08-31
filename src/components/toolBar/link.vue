<!--链接-->

<template>
    <div class="link" >
      <div class="mark-down-name" @mouseenter="close=false">
        <i class="fa fa-link" title="链接"></i>
        <div class="tool-bar-box mark-down-form-box" :style="close?'display: none;':''">
          <div>
            <input v-model="name" type="text" placeholder="请输入链接描述">
          </div>
          <div>
            <input v-model="url" type="text" placeholder="请输入链接地址">
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
        name: "link",
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

          this.parent.insertContent('['+this.name+'](',this.url,')',true);
        }
      },
    }
</script>

<style>
.link {

}
.link .mark-down-dropdown{
  flex-direction: column;
}
</style>
