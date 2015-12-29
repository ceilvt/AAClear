/**
 *检测到的连接类
 * @author 
 *
 */
class Line extends egret.Sprite{

    public a:egret.Point;
    public b:egret.Point;
    public direct:number; //连线方向1:水平直连 0:垂直直连
    public constructor(a:egret.Point,b:egret.Point,direct:number){
        super();
        this.a = a;
        this.b = b;
        this.direct = direct;
    }
}
