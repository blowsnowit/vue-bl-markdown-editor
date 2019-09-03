<!--点击测试例子-->

<template>
    <div class="Demo1" @click="onClick">
      Ex1
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "Demo1",
      data() {
        return {   //自动注入
          parent: null
        }
      },
      methods: {
        onClick() {
          //在当前编辑器的选择位置插入文本
          this.parent.insertContent('~~','example1','~~');
        }
      },
    }
</script>

<style>
    .Demo1 {

    }
</style>
