//数组初始化
var sokobanarray = new Array(5);
for (var i = 0; i < sokobanarray.length; i++) {
  sokobanarray[i] = [1, 1, 1, 1, 1];
}
//随机方向
function randir(row, column) {
  var randomnum = parseInt(Math.random() * 2);
  switch (randomnum) {
    case 0:
      console.log("下移尝试");
      if (sokobanarray[row + 1] && sokobanarray[row + 2]) {
        sokobanarray[row + 1][column] = "0";
        sokobanarray[row + 2][column] = 0;
        console.log("下移成功！");
        return [row + 1, column];
      } else {
        return [row, column]; //移动失败则返回原索引重新移动
      }
      break;
    case 1:
      console.log("上移尝试");
      if (sokobanarray[row - 1] && sokobanarray[row - 2]) {
        sokobanarray[row - 1][column] = "0";
        sokobanarray[row - 2][column] = 0;
        console.log("上移成功！");
        return [row - 1, column];
      } else {
        return [row, column];
      }
      break;
    case 2:
      sokobanarray[row][column + 1] = 0;
      sokobanarray[row][column + 2] = 0;
      return sokobanarray[row][column + 1];
      break;
    case 3:
      sokobanarray[row][column - 1] = 0;
      sokobanarray[row][column - 2] = 0;
      return sokobanarray[row][column - 1];
      break;
  }
}
//移动队列生成
function initrandes(count) {
  var randes = new Array(count);
  for (var i = 0; i < randes.length; i++) {
    randes[i] = [parseInt(Math.random() * 5), parseInt(Math.random() * 5)]; //随机生成二维索引
    for (var j = 0; j < randes.length; j++) { //查找二维索引是否重复
      if (i != j) {
        if (JSON.stringify(randes[i]) == JSON.stringify(randes[j])) { //若重复则重新生成二维索引，并且重新开始比对
          j = 0;
          randes[i] = [parseInt(Math.random() * 5), parseInt(Math.random() * 5)];
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
function initmap(steps) {
  var randes = initrandes(4); //读取移动队列
  for (var i = 0; i < randes.length; i++) { //移动队列初值置4
    sokobanarray[randes[i][0]][randes[i][1]] = 4;
  }
  printarr();
  for (var i = 1; i <= steps; i++) {
    var moveele = randes.shift(); //移动元素出队列
    // console.log("moveele is a ",moveele);
    var newrande = randir(moveele[0], moveele[1]); //移动操作并返回当前索引
    randes.push(newrande); //移动后将当前元素入队列
    // console.log("we pushed a " + newrande);
    printarr();
    // console.log(randes[0], randes[1], randes[2], randes[3]);
  }
  for (var i = 0; i < randes.length; i++) {
    for (var j = 0; j < randes.length; j++) { //查找最终移动队列中是否有重复
      if (i != j) {
        if (JSON.stringify(randes[i]) == JSON.stringify(randes[j])) { //若重复则再次移动，并且重新开始比对
          j = 0;
          var moveele = randes.splice(i, 1)[0]; //重复的移动元素出队列
          // console.log("moveele is a ",moveele);
          var newrande = randir(moveele[0], moveele[1]); //移动操作并返回当前索引
          randes.push(newrande); //移动后将当前元素入队列
          // console.log("we pushed a " + newrande);
          printarr();
        }
      }
    }
    if (sokobanarray[randes[i][0]][randes[i][1]] == 4) {
      var moveele = randes.splice(i, 1)[0]; //覆盖目标点的移动元素出队列
      // console.log("moveele is a ",moveele);
      var newrande = randir(moveele[0], moveele[1]); //移动操作并返回当前索引
      randes.push(newrande); //移动后将当前元素入队列
      // console.log("we pushed a " , newrande);
      printarr();
      i--; //继续检测下一个值，避免被跳过
    }
  }
  for (var i = 0; i < randes.length; i++) { //最后的移动队列（箱子点）置2
    sokobanarray[randes[i][0]][randes[i][1]] = 2;
  }
  printarr();
}
initmap(5);
//输出数组，测试用
function printarr() {
  for (var i = 0; i < sokobanarray.length; i++) {
    console.log(sokobanarray[i]);
  }
  console.log();
}
