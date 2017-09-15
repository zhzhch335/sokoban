//返回视角
document.getElementById("recover").onclick = function() {
  this.style.visibility = "hidden";
  control.object.scale.z = 2;
  camera.position.set(50.06421484100598, 219.95842897735875, -33.78512665221608);
};
//监听键盘事件
function addKeyboardEvent() {
  document.onkeydown = function(event) {
    var choice = ghostdirection(event.key);
    if (choice == "↑" || choice == "↓" || choice == "←" || choice == "→") {
      document.getElementById("answer1").style.visibility = "hidden";
      document.getElementById("answer2").style.visibility = "hidden";
      document.getElementById("answer3").style.visibility = "hidden";
      ghostmove(choice);
      document.getElementById("num").innerHTML = step.length;
    }
  };
}
addKeyboardEvent();
//判断移动方向
function ghostdirection(eventkey) {
  var x = camera.position.x;
  var z = camera.position.z;
  var tmepele; //用于改变数组顺序的变量
  var choice;
  var choiceArray = ["↑", "←", "↓", "→"];
  if (z < 100 - x) {
    if (z > x) {
      choiceArray = ["→", "↑", "←", "↓"];
    } else {
      choiceArray = ["↓", "→", "↑", "←"];
    }
  } else {
    if (z > x) {
      choiceArray = ["↑", "←", "↓", "→"];
    } else {
      choiceArray = ["←", "↓", "→", "↑"];
    }
  }
  switch (eventkey) {
    case "w":
      choice = choiceArray[0];
      break;
    case "a":
      choice = choiceArray[1];
      break;
    case "s":
      choice = choiceArray[2];
      break;
    case "d":
      choice = choiceArray[3];
      break;
  }
  return choice;
}
//检查是否通关
function checkdesall() {
  if (descube.checkdes()) {
    document.getElementById("recover").style.visibility = "hidden";
    ghost = null;
    setTimeout(function() {
      swal('恭喜过关！', '最终步数为' + step.length + "步", 'success');
      // alert('恭喜过关！\n最终步数为' + step.length + "步");
      scene.visible = false;
      document.body.style.backgroundImage = "url(img/success.jpg)";
      document.getElementById("wasd").style.display = "none";
    }, 1000);
  }
}
//幽灵移动
function ghostmove(choice) {
  switch (choice) {
    case "↑":
      ghost.cube.rotation.z = Math.PI;
      if (ghost.isavailable("w")) {
        step.push(choice); //更新步数
        move(ghost.cube, "↑"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row - 1][ghost.column].state;
        if (state == 2) {
          stepflag.push(true);
          var box = cubes[ghost.row - 1][ghost.column].cube;
          move(box, "↑"); //箱子移动
          cubes[ghost.row - 2][ghost.column].state = 2; //更新数组中箱子信息
          cubes[ghost.row - 2][ghost.column].cube = box;
          if (descube.checkcube(ghost.row - 2, ghost.column)) {
            setTimeout(function() {
              box.scale.set(0.5, 0.5, 0.5);
            }, 500);
          } else {
            setTimeout(function() {
              box.scale.set(1, 1, 1);
            }, 500);
          }
        } else {
          stepflag.push(false);
        }
        cubes[ghost.row - 1][ghost.column].state = 3; //更新数组中人物信息
        ghost.row -= 1; //更新人物位置信息
        checkdesall();
      }
      break;
    case "↓":
      ghost.cube.rotation.z = 0;
      if (ghost.isavailable("s")) {
        step.push(choice); //更新步数
        move(ghost.cube, "↓"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息        
        var state = cubes[ghost.row + 1][ghost.column].state;
        if (state == 2) {
          stepflag.push(true);
          var box = cubes[ghost.row + 1][ghost.column].cube;
          move(box, "↓"); //箱子移动
          cubes[ghost.row + 2][ghost.column].state = 2; //更新数组中箱子信息
          cubes[ghost.row + 2][ghost.column].cube = box;
          if (descube.checkcube(ghost.row + 2, ghost.column)) {
            setTimeout(function() {
              box.scale.set(0.5, 0.5, 0.5);
            }, 500);
          } else {
            setTimeout(function() {
              box.scale.set(1, 1, 1);
            }, 500);
          }
        } else {
          stepflag.push(false);
        }
        cubes[ghost.row + 1][ghost.column].state = 3; //更新数组中人物信息
        ghost.row += 1; //更新人物位置信息
        checkdesall();
      }
      break;
    case "←":
      ghost.cube.rotation.z = -Math.PI / 2;
      if (ghost.isavailable("a")) {
        step.push(choice); //更新步数
        move(ghost.cube, "←"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row][ghost.column - 1].state;
        if (state == 2) {
          stepflag.push(true);
          var box = cubes[ghost.row][ghost.column - 1].cube;
          move(box, "←"); //箱子移动
          cubes[ghost.row][ghost.column - 2].state = 2; //更新数组中箱子信息
          cubes[ghost.row][ghost.column - 2].cube = box;
          if (descube.checkcube(ghost.row, ghost.column - 2)) {
            setTimeout(function() {
              box.scale.set(0.5, 0.5, 0.5);
            }, 500);
          } else {
            setTimeout(function() {
              box.scale.set(1, 1, 1);
            }, 500);
          }
        } else {
          stepflag.push(false);
        }
        cubes[ghost.row][ghost.column - 1].state = 3; //更新数组中人物信息
        ghost.column -= 1; //更新人物位置信息
        checkdesall();
      }
      break;
    case "→":
      ghost.cube.rotation.z = Math.PI / 2;
      if (ghost.isavailable("d")) {
        step.push(choice); //更新步数
        move(ghost.cube, "→"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row][ghost.column + 1].state;
        if (state == 2) {
          stepflag.push(true);
          var box = cubes[ghost.row][ghost.column + 1].cube;
          move(box, "→"); //箱子移动
          cubes[ghost.row][ghost.column + 2].state = 2; //更新数组中箱子信息
          cubes[ghost.row][ghost.column + 2].cube = box;
          if (descube.checkcube(ghost.row, ghost.column + 2)) {
            setTimeout(function() {
              box.scale.set(0.5, 0.5, 0.5);
            }, 500);
          } else {
            setTimeout(function() {
              box.scale.set(1, 1, 1);
            }, 500);
          }
        } else {
          stepflag.push(false);
        }
        cubes[ghost.row][ghost.column + 1].state = 3; //更新数组中人物信息
        ghost.column += 1; //更新人物位置信息
        checkdesall();
      }
      break;
    default:
      break;
  }
}
//根据载入数据生成地图
function initmap(arr) {
  if (arr.length == 100) {
    for (var i = 0; i < arr.length; i++) { //字符串转化为整数以便识别
      arr[i] = parseInt(arr[i]);
    }
    for (var i = 0; i < scene.children.length; i++) {
      if (scene.children[i] && scene.children[i].type == "Mesh") {
        scene.remove(scene.children[i]); //移除原有元素
        i--; //防止元素跳过
      }
    }
    step = [];
    stepflag = []; //重置步骤
    temparray = arr; //将数组存入全局变量以便刷新使用
    initcube(temparray); //重新生成元素
    document.getElementById("num").innerHTML = step.length; //更新步骤显示
  } else {
    swal('地图文件格式错误', '请读入正确的地图文件', 'error');
  }
}
//载入地图
document.getElementById("map").onclick = function() {
  document.getElementById("mapfile").click();
};
document.getElementById("mapfile").onchange = function() {
  levelID=0;//记录值代表目前为外部关卡
  document.getElementById("answer1").style.visibility = "hidden"; //避免加载错误解答
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var file = this.files[0]; //file类型的input框可以接受多个文件，修改属性即可
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e) {
    var arrstr = this.result;
    var arr = arrstr.split(",");
    initmap(arr);
  };
};
//根据载入数据执行移动
function initstep(arr) {
  step = [];
  stepflag = []; //重置步骤
  try {
    var i = 0;
    draw = setInterval(function() {
      if (i == arr.length) {
        clearInterval(draw);
        addKeyboardEvent();
        if (!descube.checkdes()) {
          document.getElementById("recover").style.visibility = "hidden";
          ghost = null;
          setTimeout(function() {
            swal('失败！', '未能通关，请读入正确的解答文件', 'error');
            // alert('恭喜过关！\n最终步数为' + step.length + "步");
            scene.visible = false;
            document.getElementById("wasd").style.display = "none";
            document.getElementById("refresh").click();
          }, 1000);
        }
      }
      ghostmove(arr[i]);
      document.getElementById("num").innerHTML = step.length;
      i++;
    }, 1000);
  } catch (e) {
    swal('解答文件格式错误', '请读入正确的解答文件', 'error');
  }
}
//载入步骤
document.getElementById("answer").onclick = function() {
  document.getElementById("answerfile").click();
};
document.getElementById("answerfile").onchange = function() {
  var file = this.files[0]; //不知道为什么是0，好像也不能多选？
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e) {
    var arrstr = this.result;
    var arr = arrstr.split(",");
    if (!["↑", "←", "↓", "→"].includes(arr[0])) {
      swal('解答文件格式错误', '请读入正确的解答文件', 'error');
    } else {
      document.onkeydown = "";
      initstep(arr);
    }
  }
};
//后退一步
document.getElementById("back").onclick = function() {
  addKeyboardEvent();
  clearInterval(draw); //停止自动完成
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  //避免在中途开始自动完成
  var laststep = step.pop();
  var lastflag = stepflag.pop();
  if (laststep) {
    document.getElementById("num").innerHTML = step.length;
    switch (laststep) {
      case "↑":
        ghostmove("↓");
        step.pop();
        stepflag.pop(); //删去无关变量以免混淆
        if (lastflag) {
          var state = cubes[ghost.row - 2][ghost.column].state;
          if (state == 2) {
            var box = cubes[ghost.row - 2][ghost.column].cube;
            move(box, "↓"); //箱子回归
            cubes[ghost.row - 2][ghost.column].state = 0;
            cubes[ghost.row - 1][ghost.column].state = 2; //更新数组中箱子信息
            cubes[ghost.row - 1][ghost.column].cube = box;
            if (descube.checkcube(ghost.row - 1, ghost.column)) {
              box.scale.set(0.5, 0.5, 0.5);
            } else {
              box.scale.set(1, 1, 1);
            }
          }
        }
        break;
      case "↓":
        ghostmove("↑");
        step.pop();
        stepflag.pop(); //删去无关变量以免混淆
        if (lastflag) {
          var state = cubes[ghost.row + 2][ghost.column].state;
          if (state == 2) {
            var box = cubes[ghost.row + 2][ghost.column].cube;
            move(box, "↑"); //箱子回归
            cubes[ghost.row + 2][ghost.column].state = 0;
            cubes[ghost.row + 1][ghost.column].state = 2; //更新数组中箱子信息
            cubes[ghost.row + 1][ghost.column].cube = box;
            if (descube.checkcube(ghost.row + 1, ghost.column)) {
              box.scale.set(0.5, 0.5, 0.5);
            } else {
              box.scale.set(1, 1, 1);
            }
          }
        }
        break;
      case "←":
        ghostmove("→");
        step.pop();
        stepflag.pop(); //删去无关变量以免混淆
        if (lastflag) {
          var state = cubes[ghost.row][ghost.column - 2].state;
          if (state == 2) {
            var box = cubes[ghost.row][ghost.column - 2].cube;
            move(box, "→"); //箱子回归
            cubes[ghost.row][ghost.column - 2].state = 0;
            cubes[ghost.row][ghost.column - 1].state = 2; //更新数组中箱子信息
            cubes[ghost.row][ghost.column - 1].cube = box;
            if (descube.checkcube(ghost.row, ghost.column - 1)) {
              box.scale.set(0.5, 0.5, 0.5);
            } else {
              box.scale.set(1, 1, 1);
            }
          }
        }
        break;
      case "→":
        ghostmove("←");
        step.pop();
        stepflag.pop(); //删去无关变量以免混淆
        if (lastflag) {
          var state = cubes[ghost.row][ghost.column + 2].state;
          if (state == 2) {
            var box = cubes[ghost.row][ghost.column + 2].cube;
            move(box, "←"); //箱子回归
            cubes[ghost.row][ghost.column + 2].state = 0;
            cubes[ghost.row][ghost.column + 1].state = 2; //更新数组中箱子信息
            cubes[ghost.row][ghost.column + 1].cube = box;
            if (descube.checkcube(ghost.row, ghost.column + 1)) {
              box.scale.set(0.5, 0.5, 0.5);
            } else {
              box.scale.set(1, 1, 1);
            }
          }
        }
        break;
    }
  } else {
    alert('到头啦！');
  }
};
//重新开始
document.getElementById("refresh").onclick = function() {
  clearInterval(draw); //停止自动完成
  if (levelID) {
    var answerstr = "answer" + levelID;
    document.getElementById(answerstr).style.visibility = "visible";
  }
  for (var i = 0; i < scene.children.length; i++) {
    if (scene.children[i] && scene.children[i].type == "Mesh") {
      scene.remove(scene.children[i]); //移除原有元素
      i--; //防止元素跳过
    }
  }
  step = [];
  stepflag = []; //重置步骤
  initcube(temparray); //重新生成元素
  document.getElementById("num").innerHTML = step.length; //更新步骤显示
};
//关卡选择
document.getElementById("maid1").onclick = function() {
  clearInterval(draw); //停止自动完成
  levelID = 1;
  document.getElementById("answer1").style.visibility = "visible";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 0, 2, 4, 1, 0, 0, 1, 4, 0, 2, 3, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  initmap(arr);
};
document.getElementById("maid2").onclick = function() {
  clearInterval(draw); //停止自动完成
  levelID = 2;
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "visible";
  document.getElementById("answer3").style.visibility = "hidden";
  var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 4, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  initmap(arr);
};
document.getElementById("maid3").onclick = function() {
  clearInterval(draw); //停止自动完成
  levelID = 3;
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "visible";
  var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 2, 0, 0, 4, 1, 1, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 1, 1, 1, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  initmap(arr);
};
document.getElementById("answer1").onclick = function() {
  document.onkeydown = "";
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var arrstr = "↓,↑,←,←,→,↑,↑,↓,→,→";
  temparray = arrstr.split(",");
  initstep(temparray);
};
document.getElementById("answer2").onclick = function() {
  document.onkeydown = "";
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var arrstr = "→,→,↓,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→,↓,→,↑,↑,↓,←,←,←,←,↑,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→,↓,→,↑,←,←,←,←,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→";
  temparray = arrstr.split(",");
  initstep(temparray);
};
document.getElementById("answer3").onclick = function() {
  document.onkeydown = "";
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var arrstr = "↑,↑,↓,↓,→,→,↑,←,↑,←,↑,↑,→,→,↓,↑,←,←,←,↓,←,↓,↓,→,↑,↑,↑,↓,↓,↓,↓,→,↑,↑,↑,←,↑,→";
  temparray = arrstr.split(",");
  initstep(temparray);
};