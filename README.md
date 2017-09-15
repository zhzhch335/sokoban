# sokoban 推箱子
这是一个主要使用threejs框架写的推箱子游戏

浏览器支持：
FireFox 23+
Chrome 33+
IE 11
Edge

使用的主要框架有：
threejs 3D图形的渲染
OrbitControls 3D视角的控制
promise.min.js （仅IE）es6支持，主要用于弹窗美化处理的支持
stats.min.js FPS监控组件
STLLloader 3D模型加载组件
sweetalert 弹窗美化
Buttons 开源按钮样式库
font-awesome 字体图标

操作说明
鼠标拖动调整视角
鼠标滚轮调整远近
使用wasd控制方向（根据视角调整前后左右）

加载文件说明
地图文件：10*10的矩阵先行后列的依次写出，使用英文逗号","分割，0代表空，1代表墙，2代表箱子，3代表人物，4代表终点
（目前仅支持10*10的矩阵，若文件内元素不足100则无法读取文件）
示例参考loadfiles文件夹下的1.map.txt文件
解答文件：每个步骤使用↑↓←→来标注每一步的步骤，使用英文逗号","分割
示例参考loadfiles文件夹下的1.answer.txt文件

目录结构
css
./button.css 开源按钮样式库
./font-awesome.css.map
./font-awesome.min.css 字体图标
./style.css UI元素样式
./sweetalert2.min.css 弹窗美化
fonts 字体图标支持
./FontAwesome.otf
./fontawesome-webfont.eot
./fontawesome-webfont.svg
./fontawesome-webfont.ttf
./fontawesome-webfont.woff
./fontawesome-webfont.woff2
img
./Base_luz.stl 目标点模型
./Fantasma.stl 幽灵模型
./bricks.jpg 砖块贴图
./crate.jpg 木箱贴图
./hacker.jpg 普通背景图
./success.jpg 完成背景图
./wasd.png 操作提示
js
./animate.js 动画
./Cube.js 方块元素生成
./globalvar.js 全局变量
./operation.js 操作响应
./OrbitControl.js 视角调整
./promise.min.js es6支持
./stats.min.js FPS监控
./STLLoader.js 3D模型加载
./sweetalert2.min.js 弹窗美化
./three.min.js 3D图形基类
./TRender.js 3D组件初始化
./UI.js UI控制
loadfiles 示例地图文件和解答文件
./*.map.txt 地图文件
./*.answer.txt 解答文件
index.html
README.md