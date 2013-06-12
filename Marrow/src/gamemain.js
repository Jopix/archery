var Green = cc.Layer.extend({

    boss: null,
    moveflag: null,
    aflag: null,
    touches_begin: null,

    init: function () {

        this.setTouchEnabled(true);
        var blackGround = cc.LayerColor.create(cc.c4(255, 255, 255, 255), 1280, 640);
        blackGround.setPosition(cc.p(0, 0));
        this.addChild(blackGround);
        moveflag = false;
        aflag = false;

        boss = new Contral(this);
        boss.init();

        this.schedule(this.gameloop, 1/32);

        return true;
    },

    gameloop: function () {
        boss.show();
        if (moveflag == true)
            boss.move();

        if (boss.gameover()) {
            moveflag = false;
            cc.Director.getInstance().pause();
        }
    },

    onTouchesBegan: function (touch, event) {
        touches_begin = touch[0].getLocation();
        aflag = true;
    },

    onTouchesMoved: function (touch, event) {

        if (aflag == true) {
            var touchPoint = touch[0].getLocation();
            boss.Vx = (touches_begin.x - touchPoint.x) / 15;
            if (boss.Vx < 0) {
                boss.Vx = 0;
            }

            boss.Vy = (touches_begin.y - touchPoint.y) / 15;
        }
    },


    onTouchesEnded: function (touch, event) {
       aflag = false;
       moveflag = true;
    },

});



var MyScene = cc.Scene.extend({
    //进入场景时
    onEnter: function () {
        this._super();
        var layer = new Green();
        layer.init();
        this.addChild(layer);
    }
});