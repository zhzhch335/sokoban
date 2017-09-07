/*
  3D图形绘制
 */
/*
  组件加载
 */
//渲染器
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//相机
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
// camera.lookAt(new THREE.Vector3(50, 0, 50));
camera.position.set(50, 100, 250);
//场景
var scene = new THREE.Scene();
//辅助线
// var axishelper = new THREE.AxisHelper(100);
// scene.add(axishelper);
// var boxhelper;
//移轴组件
var control = new THREE.OrbitControls(camera);
control.target.x = 50;
control.target.z = 50;
control.enableKeys = false;
control.autoRotate = true;
control.autoRotateSpeed = 7;
control.update();
//自然光
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
/*

   元素绘制
 */
//网格线的绘制
for (var i = 0; i <= 100; i += 10) {
    //线长度固定
    var lineContainer = new THREE.Geometry();
    lineContainer.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 100));
    //与z轴平行的线
    var line = new THREE.Line(lineContainer, new THREE.LineBasicMaterial());
    scene.add(line);
    line.position.set(i, 0, 0);
    // 与x轴平行的线
    var rotateline = new THREE.Line(lineContainer, new THREE.LineBasicMaterial());
    rotateline.rotateY(Math.PI / 2);
    rotateline.position.set(0, 0, i);
    scene.add(rotateline);
}
var tempindex = 0;
// var temparray = [2, 2, 2, 0, 2, 1, 2, 1, 1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 1, 0, 0, 0, 4, 2, 1, 1, 0, 2, 1, 2, 2, 2, 0, 1, 0, 2, 1, 0, 0, 1, 1, 2, 2, 2, 3, 1, 0, 1, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 1, 0, 1, 1, 0, 0, 1, 0, 1, 2, 2, 0, 1, 1, 2, 1, 0, 0, 2, 0, 0, 0, 1, 1, 2, 0, 1, 0, 0, 2, 0, 0, 2, 2, 2];
var temparray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 2, 0, 2, 4, 0, 0, 0, 0, 4, 0, 2, 3, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// var temparray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//方块生成，使用二维数组
// var cubes = new Array();
for (var i = 1; i <= 10; i++) {
    cubes[i] = new Array(); //避免一维数组未初始化时调用二维索引出错
    for (var j = 1; j <= 10; j++) {
        // var index = parseInt(Math.random() * 3);
        var index = temparray[tempindex];
        switch (index) {
            case 4:
                console.log(i, j);
                var descube = new DesCube(i, j);
                cubes[i][j] = {
                    state: 4
                };
                tempindex++;
                break;
            case 3:
                console.log(i, j);
                var ghost = new PersonCube(i, j);
                cubes[i][j] = {
                    state: 3
                }; //更新数组
                tempindex++;
                break;
            case 2:
                cubes[i][j] = new Cube(index, i, j, 'crate', (j - 1) * 10 + 5, 5, (i - 1) * 10 + 5);
                // scene.add(cubes[i][j].cube);
                tempindex++;
                break;
            case 1:
                cubes[i][j] = new Cube(index, i, j, 'bricks', (j - 1) * 10 + 5, 5, (i - 1) * 10 + 5);
                // scene.add(cubes[i][j].cube);
                tempindex++;
                break;
            case 0:
                cubes[i][j] = new Cube(0, i, j);
                tempindex++;
            default:
                continue;
        }
    }
}
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
//动画循环渲染
function gameloop() {
    // if (boxhelper) { //避免回调函数未完成而出现的错误
    //   boxhelper.update();
    // }
    stats.update();
    if (control) {
        control.update();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(gameloop);
}
gameloop();