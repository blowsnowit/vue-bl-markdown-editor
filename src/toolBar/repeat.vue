<!--下一步-->

<template>
    <div class="repeat" @click="onClick">
      <i class="fa fa-repeat" title="下一步"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "repeat",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.redoContent();
        }
      },
    }
</script>

<style>
.repeat {

}
</style>
