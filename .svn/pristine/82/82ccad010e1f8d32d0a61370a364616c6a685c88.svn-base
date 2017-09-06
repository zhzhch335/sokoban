//监听键盘事件
document.onkeyup = function(event) {
  switch (event.key) {
    case "w":
      if (ghost.isavailable("w")) {
        move(ghost.cube, "↑"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row - 1][ghost.column].state;
        if (state == 2) {
          var box = cubes[ghost.row - 1][ghost.column].cube;
          move(box, "↑"); //箱子移动
          cubes[ghost.row - 2][ghost.column].state = 2; //更新数组中箱子信息
          cubes[ghost.row - 2][ghost.column].cube = box;
        }
        cubes[ghost.row - 1][ghost.column].state = 3; //更新数组中人物信息
        ghost.row -= 1; //更新人物位置信息
      }
      break;
    case "s":
      if (ghost.isavailable("s")) {
        move(ghost.cube, "↓"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息        
        var state = cubes[ghost.row + 1][ghost.column].state;
        if (state == 2) {
          var box = cubes[ghost.row + 1][ghost.column].cube;
          move(box, "↓"); //箱子移动
          cubes[ghost.row + 2][ghost.column].state = 2; //更新数组中箱子信息
          cubes[ghost.row + 2][ghost.column].cube = box;
        }
        cubes[ghost.row + 1][ghost.column].state = 3; //更新数组中人物信息
        ghost.row += 1; //更新人物位置信息
      }
      break;
    case "a":
      if (ghost.isavailable("a")) {
        move(ghost.cube, "←"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row][ghost.column - 1].state;
        if (state==2) {
          var box = cubes[ghost.row][ghost.column - 1].cube;
          move(box, "←"); //箱子移动
          cubes[ghost.row][ghost.column - 2].state = 2; //更新数组中箱子信息
          cubes[ghost.row][ghost.column - 2].cube = box;
        }
        cubes[ghost.row][ghost.column - 1].state = 3; //更新数组中人物信息
        ghost.column -= 1; //更新人物位置信息
      }
      break;
    case "d":
      if (ghost.isavailable("d")) {
        move(ghost.cube, "→"); //人物移动
        cubes[ghost.row][ghost.column].state = 0; //更新原人物位置状态信息
        var state = cubes[ghost.row][ghost.column + 1].state;
        if (state==2) {
          var box = cubes[ghost.row][ghost.column + 1].cube;
          box.rotateX(Math.PI/2);
          move(box, "→"); //箱子移动
          cubes[ghost.row][ghost.column + 2].state = 2; //更新数组中箱子信息
          cubes[ghost.row][ghost.column + 2].cube = box;
        }
        cubes[ghost.row][ghost.column + 1].state = 3; //更新数组中人物信息
        ghost.column += 1; //更新人物位置信息
      }
      break;
    default:
      break;
  }
  for (var i = 1; i <= 10; i++) {
    // console.log(ghost.row+","+ghost.column);
    console.log(cubes[i][1].state + " " + cubes[i][2].state + " " + cubes[i][3].state + " " + cubes[i][4].state + " " + cubes[i][5].state + " " + cubes[i][6].state + " " + cubes[i][7].state + " " + cubes[i][8].state + " " + cubes[i][9].state + " " + cubes[i][10].state);
  }
};

//深复制
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};
