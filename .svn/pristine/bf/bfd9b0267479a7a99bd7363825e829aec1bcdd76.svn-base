var eventID;//用于停止循环
document.getElementById("cover").onmousedown=function(){
  this.style.display="none";
  control.autoRotate=false;
  document.getElementById("cover2").style.display="block";
  eventID=setInterval("cameraFocusing()",10);
};
document.getElementById("cover2").onwheel=function(){
	this.style.display="none";
	clearInterval(eventID);
};