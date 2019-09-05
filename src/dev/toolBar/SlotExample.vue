<!--插槽点击测试例子-->

<template>
    <div class="slot-example" @click="onClick">
      SEx
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "SlotExample",
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
          this.parent.insertContent('~~','slotExample','~~');
        }
      },
    }
</script>

<style>
    .slot-example {

    }
</style>
