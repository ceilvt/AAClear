/**
 * 格子类
 * @author 
 *
 */
class BlockUI extends egret.Sprite{
    private colArr: Array<number> = [0xff0000,0xfc00ff,0x3600ff,0x00ccff,0x00ffa8,0x00ff12,0xc6ff00,0xffae00];
    //颜色类型
    public type: number;
    //选中状态
    public strokeSP: egret.Sprite;
    //唯一值
    public data: string;
    //单元格属性
    public pos:egret.Point = new egret.Point;
    //是否显示
    private ifHide: Boolean = true;
    //测试用
    private txt: egret.TextField;
	public constructor(_type:number) {
        super();
        this.type = _type;
       
	}
	//设置显示
    public setAddChild(parentMC:egret.Sprite): void { 
        parentMC.addChild(this);
        this.init();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.dispose,this);
    }
    private init(): void { 
        this.createBG();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectPattern,this);
        Tools.getInstance().addEventListener(ToolEvent.GAME_OVER,this.gameOver,this);
        
    }
    //选择图案
    private selectPattern(e:egret.TouchEvent): void {
        if(!this.ifHide){
            return;
        }
        if(!this.strokeSP) {
            this.createStroke();
        } else { 
            this.addChild(this.strokeSP);
        }
        
        Tools.getInstance().lastPattern = Tools.getInstance().thisPattern;
        Tools.getInstance().thisPattern = this;
        Tools.getInstance().dispatchEvent(new ToolEvent(ToolEvent.GAME_TAB_PATTERN));
        
    }
    //移除
    private dispose(): void { 
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.selectPattern,this);
    }
    //生成边框
    private createStroke(): void {
        var sp:egret.Sprite = new egret.Sprite;
            sp.graphics.lineStyle(4,0x486000);
            sp.graphics.drawCircle(0,0,40);
            this.strokeSP = sp;
            this.strokeSP.addEventListener(egret.Event.ADDED_TO_STAGE,this.setHide1,this);
            this.strokeSP.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.setHide2,this);
            this.addChild(this.strokeSP);
    }
    //
    private setHide1(e:egret.Event): void { 
        this.ifHide = false;
    }
    private setHide2(e: egret.Event): void {
        this.ifHide = true;
    }
    //生成背景
    private createBG(): void { 
        this.graphics.beginFill(this.colArr[this.type]);
        this.graphics.drawCircle(0,0,40);
        this.graphics.endFill();
        /*this.txt = new egret.TextField;
        this.txt.text = this.pos.x + '_'+this.pos.y;
        this.addChild(this.txt);*/
    }
    
    private gameOver(e:ToolEvent): void { 
        this.touchEnabled = false;
    }
}
