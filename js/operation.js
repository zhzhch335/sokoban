//监听键盘事件
var rotationarray = new Array(); //用于停止游戏循环
var step = []; //用于存储游戏步骤
var stepflag = []; //用于存储步骤中箱子的移动状态
document.onkeyup = function(event) {
  var choice = ghostdirection(event.key);
  if (choice == "↑" || choice == "↓" || choice == "←" || choice == "→") {
    document.getElementById("answer").disabled = true; //按下键盘后答案不可用以免出错
    ghostmove(choice);
    document.getElementById("num").innerHTML = step.length;
  }
};
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
        if (descube.checkdes()) {
          setTimeout("alert('恭喜过关！')", 1000);
          ghost = null;
        }
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
        if (descube.checkdes()) {
          setTimeout("alert('恭喜过关！')", 1000);
          ghost = null;
        }
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
        if (descube.checkdes()) {
          setTimeout("alert('恭喜过关！')", 1000);
          ghost = null;
        }
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
        if (descube.checkdes()) {
          setTimeout("alert('恭喜过关！')", 1000);
          ghost = null;
        }
      }
      break;
    default:
      break;
  }
}
//载入地图
document.getElementById("map").onclick = function() {
  document.getElementById("mapfile").click();
}
document.getElementById("mapfile").onchange = function() {
  var file = this.files[0]; //file类型的input框可以接受多个文件，修改属性即可
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e) {
    var arrstr = this.result;
    var arr = arrstr.split(",");
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
      alert("地图文件格式错误！");
    }
  }
}
//载入步骤
document.getElementById("answer").onclick = function() {
  document.getElementById("answerfile").click();
}
document.getElementById("answerfile").onchange = function() {
  var file = this.files[0]; //不知道为什么是0，好像也不能多选？
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e) {
    var arrstr = this.result;
    var arr = arrstr.split(",");
    step = [];
    stepflag = []; //重置步骤
    try {
      var i = 0;
      var draw = setInterval(function() {
        if (i == arr.length) {
          clearInterval(draw);
        }
        ghostmove(arr[i]);
        document.getElementById("num").innerHTML = step.length;
        i++;
      }, 500);
      document.getElementById("answer").disabled = true; //避免二次加载引发的错误
    } catch (e) {
      alert('解答文件格式错误！');
    }
  }
}
//后退一步
document.getElementById("back").onclick = function() {
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
              function wrotate() {
                box.rotation.x -= .05;
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
              function wrotate() {
                box.rotation.x -= .05;
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
              function wrotate() {
                box.rotation.x -= .05;
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
        }
        break;
    }
  } else {
    alert('到头啦！');
  }
}
//重新开始
document.getElementById("refresh").onclick = function() {
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
}
//打印数组用
function printstep() {
  var result = "";
  for (var i = 1; i < step.length; i++) {
    result += ("," + step[i]);
  }
  return result;
}
//关卡选择
document.getElementById("maid1").onclick = function() {
  document.getElementById("answer1").disabled=false;
  document.getElementById("answer2").disabled=true;
  document.getElementById("answer3").disabled=true;
  var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 0, 2, 4, 1, 0, 0, 1, 4, 0, 2, 3, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
    alert("地图文件格式错误！");
  }
}
document.getElementById("maid2").onclick = function() {
  document.getElementById("answer1").disabled=true;
  document.getElementById("answer2").disabled=false;
  document.getElementById("answer3").disabled=true;
  var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 4, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
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
    alert("地图文件格式错误！");
  }
}
document.getElementById("maid3").onclick = function() {
  document.getElementById("answer1").disabled=true;
  document.getElementById("answer2").disabled=true;
  document.getElementById("answer3").disabled=false;
  var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 2, 0, 0, 4, 1, 1, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 1, 1, 1, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
    alert("地图文件格式错误！");
  }
}
document.getElementById("answer1").onclick = function() {
  var arrstr = "↓,↑,←,←,→,↑,↑,↓,→,→";
  var arr = arrstr.split(",");
  step = [];
  stepflag = []; //重置步骤
  try {
    var i = 0;
    var draw = setInterval(function() {
      if (i == arr.length) {
        clearInterval(draw);
      }
      ghostmove(arr[i]);
      document.getElementById("num").innerHTML = step.length;
      i++;
    }, 500);
    document.getElementById("answer").disabled = true; //避免二次加载引发的错误
  } catch (e) {
    alert('解答文件格式错误！');
  }
}
document.getElementById("answer2").onclick = function() {
  var arrstr = "→,→,↓,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→,↓,→,↑,↑,↓,←,←,←,←,↑,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→,↓,→,↑,←,←,←,←,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→";
  var arr = arrstr.split(",");
  step = [];
  stepflag = []; //重置步骤
  try {
    var i = 0;
    var draw = setInterval(function() {
      if (i == arr.length) {
        clearInterval(draw);
      }
      ghostmove(arr[i]);
      document.getElementById("num").innerHTML = step.length;
      i++;
    }, 500);
    document.getElementById("answer").disabled = true; //避免二次加载引发的错误
  } catch (e) {
    alert('解答文件格式错误！');
  }
}
document.getElementById("answer3").onclick = function() {alert("未完成")};