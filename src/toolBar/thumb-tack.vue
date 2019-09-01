<!--标记-->

<template>
    <div class="thumb-tack" @click="onClick">
      <i class="fa fa-thumb-tack" title="标记"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "thumbTack",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('==','标记','==');
        }
      },
    }
</script>

<style>
.thumb-tack {

}
</style>
