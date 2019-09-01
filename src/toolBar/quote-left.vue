<!--段落引用-->

<template>
    <div class="quote-left" @click="onClick">
      <i class="fa fa-quote-left" title="段落引用"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "quoteLeft",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
      methods: {
        onClick() {
          this.parent.insertContent('> ','段落引用','');
        }
      },
    }
</script>

<style>
.quote-left {

}
</style>
