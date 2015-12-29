/**
 *检测到的连接类
 * @author
 *
 */
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(a, b, direct) {
        _super.call(this);
        this.a = a;
        this.b = b;
        this.direct = direct;
    }
    var d = __define,c=Line;p=c.prototype;
    return Line;
})(egret.Sprite);
egret.registerClass(Line,"Line");
