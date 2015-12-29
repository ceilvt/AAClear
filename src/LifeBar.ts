/**
 * 生命值状态条显示类
 * @author 
 *
 */
class LifeBar extends egret.Sprite{
	public constructor() {
        super();
        this.init();
	}
	//重列按钮
    public refreshMC: egret.Sprite;
    //时间显示
    public timeTxt: egret.TextField;
    //
    private lastTime: number;
    private init(): void {
        //重置按钮
        this.refreshMC = new egret.Sprite();
        this.refreshMC.x = 300;
        this.refreshMC.addChild(Tools.createBitmapByName('refresh'));
        this.addChild(this.refreshMC);
        this.refreshMC.touchEnabled = true;
        this.refreshMC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.refreshFun,this);
        
        //
        this.createInfoBar();
        Tools.getInstance().addEventListener(ToolEvent.GAME_START,this.startEnterFrame,this);
        Tools.getInstance().addEventListener(ToolEvent.GAME_OVER,this.stopEnterFrame,this);
    }
    
    //初始化时间
    private createInfoBar(): void {
        this.timeTxt = new egret.TextField;
        this.timeTxt.width = 250;
        this.timeTxt.textColor = 0x000000;
        this.timeTxt.x = 48;
        this.timeTxt.size = 40;
        this.timeTxt.height = 60;
        this.timeTxt.verticalAlign = "middle";
        this.timeTxt.text = '30:00';
        this.addChild(this.timeTxt);
    }
    //检测时间
    private startEnterFrame(e:ToolEvent): void { 
        this.lastTime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME,this.checkTime,this);
    }
    //停止 检测时间
    private stopEnterFrame(e: ToolEvent): void { 
        this.removeEventListener(egret.Event.ENTER_FRAME,this.checkTime,this);
    }
    //时间显示更新
    private checkTime(e: egret.Event): void {
        var t = egret.getTimer();
        var reduceTime = Math.floor((t - this.lastTime) / 100);
        //当计时大于29秒时，停
        if(reduceTime > 299) {
            Tools.getInstance().dispatchEvent(new ToolEvent(ToolEvent.GAME_OVER));
            this.removeEventListener(egret.Event.ENTER_FRAME,this.checkTime,this);
            PopPanel.getInstance().tip('游戏结束，即将跳入结果页!',this.stage);
        }
        Tools.getInstance().currentPassTime = Tools.getInstance().totalTime - 100 * reduceTime;
        var str = Tools.getInstance().currentPassTime;
        var numS = Math.floor(str / 1000);
        var numMS = (str % 1000) / 10;
        var numMS_ = (numMS == 0) ? '00' : numMS;
        var numTxt = numS > 9 ? numS : '0' + numS;
        this.timeTxt.text = numTxt + ':' + numMS_;

    }
    //发送刷新命令
    private refreshFun(e:egret.TouchEvent): void { 
        Tools.getInstance().dispatchEvent(new ToolEvent(ToolEvent.GAME_REFRESH));
    }
}
