# vue-bl-markdown-editor

> 一个基于markdown-it 高度可扩展的vue编辑器组件

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

### 配置
|名称|类型|默认值|描述|
|---|---|---|---|
|toolBars|Array|见下面|工具栏,排序和显示|
|placeholder|String|请输入内容|提示文本|
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

#### 工具栏配置
####### 配置多个表情
```javascript
config.emojis = [{name:'test',datas:['1','2']}];
```

####### 配置图片上传
```javascript
config.picture = {
  // 需要传回去上传后的路径
  callback: (file)=>{return 'url';}
};
```


## TODO
- [X] 基础工具栏
- [X] 实现撤销恢复功能 
- [X] 兼容手机
- [X] 样式美化
- [ ] 图片上传回调配置
- [ ] 图片粘贴上传
- [ ] 滚动同步


