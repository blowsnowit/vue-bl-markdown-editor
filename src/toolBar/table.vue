<!--表格-->

<template>
    <div class="table" >
      <div ref="markDownName" class="mark-down-name" @mouseenter="close=false">
        <i class="fa fa-table" title="表格"></i>
        <div class="tool-bar-box mark-down-form-box " @click="onClick" @mouseout="xNum=0;yNum=0;" :style="close?'display: none;':''">
          <!--{{xNum}}列 x {{yNum}}行-->
          <div class="unhighlighted" @mousemove="mousemove" >
            <div class="highlighted" :style="'width: '+(xNum===0?0:(xNum*20 +(xNum - 1)*2))+'px; height: '+(yNum===0?0:(yNum*20 +(yNum - 1)*2))+'px'"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "table",
      data() {
        return {
          //动态自动注入
          parent: null,
          close: false,
          xNum: 0,
          yNum: 0,
        }
      },
      methods: {
        onClick() {
          this.close = true;

          let ths = '|';
          let hr = '|';
          let tbody = '';
          for (let i = 1;i<=this.xNum;i++){
            ths += '标题头'+i+'|';
            hr += '---'+'|';
          }
          for (let i = 0;i<this.yNum;i++){
            let tbodyX = '|';
            for (let a = 1;a<=this.xNum;a++){
              tbodyX+='标题内容'+a+'|';
            }
            tbody+= tbodyX+'\n';
          }
          this.parent.insertContent(ths+'\n' +
            hr+'\n' +
            tbody,'','',true);
        },
        mousemove(event){
          let x = event.offsetX;
          let y = event.offsetY;

          for(let a = 0,maxX = 0;a<10;a++){
            if(x >= maxX && x <= maxX + 20){
              this.xNum = a + 1;
              break;
            }else if(x < maxX){
              this.xNum = a;
              break;
            }
            maxX += 20+2;
          }
          for(let a = 0,maxY = 0;a<10;a++){
            if(y >= maxY && y <= maxY + 20){
              this.yNum = a + 1;
              break;
            }else if(y < maxY){
              this.yNum = a;
              break;
            }
            maxY += 20+2;
          }

          console.log('mousemove',x,y,this.xNum,this.yNum);
        }
      },
    }
</script>

<style>
.table {

}
.table .unhighlighted{
  position: relative;
  height: 220px;
  width: 220px;
  background: url(data:image/gif;base64,R0lGODlhFgAWAKECAPj4+Onp6f///////yH5BAEKAAIALAAAAAAWABYAAAJAlI+pFu0P3wmg2otBm7nbzXgeKFDAiaYqaaouyr6yFnCzG99rHepp7jsBg0NfUXe8JWdLGSsChUyiVN7iis1mCwA7) repeat!important;
}
.table .highlighted{
  position: absolute;
  max-height: 220px;
  max-width: 220px;
  background: url(data:image/gif;base64,R0lGODlhFgAWAKECAN3q+8PZ/////////yH5BAEKAAIALAAAAAAWABYAAAJAlI+pFu0P3wmg2otBm7nbzXgeKFDAiaYqaaouyr6yFnCzG99rHepp7jsBg0NfUXe8JWdLGSsChUyiVN7iis1mCwA7) repeat!important;
}
</style>
