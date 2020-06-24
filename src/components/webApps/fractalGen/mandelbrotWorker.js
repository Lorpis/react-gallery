
import React from 'react';

export default  () => {
var i = 0;


  i = i + 1;
  postMessage(i);
  setTimeout("BrotWorker()",500);

}



 