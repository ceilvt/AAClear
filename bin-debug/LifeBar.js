/**
 *生命值状态条显示类
 * @author
 *
 */
var LifeBar = (function (_super) {
    __extends(LifeBar, _super);
    function LifeBar() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=LifeBar;p=c.prototype;
    p.init = function () {
        //重置按钮
        this.refreshMC = new egret.Sprite();
        this.refreshMC.x = 300;
        this.refreshMC.addChild(Tools.createBitmapByName('refresh'));
        this.addChild(this.refreshMC);
        this.refreshMC.touchEnabled = true;
        this.refreshMC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshFun, this);
        //
        this.createInfoBar();
        Tools.getInstance().addEventListener(ToolEvent.GAME_START, this.startEnterFrame, this);
        Tools.getInstance().addEventListener(ToolEvent.GAME_OVER, this.stopEnterFrame, this);
    };
    //初始化时间
    p.createInfoBar = function () {
        this.timeTxt = new egret.TextField;
        this.timeTxt.width = 250;
        this.timeTxt.textColor = 0x000000;
        this.timeTxt.x = 48;
        this.timeTxt.size = 40;
        this.timeTxt.height = 60;
        this.timeTxt.verticalAlign = "middle";
        this.timeTxt.text = '30:00';
        this.addChild(this.timeTxt);
    };
    //检测时间
    p.startEnterFrame = function (e) {
        this.lastTime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.checkTime, this);
    };
    //停止 检测时间
    p.stopEnterFrame = function (e) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.checkTime, this);
    };
    //时间显示更新
    p.checkTime = function (e) {
        var t = egret.getTimer();
        var reduceTime = Math.floor((t - this.lastTime) / 100);
        //当计时大于29秒时，停
        if (reduceTime > 299) {
            Tools.getInstance().dispatchEvent(new ToolEvent(ToolEvent.GAME_OVER));
            this.removeEventListener(egret.Event.ENTER_FRAME, this.checkTime, this);
            PopPanel.getInstance().tip('游戏结束，即将跳入结果页!', this.stage);
        }
        Tools.getInstance().currentPassTime = Tools.getInstance().totalTime - 100 * reduceTime;
        var str = Tools.getInstance().currentPassTime;
        var numS = Math.floor(str / 1000);
        var numMS = (str % 1000) / 10;
        var numMS_ = (numMS == 0) ? '00' : numMS;
        var numTxt = numS > 9 ? numS : '0' + numS;
        this.timeTxt.text = numTxt + ':' + numMS_;
    };
    //发送刷新命令
    p.refreshFun = function (e) {
        Tools.getInstance().dispatchEvent(new ToolEvent(ToolEvent.GAME_REFRESH));
    };
    return LifeBar;
})(egret.Sprite);
egret.registerClass(LifeBar,"LifeBar");
