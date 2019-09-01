<!--居左-->

<template>
    <div class="align-left" @click="onClick">
      <i class="fa fa-align-left" title="居左"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "alignLeft",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('::: hljs-left\n','居左','\n:::');
        }
      },
    }
</script>

<style>
.align-left {

}
</style>
