import HZRecorder from "./HZRecorder";


class RecorderUtil {
  constructor(){
    this.recorder = null;
    this.blob = null;
  }

  start() {
    HZRecorder.get((rec)=>{
      this.recorder = rec;
      this.recorder.start();
    });
  }

  stop() {
    console.log('录音结束，录音导出中...');
    this.blob = this.recorder.getBlob();
    console.log('导出成功...',this.blob);
  }
}

export  default  new RecorderUtil();
