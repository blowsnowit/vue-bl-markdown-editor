<!--代码块-->

<template>
    <div class="code">
      <div class="mark-down-name" @mouseenter="close=false">
        <i class="fa fa-code" title="代码块"></i>
        <div class="tool-bar-box mark-down-form-box" :style="close?'display: none;':''">
          <div>
            <select v-model="language" style="width: 100%;" >
              <option v-for="(op,index) in options" :key="index" :value="op">{{op}}</option>
            </select>
          </div>
          <div>
            <textarea rows="10" style="width: 100%;" v-model="code" placeholder="请输入代码"></textarea>
          </div>
          <div>
            <button style="width: 100%;" @click="onClick">确认</button>
          </div>

        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import hljsLangs from '../core/hljs/lang.hljs.js'
    export default {
      name: "code",
      data() {
        return {
          //动态自动注入
          parent: null,
          close: false,
          options:[],
          code: null,
          language: null
        }
      },
      created(){
          for (let key in hljsLangs){
            this.options.push(key);
          }
      },
      methods: {
        onClick() {
          this.close = true;
          if (this.language === null ){
            this.parent.insertContent('```language\n',this.code,'\n```');
          }else{
            this.parent.insertContent('```'+this.language+'\n',this.code,'\n```');
          }

        }
      },
    }
</script>

<style>
.code {

}
.code .mark-down-form-box{
  width: 400px;
}
</style>
