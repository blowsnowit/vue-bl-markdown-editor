<template>
    <div class="mark-down-editor"  :style="'height: '+getHeightStr">
      <div class="tool-bar" v-show="isShowToolBar">
        <span v-show="allToolBars.length<=0">工具栏初始化ing</span>
        <slot name="tool-bar-left-head"></slot>
        <span v-for="(toolBar,index) in allToolBars" :key="index" :ref="toolBar.name"></span>
        <slot name="tool-bar-left-foot"></slot>
        <div style="flex: 1;"></div>
        <div class="tool-right" v-show="isShowToolBarRight">
          <slot name="tool-bar-right-head"></slot>
          <!--预览/编辑模式-->
          <span class="active" v-if="mode === 'edit'" @click.prevent="mode = 'see'"><i class="fa fa-eye-slash" title="编辑"></i> </span>
          <span v-else-if="mode === 'see'" @click.prevent="mode = 'edit'"><i class="fa fa-eye" title="预览"></i></span>
          <template v-if="!isMobile">
            <!--双栏模式 pc显示-->
            <span @click.prevent="isTwo = !isTwo"><i class="fa fa-columns" title="双栏"></i> </span>
          </template>
          <slot name="tool-bar-right-foot"></slot>
        </div>
      </div>
      <div class="container" :class="isTwo?'':'container-column'">
        <div v-show="mode === 'edit' || isTwo" class="box" :style="isTwo?'width: 50%':'width: 100%;'">
          <textarea spellcheck="false" :placeholder="placeholder" ref="editor" v-model="content" class="editor"
                    @input="inputContentHandler"
                    @keydown.tab="keydownTabHandler"
                    @keydown.enter="contentEnterHandler"
                    @scroll="onScrollEditor">
          </textarea>
        </div>
        <div v-show="mode === 'see' || isTwo" class="box markdown-body"
             ref="preview"
             v-html="contentHtml"
             :style="isTwo?'width: 50%':'width: 100%;'"
             @scroll="onScrollPreview">

        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  import md from './lib/Markdown'
  import {
    scrollLink
  } from './lib/MarkdownFunction'


  //工具栏
  const toolBars = [
    'bold', //粗体
    'italic', //斜体
    'header',  //标题
    'underline', //下划线
    'strikethrough', //中划线
    'thumb-tack',  //标记
    'superscript', //上角标
    'subscript',   //下角标
    'align-left',  //居左
    'align-center', //居中
    'align-right',  //居右
    'quote-left',  //段落引用
    'list-ol',     //有序列表
    'list-ul',    //无须列表
    'link',      //链接
    'picture',   //图片
    'code',      //代码块
    'table',     //表格
    'emoji',
    'undo',     //上一步
    'repeat',   //下一步
    'trash',    //清空
    'about',   //关于
  ]
    export default {
        name: "mark-down-editor",
      data() {
        return {
          md: null,
          content: null,
          contentHtml: null,
          allToolBars: [],
          contentHistorys:[],
          contentHistoryIndex: -1 ,   //记录当前撤回到哪里了
          isHistoryDo: false,
          isMobile: false,
          mode: 'edit',
          isTwo: true
        }
      },
      props:{
        value:{
          type: String,
          default: null
        },
        config:{  //自动合并配置文件
          type: Object,
          default: ()=>{
            return {};
          }
        },
        // theme:{   //主题色,允许空 加载自己的样式
        //   type: String,
        //   default: 'github'
        // },
        // codeStyle:{   //主题色,允许空 加载自己的样式
        //   type: String,
        //   default: 'atom-one-dark'
        // },
        toolBars:{  //允许显示的控件
          type: Array,
          default: ()=>toolBars
        },
        placeholder:{
          type: String,
          default: '请输入内容'
        },
        height:{
          type: Number|String,
          default: 500
        },
        isShowToolBar:{
          type: Boolean,
          default: true
        },
        isShowToolBarRight:{
          type: Boolean,
          default: true
        },
        showMode:{
          type: String,
          default: 'edit'
        },
        isShowSplit:{
          type: Boolean,
          default: true
        },
        isSyncScroll:{  //是否同步滚动
          type: Boolean,
          default: true
        }
      },
      watch:{
        value(val){
          this.content = val;
        },
        content(val){
          this.render(val);
          this.$emit('input',val);

          if (this.isHistoryDo){  //拦截一下撤销导致的问题
            this.isHistoryDo = false;
            return;
          }
          //添加到历史记录中
          let oldLenght = this.contentHistorys.length;
          console.log(this.contentHistoryIndex,oldLenght -1);
          if (this.contentHistoryIndex === oldLenght -1){  //验证历史指针是不是在最后
            this.contentHistorys.push(val);
            this.contentHistoryIndex = this.contentHistorys.length - 1;  //指向最后
          }

        }
      },
      created(){

        this.content = this.value;
        this.md = md;
        if (typeof window !== 'undefined') {
          window.markDown = md;
        }

        //添加默认工具栏
        //对象 名字 图标样式 类型  点击事件
        this.initToolBars();

        //初始化数据
        this.isTwo = this.isShowSplit;
        this.mode = this.showMode;
        //查询是不是手机
        this.isMobile = this.checkIsMobile();
        if (this.isMobile){
          this.isTwo = false;
        }

        this.$emit('ready',md);
      },
      computed:{
        getHeightStr(){
          if (typeof this.height === 'number') return this.height+'px';
          return this.height;
        }
      },
      methods: {
        //根据分辨率获取 不准确，只为了兼容显示
        checkIsMobile(){
          if (document.documentElement.clientWidth>=992){
            return false;
          }
          return true;
        },

        //region 工具栏管理
        //初始化工具栏
        initToolBars(){
          for (let toolBarName of this.toolBars){
            let path = `./toolBar/${toolBarName}.vue`;
            console.log();
            this.addToolBarByPath(toolBarName,path);
          }
        },

        //注册后在添加
        addToolBarByPath(name,path){
          //异步导致插入时机不一致
          let component = require(`${path}`);
          let obj = this.registerToolBarComponent(name,component);
          this.addToolBar(obj);
        },
        /**
         * 添加工具栏
         * @param toolBar name instance
         * @param index
         */
        addToolBar(toolBar,index=null){
          if (index==null){
            this.allToolBars.push(toolBar);
          }else{
            this.allToolBars.splice(index,0,toolBar);
          }
          if(toolBar.instance!==undefined){
            this.$nextTick(()=>{
              toolBar.instance.$mount(this.$refs[toolBar.name][0]);
            })
          }
        },

        //删除工具栏
        delToolBar(index){
          this.allToolBars.splice(index,1)
        },
        //动态加载组件 并且挂载当前实例对象

        //动态注册组件（工具栏）
        registerToolBarComponent(name,component){
          let cmp = Vue.extend(component.default);
          let instance = new cmp({
            data:{
              parent: this
            }
          });
          let obj = {};
          obj.name = name;
          obj.instance = instance;
          return obj;
        },
        //endregion

        //region 内容管理
        //重新渲染html
        render(content){
          if (content == null) return;
          this.contentHtml = this.md.render(content);
        },

        // copy mavonEditor/blob/master/src/lib/core/extra-function.js
        // 处理粗体与斜体冲突问题
        judgeItalicAndBold(prefix, subfix, tmpStr, startPos, endPos) {
          if (prefix === '*' && subfix ===  '*') {
            if (tmpStr.substring(startPos - 2, startPos - 1) === '*' && tmpStr.substring(endPos + 1, endPos + 2) === '*') {
              return false
            }
          }
          return true
        },

        /**
         * 插入内容
         * @param prefix  文本前缀
         * @param str   文本内容
         * @param subfix  //文本后缀
         * @param isReplace  是否强制替换内容  默认假 自动替换中间内容为选中内容
         * @param isSelect   是否插入的时候选择
         */
        insertContent(prefix='',str,subfix='',isReplace=false,isSelect=true){
          let obj = this.$refs.editor;
          obj.focus()
          if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            let startPos = obj.selectionStart;
            let endPos = obj.selectionEnd;
            //全部内容
            let tmpStr = obj.value;
            if (startPos === endPos) {  //未选择内容
              // 直接插入
              obj.value = tmpStr.substring(0, startPos) + prefix + str + subfix + tmpStr.substring(endPos, tmpStr.length);
              obj.selectionStart = startPos + prefix.length;
              obj.selectionEnd = startPos + (str.length + prefix.length);
            } else {
              // 存在选中区域
              let selectValue = tmpStr.substring(startPos, endPos);
              if (isReplace){
                selectValue = str;
              }
              if (tmpStr.substring(startPos - prefix.length, startPos) === prefix && tmpStr.substring(endPos, endPos + subfix.length) === subfix && this.judgeItalicAndBold(prefix, subfix, tmpStr, startPos, endPos)) {
                // 取消
                obj.value = tmpStr.substring(0, startPos - prefix.length) + selectValue + tmpStr.substring(endPos + subfix.length, tmpStr.length);
                obj.selectionStart = startPos - prefix.length;
                obj.selectionEnd = endPos - prefix.length;
              } else {
                // 确定
                obj.value = tmpStr.substring(0, startPos) + prefix + selectValue + subfix + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = startPos + prefix.length;
                obj.selectionEnd = startPos + (endPos - startPos + prefix.length);
              }
            }
          } else {
            alert('Error: Browser version is too low')
            // obj.value += str;
          }
          if (!isSelect){
            obj.selectionStart = obj.selectionEnd;
          }
          // 触发change事件
          this.content = obj.value;
          obj.focus()
        },

        //清空内容
        clearContent(){
          this.content = '';
          this.render(this.content);
        },

        //撤销内容  ctrl+z
        undoContent(){
          if (this.contentHistoryIndex - 1 >=0){
            this.content = this.contentHistorys[--this.contentHistoryIndex];
            this.isHistoryDo = true;
          }
        },

        //还原内容  ctrl+y
        //如果内容还原后再次被修改 原来后面的数据会被删除
        redoContent(){
          //防止数组越界
          if (this.contentHistoryIndex + 1 < this.contentHistorys.length){
            this.content = this.contentHistorys[++this.contentHistoryIndex];
            this.isHistoryDo = true;
          }
        },

        inputContentHandler(event){
          //如果手动输入了清空后续的历史记录内容
          this.contentHistorys.splice(this.contentHistoryIndex+1,this.contentHistorys.length-this.contentHistoryIndex+1);
        },
        //endregion


        //region 事件管理
        //监听回车 实现 有序/无序列表 自动出现
        //找到回车的上一行  判断第一个字符是不是列表开头
        contentEnterHandler(event){
          let obj = this.$refs.editor;
          if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart;
            var endPos = obj.selectionEnd;
            var tmpStr = obj.value;
            // 获取光标前最后一行字符串
            let lastContent = tmpStr.substring(0, startPos);
            let contentArr = lastContent.split('\n');
            let lastLine = contentArr.pop();
            let matchListNeedChangeLine = lastLine.match(/^\s*(?:[0-9]+\.|-)\s+\S+/)
            if (matchListNeedChangeLine) {
              // 需要自动产生下一个列表项
              event.preventDefault();
              // eg: [1.  test] 仅获取[1. ]
              let subfix = matchListNeedChangeLine.shift().match(/^\s*(?:[0-9]+\.|-)\s/).shift()
              if (subfix.search(/-/) >= 0) {
                // 无序列表
                obj.value = tmpStr.substring(0, startPos) + '\n' + subfix + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = obj.selectionEnd = startPos + subfix.length + 1
              } else {
                // 有序列表
                let temp = subfix.replace(/(\d+)/, parseInt(subfix) + 1)
                obj.value = tmpStr.substring(0, startPos) + '\n' + temp + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = obj.selectionEnd = startPos + temp.length + 1
              }
            } else {
              let matchListNeedRemoveLine = lastLine.match(/^\s*(?:[0-9]+\.|-)\s+$/)
              if (matchListNeedRemoveLine) {
                // 需要跳出列表
                event.preventDefault()
                let preLength = matchListNeedRemoveLine.shift().length
                obj.value = tmpStr.substring(0, startPos - preLength) + '\n' + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = obj.selectionEnd = startPos - preLength
              }
            }
          } else {
            alert('Error: Browser version is too low')
          }
          this.content = obj.value
          obj.focus();
        },
        //实现tab缩进
        keydownTabHandler(event){
          event.preventDefault();
          this.insertContent('  ','','',false);
        },
        //滚动编辑器事件
        onScrollEditor(event){
          if (!this.isSyncScroll) return;
          scrollLink(event,'editor',this.$refs.editor,this.$refs.preview);
        },
        //滚动预览事件
        onScrollPreview(){
          if (!this.isSyncScroll) return;
          scrollLink(event,'preview',this.$refs.editor,this.$refs.preview);
        }
        //endregion
      },
    }
</script>

<style>

/*工具栏*/
.mark-down-editor .tool-bar{
  box-shadow: 0 0px 3px rgba(0,0,0,0.157), 0 0px 3px rgba(0,0,0,0.227);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0 10px;
  line-height: 35px;
}
.mark-down-editor .tool-bar>div{
  margin-right: 10px;
  cursor: pointer;
}
.mark-down-editor .tool-bar .tool-right{

}
.mark-down-editor .tool-bar .tool-right > span{
  margin-right: 10px;
}
.mark-down-editor .tool-bar>div .mark-down-name{
  position: relative;
}
.mark-down-editor .tool-bar>div .mark-down-name:hover >.tool-bar-box{
  display: block;
}
.mark-down-editor .tool-bar>div .tool-bar-box{
  position: absolute;
  background: #fff;
  min-width: 130px;
  z-index: 1600;
  box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227);
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
  display: none;
  left: -50px;
  border-radius: 5px;
}

.mark-down-editor .tool-bar>div .mark-down-form-box{
  padding: 10px;
}
.mark-down-editor .tool-bar>div .mark-down-form-box >div{
  margin: 10px 0;
}
/*region 下拉框 */
.mark-down-editor .tool-bar>div .mark-down-dropdown{

}
.mark-down-editor .tool-bar>div .mark-down-dropdown >ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.mark-down-editor .tool-bar>div .mark-down-dropdown >ul >li{
  text-align: center;
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
  position: relative;
}
.mark-down-editor .tool-bar>div .mark-down-dropdown >ul >li:hover{
  background: #eaeaea;
}
/*endregion*/


.mark-down-editor {
  display: flex;
  flex-direction: column;
}
.mark-down-editor .container{
  display: flex;
  height: 100%;
}
.mark-down-editor .container.container-column{
  flex-direction: column;
}

.mark-down-editor .container .box{
  /*padding: 8px 25px 15px 25px;*/
  box-shadow: 0 0px 3px rgba(0,0,0,0.157), 0 0px 3px rgba(0,0,0,0.227);
  width: 50%;
  height: 100%;
  background: #fff;
}
.mark-down-editor .container .box.markdown-body{
  overflow: auto;
}
.mark-down-editor .container  .editor{
  width: 99%;
  height: 99%;
  outline: 0 none;
  border: none !important;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
}

.markdown-body .hljs-left{
  text-align: left;
}
.markdown-body .hljs-center{
  text-align: center;
}
.markdown-body .hljs-right{
  text-align: right;
}
.mark-down-render-box{

}
</style>
