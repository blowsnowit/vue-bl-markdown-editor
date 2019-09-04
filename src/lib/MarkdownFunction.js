/**
 * 滚动条联动
 */
let mainFlag = false; // 抵消两个滚动事件之间互相触发
let preFlag = false; // 如果两个 flag 都为 true，证明是反弹过来的事件引起的
export const scrollLink = (event, who,editor,preview) => {
  let radio = (editor.scrollHeight - editor.clientHeight) / (preview.scrollHeight - preview.clientHeight);
  if(who == 'preview'){
    preFlag = true;
    if (mainFlag === true){ // 抵消两个滚动事件之间互相触发
      mainFlag = false;
      preFlag = false;
      return;
    }
    // console.log(who,radio,preview.scrollHeight,editor.scrollHeight);
    editor.scrollTop = Math.round(preview.scrollTop * radio);
    return;
  }
  if(who == 'editor'){
    mainFlag = true;
    if (preFlag === true){ // 抵消两个滚动事件之间互相触发
      mainFlag = false;
      preFlag = false;
      return;
    }
    // console.log(who,radio);
    preview.scrollTop = Math.round( editor.scrollTop / radio);
    return;
  }
}

