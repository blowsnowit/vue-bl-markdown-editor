<!--标题-->

<template>
    <div class="header">
      <div class="mark-down-name" @mouseenter="close=false">
        <span><i class="fa fa-header" title="标题"></i></span>
        <div class="tool-bar-box mark-down-dropdown" :style="close?'display: none;':''">
          <ul>
            <li v-for="(op,index) in options" :key="index" @click="changH(op)">{{op.name}}</li>
          </ul>
        </div>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "header",
      data() {
        return {
          //动态自动注入
          parent: null,
          close: false,

          options:[
            {name: 'H1',value: '# '},
            {name: 'H2',value: '## '},
            {name: 'H3',value: '### '},
            {name: 'H4',value: '#### '},
            {name: 'H5',value: '##### '},
            {name: 'H6',value: '###### '},
          ]
        }
      },
      methods: {
        changH(op){
          this.close = true;

          this.parent.insertContent(op.value,op.name,'');
        }
      },
    }
</script>

<style>
.header {
  position: relative;
}
</style>
