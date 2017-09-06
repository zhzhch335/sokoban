//方块数组
var cubes = new Array();
/*
  基本方块类
 */
function Cube(state, row, column, materialurl, x, y, z) {
  this.state = state; //状态 1墙体 2箱子
  this.row = row; //所在行
  this.column = column; //所在列
  if (state == 1 || state == 2) {
    var cubegeometry = new THREE.BoxGeometry(10, 10, 10); //方块大小固定
    var texture = THREE.ImageUtils.loadTexture(materialurl);
    var cubematerial = new THREE.MeshBasicMaterial({
      map: texture
    });
    var cube = new THREE.Mesh(cubegeometry, cubematerial);
    cube.position.set(x, y, z);
    this.cube = cube; //将网孔对象传出以便移动
  }
}
/*

  人物方块类
 */
function PersonCube(row, column) {
  this.state = 3; //3代表人物
  this.row = row;
  this.column = column;
  var geometry; //用于从回调函数中取出几何对象
  var textureloader = new THREE.TextureLoader();
  var texture = textureloader.load('img/textures/blue.jpg');
  var loader = new THREE.STLLoader();
  var ghostMaterial = new THREE.MeshPhongMaterial({
    map: texture
  });
  loader.load("img/Fantasma.stl", function(obj) {
    var cube = new THREE.Mesh(obj, ghostMaterial);
    cube.rotateX(Math.PI / 2 * 3);
    cube.position.set(45, 0, 45);
    cube.scale.set(3, 3, 3);
    scene.add(cube);
    boxhelper = new THREE.BoxHelper(cube);
    scene.add(boxhelper);
    ghost.cube = cube;
  })
  this.isavailable = function(direction) {
    row = this.row;
    column = this.column;
    switch (direction) {
      case "w":
        if (cubes[row - 1] && cubes[row - 1][column].state == 0) {
          return true;
        }
        if (cubes[row - 2] && cubes[row - 2][column].state == 0) {
          if (cubes[row - 1][column].state == 2) {
            return true;
          }
        }
        return false;
      case "s":
        if (cubes[row + 1] && cubes[row + 1][column].state == 0) {
          return true;
        }
        if (cubes[row + 2] && cubes[row + 2][column].state == 0) {
          if (cubes[row + 1][column].state == 2) {
            return true;
          }
        }
        return false;
      case "a":
        if (cubes[row][column - 1] && cubes[row][column - 1].state == 0) {
          return true;
        }
        if (cubes[row][column - 2] && cubes[row][column - 2].state == 0) {
          if (cubes[row][column - 1].state == 2) {
            return true;
          }
        }
        return false;
      case "d":
        if (cubes[row][column + 1] && cubes[row][column + 1].state == 0) {
          return true;
        }
        if (cubes[row][column + 2] && cubes[row][column + 2].state == 0) {
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
var desCubes = new Array(); //用于判断是否完成
function DesCube(i, j) {
  var textureloader = new THREE.TextureLoader();
  var texture = THREE.ImageUtils.loadTexture('img/crate.jpg');
  // var texture = textureloader.load('img/crate.jpg');
  var loader = new THREE.STLLoader();
  var ghostMaterial = new THREE.MeshBasicMaterial({
    color: 0x2033a4,
    specular: 0x101010,
    shininess: 200
  });
  loader.load("img/Base_luz.stl", function(obj) {
    obj.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
      }
    });
    var cube = new THREE.Mesh(obj, ghostMaterial);
    cube.rotateX(Math.PI / 2 * 3);
    cube.position.set((j - 1) * 10 + 5, 0, (i - 1) * 10 + 5);
    cube.scale.set(3, 3, 3);
    scene.add(cube);
    boxhelper = new THREE.BoxHelper(cube);
    scene.add(boxhelper);
    desCubes.push({
      state: 0, //0代表未完成 1代表完成
      position: {
        z: i,
        x: j
      }
    });
  });
  this.checkdes=function(){
    
  }
}