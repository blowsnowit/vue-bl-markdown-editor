<template>
    <div class="emoji">
      <div class="mark-down-name" @mouseenter="close=false">
        <i class="fa fa-smile-o" title="表情"></i>
        <div class="tool-bar-box mark-down-form-box" :style="close?'display: none;':''">
          <div class="emoji-name-list">
            <span v-for="(e,index) in emojis" :class="e.name === tabName?'active':''" :key="index" @click="tabName = e.name">{{e.name}}</span>
          </div>
          <div class="emoji-list" v-for="(e,index) in emojis" :key="index" v-show="e.name === tabName">
            <span v-for="(emoji,index2) in e.datas" :key="index2" @click="onClick(emoji)">{{emoji}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "emoji",
      data() {
        return {
          //动态自动注入
          parent: null,
          close: false,

          tabName: 'emoji',
          emojis:[
            {
              name: 'emoji',
              datas:[
                '😀','😁','😂','🤣','😃','😄',
                '😅','😆','😉','😊','😋','😎',
                '😍','😘','😗','😙','😚','🙂',
                '🤗','🤔','😐','😑','😶','🙄',
                '😏','😣','😥','😮','🤐','😯',
                '😪','😫','😴','😌','😛','😜',
                '😝','🤤','😒','😓','😔','😕',
                '🙃','🤑','😲','🙁','😖','😞',
                '😟','😤','😢','😭','😦','😧',
                '😨','😩','😬','😰','😱','😳','😵',
              ]
            }
          ],

          config: null
        }
      },
      created(){
        //从配置文件中合并表情
        this.config = this.parent.config.emojis;
        if (this.config.isCover){  //覆盖
          this.emojis = [];
        }
        let emojis = this.config.more;
        if (emojis!==undefined && emojis.length>0){
          this.emojis = [...this.emojis,...emojis];
        }
        this.tabName = this.emojis[0].name;
      },
      methods: {
        onClick(emoji) {
          this.close = true;
          this.parent.insertContent('',emoji,'',true);
        }
      },
    }
</script>

<style>
    .emoji {

    }
  .emoji .tool-bar-box{
    width: 300px;
  }
  .emoji .emoji-name-list >span{
    color: #9ABBC8;
    padding: 5px;
  }
  .emoji .emoji-name-list >span.active{
    background: #F0F0F0;
  }


  .emoji .emoji-list{
    display: flex;
    flex-wrap: wrap;
  }
  .emoji .emoji-list >span{
    text-align: center;
    padding: 4px 2px;
    margin: -1px 0 0 -1px;
    border: 1px solid #e8e8e8;
  }
  .emoji .emoji-list >span:hover{
    border: 1px solid #0095cd;
    z-index: 2;
  }

</style>
