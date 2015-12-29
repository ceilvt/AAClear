

//加载显示类

//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;
//初始化%文本
    private createView():void {
        this.textField = new egret.TextField();       
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.anchorOffsetX = 240;
        this.textField.x = Tools.sw() / 2;
        this.textField.y = 300;
        this.textField.textAlign = "center";
        this.addChild(this.textField);
    }
//根据进度显示
    public setProgress(current, total):void {
        this.textField.text = "Loading..." + Math.floor(current / total*100) + "%" ;
    }
}
