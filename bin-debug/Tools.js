/**
 *公共方法及属性类
 * @author
 *
 */
var Tools = (function (_super) {
    __extends(Tools, _super);
    //
    function Tools() {
        _super.call(this);
        //计时器时间
        this.totalTime = 30000;
        //当前经过时间
        this.currentPassTime = 0;
        //图案总数
        this.objLen = 24;
    }
    var d = __define,c=Tools;p=c.prototype;
    //获取宽
    Tools.sw = function () {
        var sw = egret.MainContext.instance.stage.stageWidth;
        var sh = egret.MainContext.instance.stage.stageHeight;
        if (sw > sh) {
            return sh;
        }
        else {
            return sw;
        }
    };
    //获取高
    Tools.sh = function () {
        var sw = egret.MainContext.instance.stage.stageWidth;
        var sh = egret.MainContext.instance.stage.stageHeight;
        if (sw > sh) {
            return sw;
        }
        else {
            return sh;
        }
    };
    //获取Tools实例
    Tools.getInstance = function () {
        if (Tools.instance == null) {
            Tools.instance = new Tools;
            Tools.instance.visible = false;
        }
        return Tools.instance;
    };
    //从mc工厂va1中获取va2
    Tools.createMCByName = function (va1, va2) {
        var data = RES.getRes(va2 + ".json");
        var txtr = RES.getRes(va2 + ".png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData());
        console.log(data);
        return mc;
    };
    //获取图片  
    Tools.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Tools.createSpriteSheetByName = function (name) {
        var texture = RES.getRes(name);
        var result = new egret.SpriteSheet(texture);
        return result;
    };
    //从纹理集中提取素材
    Tools.getBitmapFromSheet = function (parentName, sonName) {
        var txtr = RES.getRes(parentName + '.' + sonName);
        var img = new egret.Bitmap(txtr);
        return img;
    };
    Tools.getBitmapFont = function (fontname) {
        var bitmapFont = RES.getRes(fontname);
        var bitmap1 = new egret.BitmapText();
        bitmap1.font = bitmapFont;
        return bitmap1;
    };
    //发送请求
    Tools.sendURL = function (url, fun) {
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, function (event) {
            console.log("向服务器数据请求成功,数据为:" + loader.data);
            fun();
            this.theFastCar = loader.data;
        }, this);
        loader.load(new egret.URLRequest(url));
    };
    //弹窗提示
    p.tip = function () {
        Tools.getInstance().visible = !Tools.getInstance().visible;
        if (!Tools.getInstance().bg) {
            Tools.getInstance().bg = new egret.Sprite();
            Tools.getInstance().bg.graphics.beginFill(0x000000, 0.7);
            Tools.getInstance().bg.graphics.drawRect(0, 0, Tools.sw(), Tools.sh());
            Tools.getInstance().bg.graphics.endFill();
            Tools.getInstance().addChild(Tools.getInstance().bg);
        }
    };
    //游戏过关
    p.tipWin = function () {
        Tools.getInstance().visible = !Tools.getInstance().visible;
    };
    //初始化注册点
    p.initObjOffset = function (obj) {
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
    };
    return Tools;
})(egret.Sprite);
egret.registerClass(Tools,"Tools");
