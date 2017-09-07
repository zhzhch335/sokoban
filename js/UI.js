document.getElementById("cover").onmousedown=function(){
  this.style.display="none";
  control.autoRotate=false;
}
document.body.onmouseup=function(){
  console.log(camera.rotation);
}