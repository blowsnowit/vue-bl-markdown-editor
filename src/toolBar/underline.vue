<template>
    <div class="underline" @click="onClick">
      <i class="fa fa-underline" title="下划线"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "underline",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('++','下划线','++');
        }
      },
    }
</script>

<style>
.underline {

}
</style>
