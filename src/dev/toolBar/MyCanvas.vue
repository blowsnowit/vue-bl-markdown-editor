<template>
    <div class="canvas">
      <span @click="openCanvas">can</span>
      <div class="canvas-box">
        <div id="actions" class="actions">
          <i class="fa fa-pencil" aria-hidden="true"></i>
          <i class="fa fa-eraser" aria-hidden="true"></i>
          <i class="fa fa-trash" aria-hidden="true"></i>
          <i class="fa fa-download" aria-hidden="true"></i>
        </div>
        <div class="colors">
          <span v-for="(color,index) in colors" :key="index" :style="'background: '+color"
                :class="activeColor===color?'active':''"
                @click="activeColor=color"></span>
          <!--自定义颜色-->
          <span style="background: linear-gradient(45deg, #a5a5a5, #b9929200);background-size: 10px 10px;"></span>
        </div>
        <canvas ref="canvas" @mousedown="drawStart" @mouseup="drawEnd" @mousemove="draw"></canvas>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "Canvas",
      props:{
        parent:{}
      },
      data() {
        return {
          colors: [
            'red','green','blue'
          ],
          activeColor: 'red',
          isDrawStart: false,

          ctx: null,
          lastPoint: null
        }
      },
      methods: {
        openCanvas() {

        },
        windowToCanvas(x, y) {
          let canvas = this.$refs.canvas;
          let bbox = canvas.getBoundingClientRect();
          console.log(bbox);
          return {
            x : x - bbox.left * (canvas.width / bbox.width),
            y : y - bbox.top * (canvas.height / bbox.width)
          };
        },
        drawStart(event){
          this.isDrawStart = true;
          console.log('drawStart',event);
          let canvas = this.$refs.canvas;
          let ctx = canvas.getContext("2d");
          ctx.lineWidth = 5;
          this.ctx = ctx;

          this.lastPoint = {
            x: event.pageX,
            y: event.pageY
          }
        },
        drawEnd(event){
          this.isDrawStart = false;
        },
        draw(event){
          if (!this.isDrawStart) return;
          let x = event.pageX;
          let y = event.pageY;

          this.drawLine(this.lastPoint.x,this.lastPoint.y,x,y);
        },
        drawLine(x1, y1, x2, y2) {
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.stroke();
          this.ctx.closePath();

          this.lastPoint = {
            x: x2,
            y: y2
          }
        }
      },
    }
</script>

<style>
.canvas {

}
.canvas .canvas-box{
  width: 70vw;
  height: 80vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 3;
  box-shadow: 0px 0px 5px 1px #5a5a5a;;
}
.canvas .canvas-box canvas{
  width: 100%;
  height: 100%;
}
.canvas .canvas-box .actions{
  position: absolute;
  left: 20px;
}
.canvas .canvas-box .colors{
  position: absolute;
  top: 40px;
  left: 20px;
  display: flex;
  flex-direction: column;
}
.canvas .canvas-box .colors>span{
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin: 10px 0;
  transition: all .3s;
}
.canvas .canvas-box .colors>span.active{
  box-shadow: 0 0 3px rgba(0,0,0,.95);
  transform: scale(1.2);
}
</style>
