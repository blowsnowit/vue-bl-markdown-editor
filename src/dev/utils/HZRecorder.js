//兼容
window.URL = window.URL || window.webkitURL;
// navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

let HZRecorder = function (stream, config) {
  config = config || {};
  config.sampleBits = config.sampleBits || 8;      //采样数位 8, 16
  config.sampleRate = config.sampleRate || (44100 / 6);   //采样率(1/6 44100)

  let context = new (window.webkitAudioContext || window.AudioContext)();
  let audioInput = context.createMediaStreamSource(stream);
  let createScript = context.createScriptProcessor || context.createJavaScriptNode;
  let recorder = createScript.apply(context, [4096, 1, 1]);
  let mediaRecorder = new MediaRecorder(stream);
  let blob = null;
  let onStop = null;

  let audioData = {
    inputSampleRate: context.sampleRate    //输入采样率
    , inputSampleBits: 16       //输入采样数位 8, 16
    , outputSampleRate: config.sampleRate    //输出采样率
    , oututSampleBits: config.sampleBits       //输出采样数位 8, 16
    , compress: function (data) { //合并压缩  data 为 buffer
      //压缩
      let compression = parseInt(this.inputSampleRate / this.outputSampleRate);
      let length = data.length / compression;
      let result = new Float32Array(length);
      let index = 0, j = 0;
      while (index < length) {
        result[index] = data[j];
        j += compression;
        index++;
      }
      return result;
    }
    , encodeWAV: function (inBuffer) {
      let sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
      let sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
      let bytes = this.compress(inBuffer);
      let dataLength = bytes.length * (sampleBits / 8);
      let buffer = new ArrayBuffer(44 + dataLength);
      let data = new DataView(buffer);
      let channelCount = 1;//单声道
      let offset = 0;

      let writeString = function (str) {
        for (let i = 0; i < str.length; i++) {
          data.setUint8(offset + i, str.charCodeAt(i));
        }
      }

      // 资源交换文件标识符
      writeString('RIFF'); offset += 4;
      // 下个地址开始到文件尾总字节数,即文件大小-8
      data.setUint32(offset, 36 + dataLength, true); offset += 4;
      // WAV文件标志
      writeString('WAVE'); offset += 4;
      // 波形格式标志
      writeString('fmt '); offset += 4;
      // 过滤字节,一般为 0x10 = 16
      data.setUint32(offset, 16, true); offset += 4;
      // 格式类别 (PCM形式采样数据)
      data.setUint16(offset, 1, true); offset += 2;
      // 通道数
      data.setUint16(offset, channelCount, true); offset += 2;
      // 采样率,每秒样本数,表示每个通道的播放速度
      data.setUint32(offset, sampleRate, true); offset += 4;
      // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
      data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
      // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
      data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
      // 每样本数据位数
      data.setUint16(offset, sampleBits, true); offset += 2;
      // 数据标识符
      writeString('data'); offset += 4;
      // 采样数据总数,即数据总大小-44
      data.setUint32(offset, dataLength, true); offset += 4;
      // 写入采样数据
      if (sampleBits === 8) {
        for (let i = 0; i < bytes.length; i++, offset++) {
          let s = Math.max(-1, Math.min(1, bytes[i]));
          let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
          val = parseInt(255 / (65535 / (val + 32768)));
          data.setInt8(offset, val, true);
        }
      } else {
        for (let i = 0; i < bytes.length; i++, offset += 2) {
          let s = Math.max(-1, Math.min(1, bytes[i]));
          data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
      }

      return new Blob([data], { type: 'audio/wav' });
    }
  };


  //开始录音
  this.start = function () {
    if (mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
    mediaRecorder.start();
    console.log(mediaRecorder.state);
  }

  //停止
  this.stop = function () {
    mediaRecorder.stop();
  }

  //获取音频文件
  this.getBlob = function () {
    console.log(this.blob);
    return new Promise(resolve => {
      resolve(this.blob)
      // return;
      // //转换blob为 buffer
      // let reader = new FileReader();
      // //byte为blob对象
      // reader.readAsArrayBuffer(this.blob);
      // reader.onload= ()=>{
      //   console.log(reader.result);
      //   let buffer = new Uint8Array(reader.result);
      //   console.log('转换数据',buffer);
      //   resolve(audioData.encodeWAV(buffer));
      // }
    })
  }

  //回放
  this.play = function (audio) {
    audio.src = window.URL.createObjectURL(this.getBlob());
  }

  mediaRecorder.onstop  = e=>{
    console.log('onstop ',e);
    this.getBlob().then((blob)=>{
      console.log('转换完毕数据',blob);
      this.onStop(blob);
    })
  }

  mediaRecorder.ondataavailable = e=>{
    this.blob = e.data;
    console.log('数据采集',this.blob);
  }
  //音频采集
  recorder.onaudioprocess = function (e) {
    audioData.input(e.inputBuffer.getChannelData(0));
    //record(e.inputBuffer.getChannelData(0));
  }

};
//抛出异常
HZRecorder.throwError = function (message) {
  alert(message);
  throw new function () { this.toString = function () { return message; } }
}
//是否支持录音
HZRecorder.canRecording = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia != null);
//获取录音机
HZRecorder.get = function (callback, config) {
  if (callback) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream=>{
        let rec = new HZRecorder(stream, config);
        callback(rec);
      }).catch(error=>{
        console.log('申请',error);
        switch (error.code || error.name) {
          case 'PERMISSION_DENIED':
          case 'PermissionDeniedError':
          case 'NotAllowedError':
            HZRecorder.throwError('用户拒绝提供录音权限。');
            break;
          case 'NOT_SUPPORTED_ERROR':
          case 'NotSupportedError':
            HZRecorder.throwError('浏览器不支持硬件设备。');
            break;
          case 'MANDATORY_UNSATISFIED_ERROR':
          case 'MandatoryUnsatisfiedError':
            HZRecorder.throwError('无法发现指定的硬件设备。');
            break;
          default:
            HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
            break;
        }
      })
    } else {
      HZRecorder.throwError('当前浏览器不支持录音功能。'); return;
    }
  }
}





export  default HZRecorder;
