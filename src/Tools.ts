/**
 * 公共方法及属性类
 * @author 
 *
 */
class Tools extends egret.Sprite {
    //
 
    public ifOver: Boolean;
    //计时器时间
    public totalTime: number = 30000;
    //当前经过时间
    public currentPassTime: number = 0;
    //上次点击的图案
    public lastPattern: BlockUI;
    //当前点击图案
    public thisPattern: BlockUI;
    //图案总数
    public objLen: number = 24;
    private static instance: Tools;
    private bg: egret.Sprite;

    private txt: egret.TextField;
    //
    
	public constructor() {
        super();
        
	}
	//获取宽
    public static sw(): number { 
        var sw = egret.MainContext.instance.stage.stageWidth;
        var sh = egret.MainContext.instance.stage.stageHeight;
        if(sw > sh) {
            return sh;
        } else { 
            return sw;
        }
    }
    //获取高
    public static sh(): number { 
        var sw = egret.MainContext.instance.stage.stageWidth;
        var sh = egret.MainContext.instance.stage.stageHeight;
        if(sw > sh) {
            return sw;
        } else { 
            return sh;
        }
    }

    //获取Tools实例
    public static getInstance(): Tools { 
        
        if(Tools.instance == null){ 
            Tools.instance = new Tools;
            Tools.instance.visible = false;
            
        }
        return Tools.instance;
    }

    
    //从mc工厂va1中获取va2
    public static createMCByName(va1: string,va2:string): egret.MovieClip { 
                
        var data = RES.getRes(va2+".json");
        var txtr = RES.getRes(va2+".png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData());
        console.log(data);
        return mc;     
    }
    //获取图片  
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    
    public static createSpriteSheetByName(name:string): egret.SpriteSheet { 
        var texture:egret.Texture = RES.getRes(name);
        var result: egret.SpriteSheet = new egret.SpriteSheet(texture);
        return result;
    }
    
    //从纹理集中提取素材
    public static getBitmapFromSheet(parentName:string,sonName:string): egret.Bitmap { 
        var txtr:egret.Texture = RES.getRes(parentName+'.'+sonName);
        var img:egret.Bitmap = new egret.Bitmap( txtr );
            return img;
    }
    public static getBitmapFont(fontname:string): egret.BitmapText { 
        var bitmapFont:egret.BitmapFont = RES.getRes(fontname);
        var bitmap1 = new egret.BitmapText();
            bitmap1.font = bitmapFont;
        return bitmap1;
    }   
    //发送请求
    public static sendURL(url:string,fun:Function): void { 
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,function(event:egret.Event) {
            console.log("向服务器数据请求成功,数据为:"+loader.data);
            fun();
            this.theFastCar = <number>loader.data;
        },this);
        loader.load(new egret.URLRequest(url));
    }
    //弹窗提示
    public tip(): void { 
        Tools.getInstance().visible = !Tools.getInstance().visible;
        
        if(!Tools.getInstance().bg){ 
            Tools.getInstance().bg = new egret.Sprite();
            Tools.getInstance().bg.graphics.beginFill(0x000000,0.7);
            Tools.getInstance().bg.graphics.drawRect(0,0,Tools.sw(),Tools.sh());
            Tools.getInstance().bg.graphics.endFill();
            Tools.getInstance().addChild(Tools.getInstance().bg);
        }

            }
    //游戏过关
    
    private tipWin(): void { 
        Tools.getInstance().visible = !Tools.getInstance().visible;
       
    }
    //初始化注册点
    public initObjOffset(obj: any): void { 
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
    }
}
