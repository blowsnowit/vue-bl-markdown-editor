<!--无序列表-->

<template>
    <div class="list-ul" @click="onClick">
      <i class="fa fa-list-ul" title="无序列表"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "listUl",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('- ','无序列表','');
        }
      },
    }
</script>

<style>
.list-ul {

}
</style>
