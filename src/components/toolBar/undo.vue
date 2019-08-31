<!--上一步-->

<template>
    <div class="undo" @click="onClick">
      <i class="fa fa-undo" title="上一步"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "undo",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {  //触发撤销
          this.parent.undoContent();
        }
      },
    }
</script>

<style>
.undo {

}
</style>
