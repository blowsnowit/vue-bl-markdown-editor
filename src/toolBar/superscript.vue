<!--上角标-->

<template>
    <div class="superscript" @click="onClick">
      <i class="fa fa-superscript" title="上角标"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "superscript",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('^','上角标','^');
        }
      },
    }
</script>

<style>
.superscript {

}
</style>
