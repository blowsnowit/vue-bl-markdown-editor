<!--居中-->

<template>
    <div class="align-center" @click="onClick">
      <i class="fa fa-align-center" title="居中"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "alignCenter",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('::: hljs-center\n','居中','\n:::');
        }
      },
    }
</script>

<style>
.align-center {

}
</style>
