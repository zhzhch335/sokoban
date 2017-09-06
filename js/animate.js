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