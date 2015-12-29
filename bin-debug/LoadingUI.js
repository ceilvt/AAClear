//加载显示类
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingUI;p=c.prototype;
    //初始化%文本
    p.createView = function () {
        this.textField = new egret.TextField();
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.anchorOffsetX = 240;
        this.textField.x = Tools.sw() / 2;
        this.textField.y = 300;
        this.textField.textAlign = "center";
        this.addChild(this.textField);
    };
    //根据进度显示
    p.setProgress = function (current, total) {
        this.textField.text = "Loading..." + Math.floor(current / total * 100) + "%";
    };
    return LoadingUI;
})(egret.Sprite);
egret.registerClass(LoadingUI,"LoadingUI");
