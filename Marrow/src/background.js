function Background(nScene) {
    this.x;
    this.y;
    this.bg;

    this.init = function () {
        this.x = 1500;
        this.y = 600;
        //初始化背景
        this.bg = cc.Sprite.create("res/bg.jpg");
        nScene.addChild(this.bg);
        this.bg.setPosition(cc.p(this.x, this.y));
    }

    this.show = function () {
        this.bg.setPosition(cc.p(this.x, this.y));
    }
}

