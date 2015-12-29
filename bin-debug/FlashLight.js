/**
 *随机生成连线类 暂时无用 待维护
 * @author
 *
 */
var FlashLight = (function (_super) {
    __extends(FlashLight, _super);
    function FlashLight() {
        _super.call(this);
    }
    var d = __define,c=FlashLight;p=c.prototype;
    p.init = function (a, b) {
        this.graphics.clear();
        var dis;
        var arrY = [];
        if (a.x != b.x) {
            dis = Math.abs(a.x - b.x) * 100;
        }
        if (a.y != b.y) {
            dis = Math.abs(a.y - b.y) * 100;
        }
        for (var i = 0; i < Math.floor(dis / 10); i++) {
            var vx = 10 * i + Math.random() * 10;
            var vy = -5 + Math.random() * 10;
            this.perDot(vx, vy);
        }
    };
    p.perDot = function (a, b) {
        var color = Math.floor(Math.random() * 0xffffff);
        this.graphics.beginFill(color);
        this.graphics.drawCircle(a, b, 6);
        this.graphics.endFill();
        console.log(color);
    };
    return FlashLight;
})(egret.Sprite);
egret.registerClass(FlashLight,"FlashLight");
