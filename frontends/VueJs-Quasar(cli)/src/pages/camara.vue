<template>
  <q-page class="full-width q-pa-md">

	<!—Aquí el video embebido de la webcam -->
	<div class="video-wrap">
	<video id="video" playsinline autoplay></video>
	</div>
	<!—El elemento canvas -->
	<div class="controller">
	<button id="snap">Capture</button>
	</div>
	<!—Botón de captura -->
	<canvas id="canvas" width="640" height="480"></canvas> 
  
  </q-page>
</template>

<script>
	
'use strict';

const video = document.getElementById('video');
const snap = document.getElementById("snap");
const canvas = document.getElementById('canvas');
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
audio: true,
video: {
width: 800, height: 600
}
};

// Acceso a la webcam
async function init() {
try {
const stream = await navigator.mediaDevices.getUserMedia(constraints);
handleSuccess(stream);
} catch (e) {
errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
}
}
// Correcto!
function handleSuccess(stream) {
window.stream = stream;
video.srcObject = stream;
}
// Load init
init();
// Dibuja la imagen
var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
context.drawImage(video, 0, 0, 640, 480);
});
  export default {
    data () {
      return {
      }
    }
  }
	
</script>

</body>
</html>