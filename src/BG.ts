/**
 *控制底层背景显示类
 * @author 
 *
 */
class BG extends egret.Sprite{
    
    private bg: egret.Bitmap;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
	}
	//初始化背景图
    private init(e:egret.Event): void { 
        this.bg = Tools.createBitmapByName("bg");
        this.bg.cacheAsBitmap = true;
        this.bg.width = Tools.sw();
        this.bg.height = Tools.sh();  
        this.addChild(this.bg);
       
    }

}
