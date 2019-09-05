<!--hover测试例子-->

<template>
    <div class="example2">
      <div class="mark-down-name" @mouseenter="close=false">
        Ex2
        <div class="tool-bar-box mark-down-form-box" @click="onClick" :style="close?'display: none;':''">
          动态插入hover测试例子,点我试试
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "example2",
      data() {
        return {   //自动注入
          parent: null,
          close: false,   //点击后临时隐藏
        }
      },
      methods: {
        onClick() {
          this.close = true;  //不需要隐藏把这句删除
          //在当前编辑器的选择位置插入文本
          //插入后自动选择到
          this.parent.insertContent('~~','example2','~~',false,false);
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
