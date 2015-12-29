/**
 *随机生成连线类 暂时无用 待维护
 * @author 
 *
 */
class FlashLight extends egret.Sprite{
	public constructor() {
        super();
	}
	
    public init(a:egret.Point,b:egret.Point): void { 
        this.graphics.clear();
        var dis: number;
        var arrY: Array<Object> = [];
        if(a.x != b.x){ 
            dis = Math.abs(a.x - b.x)*100;
        }
        if(a.y != b.y){ 
            dis = Math.abs(a.y - b.y)*100;
        }
        for(var i: number = 0;i < Math.floor(dis / 10);i++){
            var vx = 10 * i + Math.random() * 10;
            var vy = -5+Math.random()*10;
            this.perDot(vx,vy);
        }
    }
    
    private perDot(a:number,b:number): void { 
        var color: number = Math.floor(Math.random() * 0xffffff);
        this.graphics.beginFill(color);   
        this.graphics.drawCircle(a,b,6);
        this.graphics.endFill();
        console.log(color);
    }
}
