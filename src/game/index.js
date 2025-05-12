import Phaser from 'phaser';
import MyScene from '@/game/scenes/myScene.js'
// import ActionScene from '@/game/scenes/action/actionScene.js'


const config = {
    type:Phaser.AUTO, // 自动尝试WebGL，否则退回到Canvas
    width:800,// 游戏界面宽
    height:600, //游戏界面高
    scene:[
        MyScene, // 引入MyScene场景
    ],//游戏的具体场景
    physics:{ // 开启游戏物理引擎，不然物理环境不会生效，分别是arcade\impact\matter
        default:"arcade",//默认arcade
        arcade:{
            gravity:{ //重力加速度 单位px/s
                y:300 
            },
            debug:false //开启调试模式，如果开启了，就会给每隔元素加上边框，还有移动的方向
        }
    }
}
// 创造的游戏
const startGame = (parent) => {
    return new Phaser.Game({...config, parent});
};

export default startGame;