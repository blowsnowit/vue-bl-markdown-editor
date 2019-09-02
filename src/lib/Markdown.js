/**
 * 使用 markdown-it 解析
 * 默认功能：
 * 代码块(>),无序列表(-),标题(#)
 */

const markdownIt = require('markdown-it');
//region使用插件
// 表情
const emoji = require('markdown-it-emoji');
// 下标
const sub = require('markdown-it-sub')
// 上标
const sup = require('markdown-it-sup')
// <dl/>
const deflist = require('markdown-it-deflist')
// <abbr/>
const abbr = require('markdown-it-abbr')
// footnote
const footnote = require('markdown-it-footnote')
// insert 带有下划线 样式 ++ ++
const insert = require('markdown-it-ins')
// mark
const mark = require('markdown-it-mark')
// taskLists
const taskLists = require('markdown-it-task-lists')
// container
const container = require('markdown-it-container')
//
const toc = require('markdown-it-toc')
// math katex
const katex = require('markdown-it-katex-external');
const miip = require('markdown-it-images-preview');

const mihe = require('markdown-it-highlightjs-external');
import hljsLangs from '../core/hljs/lang.hljs.js'
const hljs = require('highlight.js');
const missLangs = {};
const needLangs = [];
const hljs_opts = {
  hljs: 'auto',
  highlighted: true,
  langCheck: function(lang) {
    console.log(langCheck);
    if (lang && hljsLangs[lang] && !missLangs[lang]) {
      missLangs[lang] = 1;
      needLangs.push(hljsLangs[lang])
    }
  }
};
//endregion
const defaultConfig = {
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,        // Use '/' to close single tags (<br />).
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-',  // CSS language prefix for fenced blocks. Can be
  linkify: false,        // 自动识别url
  typographer: true,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    console.log('highlight',str, lang);
    if (lang && hljsLangs[lang]) {
      return '<pre><div class="hljs"><code class="' + lang + '">' + md.utils.escapeHtml(str) + '</code></div></pre>';
    }
    return '<pre><code class="' + lang + '">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
}
const md = new markdownIt(defaultConfig);

const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  var aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};


md.use(mihe, hljs_opts)
  .use(emoji)
  .use(sup)
  .use(sub)
  .use(container)
  .use(container, 'hljs-left') /* align left */
  .use(container, 'hljs-center')/* align center */
  .use(container, 'hljs-right')/* align right */
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(insert)
  .use(mark)
  .use(container)
  .use(miip)
  .use(katex)
  .use(taskLists)
  .use(toc)

export default md;
