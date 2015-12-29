/**
 *控制底层背景显示类
 * @author
 *test
 */
var BG = (function (_super) {
    __extends(BG, _super);
    function BG() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    var d = __define,c=BG;p=c.prototype;
    //初始化背景图
    p.init = function (e) {
        this.bg = Tools.createBitmapByName("bg");
        this.bg.cacheAsBitmap = true;
        this.bg.width = Tools.sw();
        this.bg.height = Tools.sh();
        this.addChild(this.bg);
    };
    return BG;
})(egret.Sprite);
egret.registerClass(BG,"BG");
