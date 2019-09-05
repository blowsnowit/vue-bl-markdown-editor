<!--插槽点击测试例子-->

<template>
    <div class="slot-example1" @click="onClick">
      SEx1
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "slotExample1",
      data() {
        return {

        }
      },
      props:{
        parent:{}
      },
      methods: {
        onClick() {
          //在当前编辑器的选择位置插入文本
          this.parent.insertContent('~~','slotExample1','~~');
        }
      },
    }
</script>

<style>
    .slot-example1 {

    }
</style>
