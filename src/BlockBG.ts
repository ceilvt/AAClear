/**
 * 主显示区背景类
 * @author 
 *
 */
class BlockBG extends egret.Sprite {
    public constructor() {
        super();
        this.init();
    }
    //
    private blockpack: BlockPack;
    //
    private lifeBar: LifeBar;
    private init(): void {
        //状态栏
        this.lifeBar = new LifeBar;
        this.lifeBar.x = 100;
        this.lifeBar.y = -60;
        
        this.addChild(Tools.createBitmapByName('ceil'));
        //全部格子
        this.blockpack = new BlockPack;
        this.blockpack.x = 170;
        this.blockpack.y = 150;
        this.addChild(this.blockpack);
        this.addChild(this.lifeBar);
    }
}
