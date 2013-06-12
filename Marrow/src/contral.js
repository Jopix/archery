function Contral(nScene) {

    this.Vx;
    this.Vy;//
    this.G;//重力
    this.F;//摩擦系数
    this.fk;//摩擦系数
    this.x;
    this.y;
    this.tx;
    this.ty;
    this.sx;
    this.sy;


    this.archery;
    this.backGround;

    this.init = function () {
        //初始化世界
        this.G = 1;
        this.fk = 0.00041;
        this.Vx = 1;
        this.Vy = 1;
        this.sx = 100;
        this.sy = 200;
        this.tx = this.sx;
        this.ty = this.sy;



        //初始化背景
        this.backGround = new Background(nScene);
        this.backGround.init();

        //初始化箭
        this.archery = cc.Sprite.create("res/Archery.png");
        nScene.addChild(this.archery);
        this.archery.setPosition(cc.p(this.sx, this.sy));
        this.archery.runAction(cc.RotateBy.create(0.01, -45));

    }


    this.move = function () {

        //计算水平位移
        this.F = this.Vx * this.fk;
        this.tx += this.Vx - 0.5 * this.F;
        this.x = this.tx;

        if (this.tx >= 700 && this.tx <= 1840) {
            this.x = 700;
        } else if (this.tx > 1840) {
            this.x = this.tx - 1140;
        }

        this.Vx -= this.F;
        if (this.Vx < 0) {
            this.Vx = 0;
        }

        //计算垂直位移
        this.ty += this.Vy - 0.5 * this.G;
        this.y = this.ty;

        if (this.ty > 400 && this.ty < 720) {
            this.y = 400;
        } else if (this.ty >= 720) {
            this.y = this.ty - 320;
        }

        this.Vy -= this.G;


        //背景的移动
        this.backGround.x = 1500 + this.sx - this.tx;
        if (this.tx > 1840) {
            this.backGround.x = -240;
        }

        this.backGround.y = 600;
        if (this.ty > 400 && this.ty < 960) {
            this.backGround.y -= (this.ty - 400);
        } else if (this.ty > 960) {
            this.backGround.y = 40;
        }

    }

    this.show = function () {

        this.archery.setPosition(cc.p(this.x, this.y));
        this.archery.runAction(cc.RotateTo.create(0, Math.atan2(this.Vy, this.Vx) / Math.PI * -180));
        this.backGround.show();
    }

    this.gameover = function () {
        if (this.ty <= 50) {
            return true;
        }
        return false;
    }
}