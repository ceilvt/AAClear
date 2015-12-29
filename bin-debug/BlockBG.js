/**
 *主显示区背景类
 * @author
 *
 */
var BlockBG = (function (_super) {
    __extends(BlockBG, _super);
    function BlockBG() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=BlockBG;p=c.prototype;
    p.init = function () {
        //状态栏
        this.lifeBar = new LifeBar;
        this.lifeBar.x = 100;
        this.lifeBar.y = -60;
        this.addChild(Tools.createBitmapByName('ceil'));
        //全部格子
        this.blockpack = new BlockPack;
        this.blockpack.x = 170;
        this.blockpack.y = 150;
        this.addChild(this.blockpack);
        this.addChild(this.lifeBar);
    };
    return BlockBG;
})(egret.Sprite);
egret.registerClass(BlockBG,"BlockBG");
