<!--下角标-->

<template>
    <div class="subscript" @click="onClick">
      <i class="fa fa-subscript" title="下角标"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "subscript",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('~','下角标','~');
        }
      },
    }
</script>

<style>
.subscript {

}
</style>
