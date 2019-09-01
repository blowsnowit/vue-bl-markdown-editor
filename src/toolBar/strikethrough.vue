<!--中划线-->

<template>
    <div class="strikethrough" @click="onClick">
      <i class="fa fa-strikethrough" title="中划线"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "strikethrough",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('~~','中划线','~~');
        }
      },
    }
</script>

<style>
.strikethrough {

}
</style>
