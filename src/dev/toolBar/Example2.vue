<!--hover测试例子-->

<template>
    <div class="example2">
      <div class="mark-down-name">
        Ex2
        <div class="tool-bar-box mark-down-form-box" @click="onClick">
          简单的hover显示,点我试试
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "example2",
      data() {
        return {   //自动注入
          parent: null
        }
      },
      methods: {
        onClick() {
          alert('example2')
        }
      },
    }
</script>

<style>
.example2 {

}
.example2 .mark-down-form-box{
  width: 200px;
  text-align: center;
 }
</style>
