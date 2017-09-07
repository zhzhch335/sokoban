function move(obj, opt) {
    var mover;
    switch (opt) {
        case "↑":
            if (mover) {
                clearInterval(mover);
            }
            var count = 0;
            mover = setInterval(function() {
                if (count == 50) {
                    clearInterval(mover);
                } else {
                    obj.position.z -= .2;
                    count++;
                }
            }, 10);
            break;
        case "↓":
            if (mover) {
                clearInterval(mover);
            }
            var count = 0;
            mover = setInterval(function() {
                if (count == 50) {
                    clearInterval(mover);
                } else {
                    obj.position.z += .2;
                    count++;
                }
            }, 10);
            break;
        case "←":
            if (mover) {
                clearInterval(mover);
            }
            var count = 0;
            mover = setInterval(function() {
                if (count == 50) {
                    clearInterval(mover);
                } else {
                    obj.position.x -= .2;
                    count++;
                }
            }, 10);
            break;
        case "→":
            if (mover) {
                clearInterval(mover);
            }
            var count = 0;
            mover = setInterval(function() {
                if (count == 50) {
                    clearInterval(mover);
                } else {
                    obj.position.x += .2;
                    count++;
                }
            }, 10);
            break;
        default:
            return;
    }
    renderer.render(scene, camera);
}
var cameracount=99;//用于切换动作的计数器
function cameraFocusing() {
    if(cameracount>0){
      camera.position.z+=1;
      cameracount--;
    }
    else{
      camera.position.z-=1;
      cameracount--;
      console.log(cameracount);
      if(cameracount<(-99)){
        cameracount=99;
      }
    }
}