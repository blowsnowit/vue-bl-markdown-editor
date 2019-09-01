<template>
    <div class="Demo1" @click="onClick">
        DEMO1
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
          alert('demo1')
        }
      },
    }
</script>

<style>
    .Demo1 {

    }
</style>
