//监听键盘事件
var rotation1,rotation2,rotation3,rotation4;//用于停止游戏循环
document.onkeyup = function(event) {
  var x=camera.position.x;
  var z=camera.position.z;
  var tmepele;//用于改变数组顺序的变量
  var choice;
  var choiceArray=["↑","←","↓","→"];
  if(z<100-x){
    if(z>x){
      choiceArray=["→","↑","←","↓"];
    }
    else{
      choiceArray=["↓","→","↑","←"];
    }
  }
  else{
    if(z>x){
      choiceArray=["↑","←","↓","→"];
    }
    else{
      choiceArray=["←","↓","→","↑"];
    }
  }
  switch(event.key){
    case "w":
      choice=choiceArray[0];
      break;
    case "a":
      choice=choiceArray[1];
      break;
    case "s":
      choice=choiceArray[2];
      break;
    case "d":
      choice=choiceArray[3];
      break;
  }
  switch (choice) {
    case "↑":
      ghost.cube.rotation.z = Math.PI;
      if (ghost.isavailable("w")) {
        move(ghost.cube, "↑"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row - 1][ghost.column].state;
        if (state == 2) {
          var box = cubes[ghost.row - 1][ghost.column].cube;
          move(box, "↑"); //箱子移动
          cubes[ghost.row - 2][ghost.column].state = 2; //更新数组中箱子信息
          cubes[ghost.row - 2][ghost.column].cube = box;
          if (descube.checkcube(ghost.row - 2, ghost.column)) {
            function wrotate() {
              box.rotation.x += .05;
              rotation1 = requestAnimationFrame(wrotate);
            }
            wrotate();
          } else {
            if (rotation1) {
              cancelAnimationFrame(rotation1);
              box.rotation.x = 0;
            }
          }
        }
        cubes[ghost.row - 1][ghost.column].state = 3; //更新数组中人物信息
        ghost.row -= 1; //更新人物位置信息
        if (descube.checkdes()) {
          setTimeout("alert('恭喜过关！')", 1000);
        }
      }
      break;
    case "↓":
      ghost.cube.rotation.z = 0;
      if (ghost.isavailable("s")) {
        move(ghost.cube, "↓"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息        
        var state = cubes[ghost.row + 1][ghost.column].state;
        if (state == 2) {
          var box = cubes[ghost.row + 1][ghost.column].cube;
          move(box, "↓"); //箱子移动
          cubes[ghost.row + 2][ghost.column].state = 2; //更新数组中箱子信息
          cubes[ghost.row + 2][ghost.column].cube = box;
          if (descube.checkcube(ghost.row + 2, ghost.column)) {
            function wrotate() {
              box.rotation.x -= .05;
              rotation2 = requestAnimationFrame(wrotate);
            }
            wrotate();
          } else {
            if (rotation2) {
              cancelAnimationFrame(rotation2);
              box.rotation.x = 0;
            }
          }
        }
        cubes[ghost.row + 1][ghost.column].state = 3; //更新数组中人物信息
        ghost.row += 1; //更新人物位置信息
        if (descube.checkdes()) {
          setTimeout("alert('恭喜过关！')", 1000);
        }
      }
      break;
    case "←":
      ghost.cube.rotation.z = -Math.PI / 2;
      if (ghost.isavailable("a")) {
        move(ghost.cube, "←"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row][ghost.column - 1].state;
        if (state == 2) {
          var box = cubes[ghost.row][ghost.column - 1].cube;
          move(box, "←"); //箱子移动
          cubes[ghost.row][ghost.column - 2].state = 2; //更新数组中箱子信息
          cubes[ghost.row][ghost.column - 2].cube = box;
          if (descube.checkcube(ghost.row, ghost.column - 2)) {
            function wrotate() {
              box.rotation.z -= .05;
              rotation3 = requestAnimationFrame(wrotate);
            }
            wrotate();
          } else {
            if (rotation3) {
              cancelAnimationFrame(rotation3);
              box.rotation.z = 0;
            }
          }
        }
        cubes[ghost.row][ghost.column - 1].state = 3; //更新数组中人物信息
        ghost.column -= 1; //更新人物位置信息
        if (descube.checkdes()) {
          setTimeout("alert('恭喜过关！')", 1000);
        }
      }
      break;
    case "→":
      ghost.cube.rotation.z = Math.PI / 2;
      if (ghost.isavailable("d")) {
        move(ghost.cube, "→"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row][ghost.column + 1].state;
        if (state == 2) {
          var box = cubes[ghost.row][ghost.column + 1].cube;
          move(box, "→"); //箱子移动
          cubes[ghost.row][ghost.column + 2].state = 2; //更新数组中箱子信息
          cubes[ghost.row][ghost.column + 2].cube = box;
          if (descube.checkcube(ghost.row, ghost.column + 2)) {
            function wrotate() {
              box.rotation.z += .05;
              rotation4 = requestAnimationFrame(wrotate);
            }
            wrotate();
          } else {
            if (rotation4) {
              cancelAnimationFrame(rotation4);
              box.rotation.z = 0;
            }
          }
        }
        cubes[ghost.row][ghost.column + 1].state = 3; //更新数组中人物信息
        ghost.column += 1; //更新人物位置信息
        if (descube.checkdes()) {
          setTimeout("alert('恭喜过关！')", 1000);
        }
      }
      break;
    default:
      break;
  }
  for (var i = 1; i <= 10; i++) {
    console.log(ghost.row + "," + ghost.column);
    // console.log(cubes[i][1].state + " " + cubes[i][2].state + " " + cubes[i][3].state + " " + cubes[i][4].state + " " + cubes[i][5].state + " " + cubes[i][6].state + " " + cubes[i][7].state + " " + cubes[i][8].state + " " + cubes[i][9].state + " " + cubes[i][10].state);
  }
};