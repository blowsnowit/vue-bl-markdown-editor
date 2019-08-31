<!--粗体-->
<template>
    <div class="bold" @click="onClick">
      <i class="fa fa-bold" title="粗体"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "bold",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('**','粗体','**');
        }
      },
    }
</script>

<style>
.bold {

}
</style>
