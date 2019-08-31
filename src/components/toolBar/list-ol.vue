<!--有序列表-->

<template>
    <div class="list-ol" @click="onClick">
      <i class="fa fa-list-ol" title="有序列表"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "listOl",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('1. ','有序列表','');
        }
      },
    }
</script>

<style>
.list-ol {

}
</style>
