/**
 *弹窗类
 * @author
 *
 */
var PopPanel = (function (_super) {
    __extends(PopPanel, _super);
    function PopPanel() {
        _super.call(this);
    }
    var d = __define,c=PopPanel;p=c.prototype;
    p.init = function () {
        this.gameoverPanel = new egret.Sprite;
        this.initBG();
        this.initGameoverPanel();
    };
    //初始化
    p.initGameoverPanel = function () {
        //提示性文本
        this.text = new egret.TextField;
        this.text.textAlign = 'left';
        this.text.width = 440;
        this.text.height = 200;
        this.text.lineSpacing = 16;
        this.text.y = 50;
        this.text.x = Tools.sw() / 2 - 260;
        //面板按钮初始化
        this.btn = new egret.Sprite;
        this.btn.addChild(Tools.createBitmapByName('replay'));
        this.btn.anchorOffsetX = this.btn.width / 2;
        this.btn.anchorOffsetY = this.btn.height / 2;
        this.btn.y = 70;
        this.btn.touchEnabled = true;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            window.location.href = window.location.href;
        }, this);
        this.gameoverPanel.addChild(this.bg);
        this.gameoverPanel.addChild(this.text);
        this.gameoverPanel.addChild(this.btn);
        this.text.text = '游戏结束，数据提交中...';
        var j = 0;
        var t = '游戏结束，数据提交中';
        var mc = this;
        //...动画显示
        setInterval(function () {
            j++;
            if (j % 4 == 0) {
                mc.text.text = t;
            }
            if (j % 4 == 1) {
                mc.text.text = t + '.';
            }
            if (j % 4 == 2) {
                mc.text.text = t + '..';
            }
            if (j % 4 == 3) {
                mc.text.text = t + '...';
            }
        }, 200);
    };
    //单例
    PopPanel.getInstance = function () {
        if (this.instance == null) {
            this.instance = new PopPanel;
            this.instance.init();
        }
        return this.instance;
    };
    //背景
    p.initBG = function () {
        this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0x000000, 0.8);
        this.bg.graphics.drawRect(0, 0, Tools.sw(), Tools.sh());
        this.bg.graphics.endFill();
        this.bg.anchorOffsetX = Tools.sw() / 2;
        this.bg.anchorOffsetY = Tools.sh() / 2;
    };
    //外部调用
    p.tip = function (str, mc) {
        var mc2 = this;
        //this.text.text = str;
        this.text.anchorOffsetX = this.text.width / 2;
        this.text.anchorOffsetY = this.text.height / 2;
        setTimeout(function () {
            mc.addChild(mc2.gameoverPanel);
        }, 500);
        this.gameoverPanel.x = Tools.sw() / 2;
        this.gameoverPanel.y = Tools.sh() / 2;
    };
    return PopPanel;
})(egret.Sprite);
egret.registerClass(PopPanel,"PopPanel");
