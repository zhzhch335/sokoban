document.getElementById("cover").onmousedown=function(){
  this.style.display="none";
  control.autoRotate=false;
  document.getElementById("cover2").style.display="block";
  eventID=setInterval("cameraFocusing()",10);
};
document.getElementById("cover2").addEventListener("wheel", function(){
  this.style.display="none";
  clearInterval(eventID);
});