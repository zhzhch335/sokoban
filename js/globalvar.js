// 数据存储
var cubes = new Array();//方块数组
var desCubes = new Array(); //完成点数组
var ghost; //全局对象-人物
var descube; //全局对象-终点
var step = []; //用于存储游戏步骤
var stepflag = []; //用于存储步骤中箱子的移动状态
var temparray;//用于存储当前地图数据的临时数组

//图形绘制
var textureloader = THREE.ImageUtils;//材质加载器
var render;//渲染器
var camera;//相机
var scene;//场景
var light;//光线

//附加组件
var stats;//FPS监控组件
var control;//移轴组件

// UI部分
var eventID;//用于停止循环
var levelID=1;//记录当前关卡
var draw;//用于停止自动完成动画

// // IE兼容性适配
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}