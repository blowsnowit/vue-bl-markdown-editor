@[toc](目录)

# vue-bl-markdown-editor

> 一个基于markdown-it 高度可扩展的vue编辑器组件

> 允许提供插槽自定义工具栏

> 允许通过动态注册组件，允许插入工具栏指定位置

> 优势： 可完全自定义工具栏功能，markdown-it插件调用等

> [演示站](http://markdown-editor.bload.cn/html/)

![11111](https://images.gitee.com/uploads/images/2019/0922/105532_62dec7a6_1130434.png "屏幕截图.png")

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
<!--代码块样式，更多查看 https://highlightjs.org -->
<link href="//cdn.bootcss.com/highlight.js/9.14.1/styles/atom-one-dark.min.css" rel="stylesheet">
<!--编辑器主题颜色-->
<link href="//cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css" rel="stylesheet">

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
|isSyncScroll|Boolean|true|是否同步滚动|



#### 工具栏
> 开发工具栏例子查看 src/dev/toolBar

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
|separator|分隔符|
#### 工具栏配置
```javascript
config: {
  emojis:{
    // 配置多个表情
    more:[{name:'test',datas:['1','2']}],
    //是否覆盖默认的
    isCover: true
  },
  // 配置图片上传
  picture:{
    // 需要传回去上传后的路径
    // from paste/drag/upload 粘贴/拖拽/上传
    // 回调 异步请使用promise 案例看 src/dev/App.vue 
    uploadCallback: (file,from)=>{
      return new Promise(resolve => {
        resolve({name:'',url: ''});
      });
    },
    // 是否解析图片列表
    resolving: true
  }
}
toolBars:[
  'bold','italic',...更多
]
```

#### 自定义工具栏
```javascript
let editor = this.$refs.editor;
let toolBar1 = editor.registerToolBarComponent('demo1',require(Example1.vue));
editor.addToolBar(toolBar1/*,0 插入位置*/);
```

### 方法
|名称|参数|描述|
|---|---|---|
|registerToolBarComponent|组件名,组件|动态注册组件作为工具栏，使用方法看上|
|addToolBar|registerToolBarComponent返回的实例化组件,添加位置（默认最后）|添加工具栏组件|
|delToolBar|删除位置|删除指定位置工具栏（不包括通过插槽加入的）|
|insertContent|前缀,内容,后缀,是否强制替换内容,是否插入的时候选择|插入内容|

### 事件
|名称|参数|描述|
|---|---|---|
|input|内容|输入内容|
|ready|markdownit|加载完毕|

### 插槽
|名称|描述|
|---|---|
|tool-bar-left-head|工具栏左侧头部插槽|
|tool-bar-left-foot|工具栏左侧尾部插槽|
|tool-bar-right-head|工具栏右侧头部插槽|
|tool-bar-right-foot|工具栏右侧尾部插槽|

### 高级扩展
- 允许自行调用markdownit 注册插件 （从ready事件中获取/直接从ref中获取）


## TODO
- [X] 基础工具栏
- [X] 实现撤销恢复功能 
- [X] 兼容手机
- [X] 样式美化
- [X] 本项目中打包dev演示页面
- [X] highlight 样式引用（*）
- [X] 图片上传回调配置
- [X] 图片粘贴上传
- [x] 图片拖拽上传
- [x] 同步滚动(暂时按滚动条高度计算**)
> 录音兼容问题（测试chrom/firefox正常,edge申请失败）

> 必须运行在 https 下 测试可以正常运行
- [x] 自定义录音工具栏组件(*) 
- [ ] 本地图片粘贴上传不支持（待解决）
## 测试
- [x] 自定义工具栏
- [x] 表情配置
- [X] 图片上传
- [X] 粘贴上传
- [x] 拖入上传

## BUG
- [X] 最底部插入列表无法自动换行到下一行显示（使用回车自动向下滚动）
- [ ] 手机模式下工具栏最后一栏位置异常（pc模拟手机 还原不了无法测试）
- [ ] 实时渲染 太卡导致连输，不正常显示
#### 希望大家一起开发好用的工具栏吧

## 赞助
![UTOOLS1567434353534.png](https://images.gitee.com/uploads/images/2019/0909/094047_e4635129_1130434.png)
