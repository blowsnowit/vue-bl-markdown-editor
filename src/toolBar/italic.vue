<!--斜体-->

<template>
    <div class="italic" @click="onClick">
      <i class="fa fa-italic" title="斜体"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "italic",
      data() {
        return {
          //动态自动注入
          parent: null
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('*','斜体','*');
        }
      },
    }
</script>

<style>
.italic {

}
</style>
