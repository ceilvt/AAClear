/**
 *管理格子类
 * @author 
 *
 */
class BlockPack extends egret.Sprite{
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
    }
    //连连看格子数
    private ceilW: number = 4;
    private ceilH: number = 6;
    //图片类型数
    private typeN: number = 8;
    //图案列表
    private dataArr: Array<number> = [];
    //0,1表示的格子是否为空
    private mapData: Array<Array<number>> = [];
    //初始化图案分布 
    //连接线
    private connectLine: egret.Sprite;
    //private flashLight: FlashLight;
    private dicObj: Object = {};
    private lifeBar: LifeBar;
    private init(e: egret.Event): void {
        Tools.getInstance().addEventListener(ToolEvent.GAME_REFRESH,this.refreshMap,this);
        this.connectLine = new egret.Sprite;
        //this.flashLight = new FlashLight;
        this.addChild(this.connectLine);
        
        //图案分布
        for(var j: number = 0;j < this.ceilW * this.ceilH/2;j++){
            var ran: number = Math.floor(Math.random()*this.typeN);
            this.dataArr.push(ran);
            this.dataArr.push(ran);
        }
        this.dataArr = this.randomArr(this.dataArr);
        //初始化0,1表示的格子 宽高都增加2个格子
        for(var h: number = 0;h < (this.ceilH + 2);h++){ 
            this.mapData[h] = [];
            for(var l: number = 0;l < (this.ceilW + 2);l++){ 
                this.mapData[h].push(0);
            }
        }
        //
        for(h = 1;h < (this.ceilH + 1);h++){ 
            for(l = 1;l < (this.ceilW + 1);l++){ 
                this.mapData[h][l] = 1;
                var obj: BlockUI = new BlockUI(this.dataArr[this.ceilW*(h-1)+(l-1)]);
                obj.data = h+'_'+l;
                obj.pos.x = h;
                obj.pos.y = l;
                obj.x = (l-1) * 100;
                obj.y = (h-1) * 100;
                obj.setAddChild(this);
                this.dicObj[h + '_' + l] = obj;
            }
        }
       // this.addChild(this.flashLight);
        Tools.getInstance().addEventListener(ToolEvent.GAME_TAB_PATTERN,this.handleCore,this);
    }
    
    //打乱字母排序
    private randomArr(arr: Array<number>): Array<number> {
        var outputArr: Array<number> = arr;
        var i: number = outputArr.length;
        while(i > -1) {
            outputArr.push(outputArr.splice(Math.floor(Math.random() * i),1)[0]);
            i--;
        }
        return outputArr;
    }
    //处理中心
    private handleCore(): void { 
        var objL: BlockUI = Tools.getInstance().lastPattern;
        var objT: BlockUI = Tools.getInstance().thisPattern;
        if(!objL) {
            return;
        }
        if((objT.type != objL.type)) {
            objL.removeChild(objL.strokeSP);
            objL = null;
            return;
        } 
        if(this.checkLink(objL.pos,objT.pos)) {
            this.clearBlockUI();
        } else { 
            objL.removeChild(objL.strokeSP);
            objL = null;
        }
        
    }
    //总检测函数
    private checkLink(a: egret.Point,b: egret.Point): Boolean {

        if(a.x == b.x && this.leftAndRight(a,b)) {
            this.drawConnectLine(a,b,null,null);
           // console.log('左右直连:',a.x,b.x,a.y,b.y);
            return true;
        }
        if(a.y == b.y && this.upAndDown(a,b)) {
            this.drawConnectLine(a,b,null,null);
           // console.log('上下直连:',a.x,a.y,b.x,b.y);
            return true;
        }
        if(this.oneCorner(a,b)) {
            //console.log('一个拐角:',a.x,b.x,a.y,b.y);
            return true;
        }
        else {
            return this.twoCorner(a,b);
        }
    }
    //左右直连 
    private leftAndRight(a:egret.Point,b:egret.Point):Boolean{
        if((a.x == b.x) && (a.y == b.y)) return false;//如果点击的是同一个图案，直接返回false;
        var y_start: number = a.y < b.y ? a.y : b.y;//获取a,b中较小的y值
        var y_end: number = a.y < b.y ? b.y : a.y; //获取a,b中较大的值
        for(var i: number = y_start + 1;i < y_end;i++) {
            if(this.mapData[a.x][i] != 0) {
                return false;
            }
        }
        return true;
    }
    //垂直直线

    private upAndDown(a: egret.Point,b: egret.Point):Boolean{

        if((a.x == b.x) && (a.y == b.y)) return false;  //如果点击的是同一个图案，直接返回false;
        var x_start: number = a.x < b.x ? a.x : b.x;        //获取a,b中较小的y值
        var x_end: number = a.x < b.x ? b.x : a.x;         //获取a,b中较大的值
        //遍历a,b之间是否通路，如果一个不是就返回false;
        for(var i: number = x_start + 1;i < x_end;i++) {
            if(this.mapData[i][a.y]!= 0) {
                return false;
            }
        }
        return true;
        
    }
    //一个拐角

    private oneCorner(a: egret.Point,b: egret.Point):Boolean{
        var c: egret.Point = new egret.Point(b.x,a.y);
        var d: egret.Point = new egret.Point(a.x,b.y);
        //判断C点是否有元素                
        if(this.mapData[c.x][c.y] == 0) {
            var path1: Boolean = this.leftAndRight(b,c) && this.upAndDown(a,c);
            if(path1){ 
                this.drawConnectLine(a,c,b,null);
                return path1;
            }
            
        }
        //判断D点是否有元素
        if(this.mapData[d.x][d.y] == 0) {
            var path2: Boolean = this.leftAndRight(a,d) && this.upAndDown(b,d);
            if(path2) {
                this.drawConnectLine(a,d,b,null);
            }
            return path2;
        } else {
            return false;
        }

    }

    //两个拐角
    private twoCorner(a:egret.Point,b:egret.Point):Boolean{
        var ll: Array<Line> = this.scan(a,b);
        var allMayLine: Array<Line> = [];
        var levArr: Array<number> = [];
        var bestIndex: number = 0;
        var tmpLine: Line;
        //console.log('检测二个拐点',ll);
        if(ll.length == 0) {
            return false;
        }
        //循环检测
        for(var i: number = 0;i < ll.length;i++) {
            tmpLine = ll[i];
            if(tmpLine.direct == 1) {//左右检测
                if(this.leftAndRight(a,tmpLine.a) && this.leftAndRight(b,tmpLine.b)) {
                    allMayLine.push(tmpLine);
                }
            } else if(tmpLine.direct == 0) {//上下检测
                if(this.upAndDown(a,tmpLine.a) && this.upAndDown(b,tmpLine.b)) {
                    allMayLine.push(tmpLine);
                }
            }
        }
        //在可行性路径中寻找最佳路径
        if(allMayLine.length > 0){ 
            for(var j: number = 0;j < allMayLine.length;j++){ 
                tmpLine = allMayLine[j];
                levArr.push(this.getLevel(a,tmpLine.a,tmpLine.b,b));
            }
           // console.log(levArr);
            for(var l: number = 0;l < levArr.length;l++){ 
                if(levArr[l] < levArr[bestIndex]){ 
                    bestIndex = l;
                }
            }
            console.log(levArr,bestIndex);
            tmpLine = <Line>allMayLine[bestIndex];
            this.drawConnectLine(a,tmpLine.a,tmpLine.b,b);
            return true;
        }
        return false;
    }
    //多条直线扫描
    private scan(a:egret.Point,b:egret.Point):Array<Line>{
        var linkList: Array<Line> = [];
        //纵向扫描 检测横线
        for(var i:number = 0;i < (this.ceilH+2);i++) {
            if(this.mapData[i][a.y] == 0 && this.mapData[i][b.y] == 0 && this.leftAndRight(new egret.Point(i,a.y),new egret.Point(i,b.y))) {
                linkList.push(new Line(new egret.Point(i,a.y),new egret.Point(i,b.y),0));
            }
        }
            
        //横向扫描  检测纵线
        for(var j:number = 0;j < (this.ceilW+2);j++) {
            if(this.mapData[a.x][j] == 0 && this.mapData[b.x][j] == 0 && this.upAndDown(new egret.Point(a.x,j),new egret.Point(b.x,j))) {
                linkList.push(new Line(new egret.Point(a.x,j),new egret.Point(b.x,j),1));
            }
        }
            return linkList;
        }
    //清空单元格 
    private clearBlockUI(): void { 
        var objL: BlockUI = Tools.getInstance().lastPattern;
        var objT: BlockUI = Tools.getInstance().thisPattern;
        this.mapData[objL.pos.x][objL.pos.y] = 0;
        this.mapData[objT.pos.x][objT.pos.y] = 0;
        this.dicObj[objL.pos.x + '_' + objL.pos.y] = null;
        this.dicObj[objT.pos.x + '_' + objT.pos.y] = null;
        this.removeChild(objL);
        this.removeChild(objT);
        Tools.getInstance().lastPattern = null;
        Tools.getInstance().thisPattern = null;
    }
    //绘制连接线
    private drawConnectLine(a1:egret.Point,a2:egret.Point,b1:egret.Point,b2:egret.Point): void {
        var cw: number = 100;
        this.connectLine.alpha = 1;
        this.connectLine.graphics.clear();
        this.connectLine.graphics.lineStyle(4,0x000000);
        if(b2 != null){ 
            this.connectLine.graphics.moveTo((b2.y - 1) * cw,(b2.x - 1) * cw);
            this.connectLine.graphics.lineTo((b1.y - 1) * cw,(b1.x - 1) * cw);
        }
        if(b1 != null){ 
            this.connectLine.graphics.moveTo((b1.y - 1) * cw,(b1.x - 1) * cw);
            this.connectLine.graphics.lineTo((a2.y - 1) * cw,(a2.x - 1) * cw);
        }
        this.connectLine.graphics.moveTo((a2.y - 1) * cw,(a2.x - 1) * cw);
        this.connectLine.graphics.lineTo((a1.y - 1) * cw,(a1.x - 1) * cw);
        
        var twee: egret.Tween = egret.Tween.get(this.connectLine);
            twee.to({ alpha: 0 },300);
            Tools.getInstance().objLen -= 2;
            if(Tools.getInstance().objLen == 0){ 
                Tools.getInstance().dispatchEvent(new ToolEvent(ToolEvent.GAME_OVER));
                PopPanel.getInstance().tip('游戏结束，即将跳入结果页!',this.stage);
            }
    }
    //打乱二维数组，重排
    private refreshMap(e:ToolEvent): void { 
        var objH: Object = {};
        var len: number = 0;
        var arr: Array<any> = [];
        for(var m in this.dicObj){ 
            arr.push(this.dicObj[m]);
        }
        arr = this.randomArr(arr);
        this.dicObj = {};
        //根据不是空的diction重新布局
        for(var i: number = 0;i < arr.length;i++){ 
            var p1 = Math.floor(i / this.ceilW);
            var p2 = Math.floor(i % this.ceilW);
            if(arr[i] != null) {  
                (<BlockUI>(arr[i])).x = p2 * 100;
                (<BlockUI>(arr[i])).y = p1 * 100;
                (<BlockUI>(arr[i])).pos.x = p1 + 1;
                (<BlockUI>(arr[i])).pos.y = p2 + 1;
                this.dicObj[(p1 + 1) + '_' + (p2 + 1)] = <BlockUI>(arr[i]);
                this.mapData[p1 + 1][p2 + 1] = 1;
            } else { 
                this.dicObj[(p1 + 1) + '_' + (p2+1)] = null;
                this.mapData[p1 + 1][p2 + 1] = 0;
            }
        }
        //console.log(arr.length,this.dicObj);
 
    }
    //只有在二个拐角下 才比较获取每条路径级别
    private getLevel(a1:egret.Point,a2:egret.Point,b1:egret.Point,b2:egret.Point):number{
        var lev1: number = (a1.x == a2.x) ? Math.abs(a1.y - a2.y) : Math.abs(a1.x - a2.x);
        var lev2: number = (a2.x == b1.x) ? Math.abs(a2.y - b1.y) : Math.abs(a2.x - b1.x);
        var lev3: number = (b2.x == b1.x) ? Math.abs(b2.y - b1.y) : Math.abs(b2.x - b1.x);
        return lev1 + lev2 + lev3;
    }
}
