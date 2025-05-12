import Phaser from 'phaser';

import sky from "/src/assets/images/sky.png"
import ground from "/src/assets/images/platform.png"
import star from "/src/assets/images/star.png"
import bomb from "/src/assets/images/bomb.png"
import dude from "/src/assets/images/dude.png"

class MyScene extends Phaser.Scene{

    preload(){ //预加载函数，加载各种资源
        // this.load.setBaseURL("/src/assets/images/");
        this.load.image("sky", sky);
        this.load.image("ground",ground);
        this.load.image("star", star);
        this.load.image("bomb", bomb);
        //this.load.image("dude", "assets/dude.png");
        
        //spritesheet 和CSS sprite差不多，将一些图片合并放到一张大图上
        //一般这种方法用到经常需要变动的元素
        this.load.spritesheet("dude", dude, {
            frameWidth:32,// 展示的宽
            frameHeight:48 //展示的高
        })

        this.gameOver = false;
    }

    create(){ // 创建场景，将资源加载进去，并处理游戏中的逻辑、屋里碰撞，事件监听都在这里
        this.add.image(400, 300, "sky");// phaser3中，资源的坐标不是从左上角定位的，而是从元素中心开始定位的
        //this.add.image(0,0,"sky").setOrigin(0,0)，这一句和上一句含义相同（改变了原点坐标）
        
        //physics属性必须在配置中添加，否则会报错
        let platforms = this.physics.add.staticGroup();//创建一个静态物理组
        //setScale 放大图像，之后必须使用refreshBody进行刷新
        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");

        //将英雄添加到游戏场景中
        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.2);//设置弹跳能力，0不会跳，1跳来跳去
        this.player.setCollideWorldBounds(true); //设置英雄是否与界面碰撞， true表示英雄不会掉到世界外面去
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1 
        });

        this.anims.create({
            key: 'turn',
            frames:[{key: "dude", frame:4}],
            frameRate:20
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers('dude', {start:5, end: 8}),
            frameRate: 10,
            repeate: -1
        });

        this.physics.add.collider(this.player, platforms);

        let stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { 
                x: 12, 
                y: 0, 
                stepX: 70 
            }
        });
        stars.children.iterate(function (child) {
            child.setScale(0.2);//缩小星星
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));//设置每一个星星的垂直弹力值
        });

        //让星星和平台产生碰撞
        this.physics.add.collider(stars, platforms);

        function createBomb(player, bombs){
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1); //设置一直弹
            bomb.setCollideWorldBounds(true); //设置边界碰撞，不会到界面外
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);//设置x、y轴的速度
        }

        let bombs = this.physics.add.group();
        createBomb(this.player, bombs);

        // this.add.text 是创建一个文字对象并添加到当前的场景中。返回一个 Phaser.GameObjects.Text 实例，将实例赋值给 scoreText。
        // 它传入 4 个参数：
        // 文字 x 坐标
        // 文字 y 坐标
        // 文字内容
        // 文字的样式配置
        let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        let score = 0;    
        function collectStar (player, star){
            star.disableBody(true, true);
            score += 10;
            scoreText.setText('Score: ' + score);

            if (stars.countActive(true) === 0)
            {
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);//重新添加至场景中
                });
                createBomb(this.player, bombs);
            }
        }


        this.physics.add.collider(bombs, platforms)

        //处理英雄与炸弹碰撞    
        this.physics.add.collider(this.player, bombs, hitBomb, null, this);
        function hitBomb(player, bomb){
            this.physics.pause(); //设置暂停
            player.setTint(0xff0000); // 设置英雄哥颜色
            player.anims.play('turn'); //设置英雄样式
            this.gameOver = true; //设置游戏结束
        }

        //this.physics.add.overlap 用来创建一个碰撞覆盖对象，可以监听到两个物体是否发生了碰撞覆盖。它会返回一个 Phaser.Physics.Arcade.Collider 对象实例
        // 5个参数
        // 前面两个是覆盖的游戏元素对象
        // 第三个是覆盖的回调函数
        // 第四个也是覆盖的回调函数，但是必须返回一个 boolean 值。
        // 第五个是函数执行的作用域对象指向
        this.physics.add.overlap(this.player, stars, collectStar, null, this);
        
        

    }

    update() // 每一帧就会执行，有两个参数，time,delta, time是执行了多长时间，单位是ms, delta是间隔时间，默认是16ms，也就是每隔16ms就会执行一次 
    {
        if(this.gameOver ){
            return;
        }
        
        //this.input.keyboard.createCursorKeys 返回一个 Phaser.Types.Input.Keyboard.CursorKeys 实例，这个实例里面包含了 up、down、left、right、space、shift 6个键。
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        
        if (cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);//330像素每秒
        }


    }
} 

export default MyScene;
