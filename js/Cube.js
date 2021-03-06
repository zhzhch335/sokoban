/*
  基本方块类
 */
function Cube(state, row, column, materialurl, x, y, z) {
  this.state = state; //状态 1墙体 2箱子
  this.row = row; //所在行
  this.column = column; //所在列
  if (state == 1 || state == 2) {
    var cubegeometry = new THREE.BoxGeometry(10, 10, 10); //方块大小固定
    if (materialurl == "crate") {
      var cubematerial = new THREE.MeshBasicMaterial({
        map: textureloader.loadTexture('img/crate.jpg')
      });
    } else {
      var cubematerial = new THREE.MeshBasicMaterial({
        map: textureloader.loadTexture('img/bricks.jpg')
      });
    }
    var cube = new THREE.Mesh(cubegeometry, cubematerial);
    cube.position.set(x, y, z);
    this.cube = cube; //将网孔对象传出以便移动
    scene.add(cube);
  }
}
/*

  人物方块类
 */
function PersonCube(row, column) {
  this.state = 3; //3代表人物
  this.row = row;
  this.column = column;
  var loader = new THREE.STLLoader();
  var ghostMaterial = new THREE.MeshPhongMaterial({
    color:0xffffff
  });
  loader.load("img/Fantasma.stl", function(obj) {
    var cube = new THREE.Mesh(obj, ghostMaterial);
    cube.rotateX(Math.PI / 2 * 3);
    cube.position.set((column - 1) * 10 + 5, 0, (row - 1) * 10 + 5);
    cube.scale.set(3, 3, 3);
    scene.add(cube);
    ghost.cube = cube;
    document.getElementById("white").style.display="none";
  })
  this.isavailable = function(direction) {
    row = this.row;
    column = this.column;
    var availarr = [0, 4]; //可以直接走的标记
    switch (direction) {
      case "w":
        if (cubes[row - 1] && availarr.includes(cubes[row - 1][column].state)) {
          return true;
        }
        if (cubes[row - 2] && availarr.includes(cubes[row - 2][column].state)) {
          if (cubes[row - 1][column].state == 2) {
            return true;
          }
        }
        return false;
      case "s":
        if (availarr.includes(cubes[row + 1] && cubes[row + 1][column].state)) {
          return true;
        }
        if (availarr.includes(cubes[row + 2] && cubes[row + 2][column].state)) {
          if (cubes[row + 1][column].state == 2) {
            return true;
          }
        }
        return false;
      case "a":
        if (availarr.includes(cubes[row][column - 1] && cubes[row][column - 1].state)) {
          return true;
        }
        if (availarr.includes(cubes[row][column - 2] && cubes[row][column - 2].state)) {
          if (cubes[row][column - 1].state == 2) {
            return true;
          }
        }
        return false;
      case "d":
        if (availarr.includes(cubes[row][column + 1] && cubes[row][column + 1].state)) {
          return true;
        }
        if (availarr.includes(cubes[row][column + 2] && cubes[row][column + 2].state)) {
          if (cubes[row][column + 1].state == 2) {
            return true;
          }
        }
        return false;
      default:
        console.log("direction error");
    }
  }
}
/*

  终点方块类
 */
function DesCube(i, j) {
  desCubes = new Array();//清空完成数组
  var textureloader = new THREE.TextureLoader();
  var loader = new THREE.STLLoader();
  var ghostMaterial = new THREE.MeshBasicMaterial({
    color: 0x2033a4,
  });
  loader.load("img/Base_luz.stl", function(obj) {
    var cube = new THREE.Mesh(obj, ghostMaterial);
    cube.rotateX(Math.PI / 2 * 3);
    cube.position.set((j - 1) * 10 + 5, 0, (i - 1) * 10 + 5);
    cube.scale.set(3, 3, 3);
    scene.add(cube);
    // boxhelper = new THREE.BoxHelper(cube);
    // scene.add(boxhelper);
    desCubes.push({
      state: 0, //0代表未完成 1代表完成
      position: {
        row: i,
        column: j
      }
    });
  });
}
DesCube.prototype.checkcube = function(row, column) {
  for (var i = 0; i < desCubes.length; i++) { //判断单个箱子是否完成
    if (row == desCubes[i].position.row && column == desCubes[i].position.column) {
      desCubes[i].state = 1;
      return true; //表示已到位
    }
  }
  return false;
}
DesCube.prototype.checkdes = function() {
  for (var i = 0; i < desCubes.length; i++) {
    if (desCubes[i].position.row == ghost.row && desCubes[i].position.column == ghost.column) { //幽灵若在目标点则证明箱子被推出去了，此点未完成
      desCubes[i].state = 0;
    }
  }
  for (var i = 0; i < desCubes.length; i++) {
    if (desCubes[i].state == 0) {
      return false;
    }
  }
  return true;
};