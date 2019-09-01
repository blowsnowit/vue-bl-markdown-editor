<template>
    <div class="Demo2" @click="onClick">
      DEMO2
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "Demo2",
      data() {
        return {   //自动注入
          parent: null
        }
      },
      methods: {
        onClick() {
          alert('demo2')
        }
      },
    }
</script>

<style>
    .Demo2 {

    }
</style>
