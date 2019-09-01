<!--居右-->

<template>
    <div class="align-right" @click="onClick">
      <i class="fa fa-align-right" title="居右"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "alignRight",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('::: hljs-right\n','居右','\n:::');
        }
      },
    }
</script>

<style>
.align-right {

}
</style>
