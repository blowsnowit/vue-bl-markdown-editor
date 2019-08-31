<!--清空-->

<template>
    <div class="trash" @click="onClick">
      <i class="fa fa-trash" title="清空"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "trash",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          if(confirm('确定要清空内容吗？')==true){
            this.parent.clearContent();
          }
        }
      },
    }
</script>

<style>
.trash {

}
</style>
