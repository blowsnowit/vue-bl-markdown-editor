<!--关于-->

<template>
    <div class="about">
      <div class="mark-down-name">
        <i class="fa fa-info" title="关于"></i>
        <div class="tool-bar-box mark-down-form-box">
          <div style="display: flex;align-items: center;justify-content: center;">
            <span>本项目已开源</span>
            <iframe src="https://ghbtns.com/github-btn.html?user=blowsnowit&repo=vue-bl-markdown-editor&type=star&count=true" frameborder="0" scrolling="0" width="80px" height="20px"></iframe>
          </div>
          <div>
            基于：vue + markdownit 渲染
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "about",
      data() {
        return {
          //动态自动注入
          parent: null,
        }
      },
    }
</script>

<style>
.about {

}
  .about .mark-down-form-box{
    width: 250px;
    text-align: center;
  }
.about .mark-down-form-box p{
  margin: 0;
}
</style>
