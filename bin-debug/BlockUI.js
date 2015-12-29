/**
 *格子类
 * @author
 *
 */
var BlockUI = (function (_super) {
    __extends(BlockUI, _super);
    function BlockUI(_type) {
        _super.call(this);
        this.colArr = [0xff0000, 0xfc00ff, 0x3600ff, 0x00ccff, 0x00ffa8, 0x00ff12, 0xc6ff00, 0xffae00];
        //单元格属性
        this.pos = new egret.Point;
        //是否显示
        this.ifHide = true;
        this.type = _type;
    }
    var d = __define,c=BlockUI;p=c.prototype;
    //设置显示
    p.setAddChild = function (parentMC) {
        parentMC.addChild(this);
        this.init();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
    };
    p.init = function () {
        this.createBG();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectPattern, this);
        Tools.getInstance().addEventListener(ToolEvent.GAME_OVER, this.gameOver, this);
    };
    //选择图案
    p.selectPattern = function (e) {
        if (!this.ifHide) {
            return;
        }
        if (!this.strokeSP) {
            this.createStroke();
        }
        else {
            this.addChild(this.strokeSP);
        }
        Tools.getInstance().lastPattern = Tools.getInstance().thisPattern;
        Tools.getInstance().thisPattern = this;
        Tools.getInstance().dispatchEvent(new ToolEvent(ToolEvent.GAME_TAB_PATTERN));
    };
    //移除
    p.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectPattern, this);
    };
    //生成边框
    p.createStroke = function () {
        var sp = new egret.Sprite;
        sp.graphics.lineStyle(4, 0x486000);
        sp.graphics.drawCircle(0, 0, 40);
        this.strokeSP = sp;
        this.strokeSP.addEventListener(egret.Event.ADDED_TO_STAGE, this.setHide1, this);
        this.strokeSP.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.setHide2, this);
        this.addChild(this.strokeSP);
    };
    //
    p.setHide1 = function (e) {
        this.ifHide = false;
    };
    p.setHide2 = function (e) {
        this.ifHide = true;
    };
    //生成背景
    p.createBG = function () {
        this.graphics.beginFill(this.colArr[this.type]);
        this.graphics.drawCircle(0, 0, 40);
        this.graphics.endFill();
        /*this.txt = new egret.TextField;
        this.txt.text = this.pos.x + '_'+this.pos.y;
        this.addChild(this.txt);*/
    };
    p.gameOver = function (e) {
        this.touchEnabled = false;
    };
    return BlockUI;
})(egret.Sprite);
egret.registerClass(BlockUI,"BlockUI");
