# vue-bl-markdown-editor

> 一个基于markdown-it 高度可扩展的vue编辑器组件

> [演示站](https://blowsnowit.github.io/vue-bl-markdown-editor/html/)

![UTOOLS1567330095009.png](https://i.loli.net/2019/09/01/9SZmIP7uiYKkBta.png)

###  安装
```
$ npm install vue-bl-markdown-editor --save
```
### Use (如何引入)

`main.js`:
```javascript
    // 全局注册
    // import with ES6
    import Vue from 'vue'
    import MarkDownEditor from 'vue-bl-markdown-editor'
    import 'vue-bl-markdown-editor/dist/css/main.css'
    // use
    Vue.use(MarkDownEditor);
    new Vue({
        'el': '#main',
        data() {
            return { value: '' }
        }
    })
```
### 配置要求
```html
<!--本组件使用font-awesome字体图标库，请于index.html提前引入-->
<link href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
```

### 配置
|名称|类型|默认值|描述|
|---|---|---|---|
|placeholder|String|请输入内容|提示文本|
|height|Number|500|编辑器高度|
|isShowToolBar|Boolean|true|是否显示工具栏|
|isShowToolBarRight|Boolean|true|是否显示右侧工具栏|
|showMode|String|edit|显示模式，edit,see 编辑/预览模式,isSplit true下无效|
|isShowSplit|Boolean|true|是否分屏，手机只可显示一个，此状态无效|
|toolBars|Array|见下面|工具栏,排序和显示|
|config|Object|见下面|工具栏的配置|

#### 工具栏
|名称|描述|
|---|---|
|bold|粗体|
|italic|斜体|
|header|标题|
|underline|下划线|
|strikethrough|中划线|
|thumb-tack|标记|
|superscript|上角标|
|subscript|下角标|
|align-left|居左|
|align-center|居中|
|align-right|居右|
|quote-left|段落引用|
|list-ol|有序列表|
|list-ul|无须列表|
|link|链接|
|picture|图片|
|code|代码块|
|table|表格|
|emoji|表情|
|undo|上一步|
|repeat|下一步|
|trash|清空|
|about|关于，希望保留|

#### 工具栏配置
```javascript
config = {
  // 配置多个表情
  emojis:[{name:'test',datas:['1','2']}],
  // 配置图片上传
  picture:{
    // 需要传回去上传后的路径
    callback: (file)=>{return 'url';}
  }
}
```

#### 自定义工具栏
```javascript
let editor = this.$refs.editor;
let toolBar1 = editor.registerToolBarComponent('demo1',require('./toolBar/Demo1.vue'));
editor.addToolBar(toolBar1/*,0 插入位置*/);
```

### 方法
|名称|参数|描述|
|---|---|---|
|registerToolBarComponent|组件名,组件|动态注册组件作为工具栏，使用方法看上|
|addToolBar|registerToolBarComponent返回的实例化组件,添加位置（默认最后）|添加工具栏组件|


### 事件
|名称|参数|描述|
|---|---|---|
|input|内容|输入内容|
|ready|markdownit|加载完毕|

### 高级扩展
- 允许自行调用markdownit 注册插件 （从ready事件中获取/直接从ref中获取）


## TODO
- [X] 基础工具栏
- [X] 实现撤销恢复功能 
- [X] 兼容手机
- [X] 样式美化
- [X] 本项目中打包dev演示页面
- [ ] highlight 样式引用（*）
- [ ] 图片上传回调配置
- [ ] 图片粘贴上传
- [ ] 滚动同步

### 测试
- [x] 自定义工具栏
- [x] 表情配置
- [ ] 图片上传
- [ ] 粘贴上传,拖入上传

