//数组初始化
var sokobanarray = new Array(10);
for (var i = 0; i < sokobanarray.length; i++) {
  sokobanarray[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
}
//随机方向
function randir(row, column) {
  var randomnum = parseInt(Math.random() * 4);
  switch (randomnum) {
    case 0:
      console.log("下移尝试");
      //避免终点值被覆盖
      if (sokobanarray[row + 1] != undefined && sokobanarray[row + 2] != undefined && sokobanarray[row + 1][column] != (2&&4) && sokobanarray[row + 2][column] != (2&&4)) {
        sokobanarray[row + 1][column] = 0;
        sokobanarray[row + 2][column] = 0;
        console.log("下移成功！");
        return [row + 1, column];
      } else {
        return [row, column]; //移动失败则返回原索引重新移动
      }
      break;
    case 1:
      console.log("上移尝试");
      if (sokobanarray[row - 1] != undefined && sokobanarray[row - 2] != undefined && sokobanarray[row - 1][column] != (2&&4) && sokobanarray[row - 2][column] != (2&&4)) {
        sokobanarray[row - 1][column] = 0;
        sokobanarray[row - 2][column] = 0;
        console.log("上移成功！");
        return [row - 1, column];
      } else {
        return [row, column];
      }
      break;
    case 2:
      console.log("左移尝试");
      if (sokobanarray[row][column - 1] != undefined && sokobanarray[row][column - 2] != undefined && sokobanarray[row][column - 1] != (2&&4) && sokobanarray[row][column - 2] != (2&&4)) {
        sokobanarray[row][column - 1] = 0;
        sokobanarray[row][column - 2] = 0;
        console.log("左移成功！");
        return [row, column - 1];
      } else {
        return [row, column];
      }
      break;
    case 3:
      console.log("右移尝试");
      if (sokobanarray[row][column + 1] != undefined && sokobanarray[row][column + 2] != undefined && sokobanarray[row][column + 1] != (2&&4) && sokobanarray[row][column + 2] != (2&&4)) {
        sokobanarray[row][column + 1] = 0;
        sokobanarray[row][column + 2] = 0;
        console.log("右移成功！");
        return [row, column + 1];
      } else {
        return [row, column];
      }
      break;
  }
}
//移动队列生成
function initrandes(count) {
  var randes = new Array(count);
  for (var i = 0; i < randes.length; i++) {
    randes[i] = [parseInt(Math.random() * 10), parseInt(Math.random() * 10)]; //随机生成二维索引
    for (var j = 0; j < randes.length; j++) { //查找二维索引是否重复
      if (i != j) {
        if (JSON.stringify(randes[i]) == JSON.stringify(randes[j])) { //若重复则重新生成二维索引，并且重新开始比对
          j = 0;
          randes[i] = [parseInt(Math.random() * 10), parseInt(Math.random() * 10)];
        }
      }
    }
  }
  return randes;
}
// 空点置1,改为初始化即为1，暂时弃用
function setone() {
  for (var i = sokobanarray.length - 1; i >= 0; i--) {
    for (var j = sokobanarray[i].length - 1; j >= 0; j--) {
      if (sokobanarray[i][j] == undefined) {
        sokobanarray[i][j] = 1;
      }
    }
  }
}
//主函数，逆推生成数组
function initmap() {
  var randes = initrandes(6); //读取移动队列
  for (var i = 0; i < randes.length; i++) { //移动队列初值置4
    sokobanarray[randes[i][0]][randes[i][1]] = 4;
  }
  // printarr();
  while (randes.length > 1) {
    var moveele = randes.shift(); //移动元素出队列
    var newrande = randir(moveele[0], moveele[1]); //移动操作并返回当前索引
    for (var j = 0; j < randes.length; j++) {
      if (JSON.stringify(randes[j]) == JSON.stringify(newrande)) {
        sokobanarray[randes[j][0]][randes[j][1]]=2;
        randes.splice(j, 1);
        console.log("randes.length is ",randes.length);
      }
    }
    randes.push(newrande); //移动后将当前元素入队列
  }
  sokobanarray[randes[0][0]][randes[0][1]]=3;//最终汇合点为幽灵位置3
  // for (var i = 0; i < randes.length; i++) {
  //   for (var j = 0; j < randes.length; j++) { //查找最终移动队列中是否有重复
  //     if (i != j) {
  //       if (JSON.stringify(randes[i]) == JSON.stringify(randes[j])) { //若重复则再次移动，并且重新开始比对
  //         j = 0;
  //         var moveele = randes.splice(i, 1)[0]; //重复的移动元素出队列
  //         // console.log("moveele is a ",moveele);
  //         var newrande = randir(moveele[0], moveele[1]); //移动操作并返回当前索引
  //         randes.push(newrande); //移动后将当前元素入队列
  //         // console.log("we pushed a " + newrande);
  //         // printarr();
  //       }
  //     }
  //   }
  // }
  // for (var i = 0; i < randes.length; i++) { //最后的移动队列（箱子点）置2
  //   sokobanarray[randes[i][0]][randes[i][1]] = 2;
  // }
  // var flag = true;
  // while (flag) {
  //   var ghostcubeRow = parseInt(Math.random() * 10)
  //   var ghostcubeColumn = parseInt(Math.random() * 10)
  //   if (sokobanarray[ghostcubeRow][ghostcubeColumn]) {
  //     flag = false;
  //     sokobanarray[ghostcubeRow][ghostcubeColumn] = 3; //随机搞个幽灵置3
  //   }
  // }
  return sokobanarray;
}
// //输出数组，测试用
function printarr() {
  for (var i = 0; i < sokobanarray.length; i++) {
    console.log(sokobanarray[i]);
  }
  console.log();
}