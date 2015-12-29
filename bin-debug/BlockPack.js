/**
 *管理格子类
 * @author
 *
 */
var BlockPack = (function (_super) {
    __extends(BlockPack, _super);
    function BlockPack() {
        _super.call(this);
        //连连看格子数
        this.ceilW = 4;
        this.ceilH = 6;
        //图片类型数
        this.typeN = 8;
        //图案列表
        this.dataArr = [];
        //0,1表示的格子是否为空
        this.mapData = [];
        //private flashLight: FlashLight;
        this.dicObj = {};
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    var d = __define,c=BlockPack;p=c.prototype;
    p.init = function (e) {
        Tools.getInstance().addEventListener(ToolEvent.GAME_REFRESH, this.refreshMap, this);
        this.connectLine = new egret.Sprite;
        //this.flashLight = new FlashLight;
        this.addChild(this.connectLine);
        //图案分布
        for (var j = 0; j < this.ceilW * this.ceilH / 2; j++) {
            var ran = Math.floor(Math.random() * this.typeN);
            this.dataArr.push(ran);
            this.dataArr.push(ran);
        }
        this.dataArr = this.randomArr(this.dataArr);
        //初始化0,1表示的格子 宽高都增加2个格子
        for (var h = 0; h < (this.ceilH + 2); h++) {
            this.mapData[h] = [];
            for (var l = 0; l < (this.ceilW + 2); l++) {
                this.mapData[h].push(0);
            }
        }
        //
        for (h = 1; h < (this.ceilH + 1); h++) {
            for (l = 1; l < (this.ceilW + 1); l++) {
                this.mapData[h][l] = 1;
                var obj = new BlockUI(this.dataArr[this.ceilW * (h - 1) + (l - 1)]);
                obj.data = h + '_' + l;
                obj.pos.x = h;
                obj.pos.y = l;
                obj.x = (l - 1) * 100;
                obj.y = (h - 1) * 100;
                obj.setAddChild(this);
                this.dicObj[h + '_' + l] = obj;
            }
        }
        // this.addChild(this.flashLight);
        Tools.getInstance().addEventListener(ToolEvent.GAME_TAB_PATTERN, this.handleCore, this);
    };
    //打乱字母排序
    p.randomArr = function (arr) {
        var outputArr = arr;
        var i = outputArr.length;
        while (i > -1) {
            outputArr.push(outputArr.splice(Math.floor(Math.random() * i), 1)[0]);
            i--;
        }
        return outputArr;
    };
    //处理中心
    p.handleCore = function () {
        var objL = Tools.getInstance().lastPattern;
        var objT = Tools.getInstance().thisPattern;
        if (!objL) {
            return;
        }
        if ((objT.type != objL.type)) {
            objL.removeChild(objL.strokeSP);
            objL = null;
            return;
        }
        if (this.checkLink(objL.pos, objT.pos)) {
            this.clearBlockUI();
        }
        else {
            objL.removeChild(objL.strokeSP);
            objL = null;
        }
    };
    //总检测函数
    p.checkLink = function (a, b) {
        if (a.x == b.x && this.leftAndRight(a, b)) {
            this.drawConnectLine(a, b, null, null);
            // console.log('左右直连:',a.x,b.x,a.y,b.y);
            return true;
        }
        if (a.y == b.y && this.upAndDown(a, b)) {
            this.drawConnectLine(a, b, null, null);
            // console.log('上下直连:',a.x,a.y,b.x,b.y);
            return true;
        }
        if (this.oneCorner(a, b)) {
            //console.log('一个拐角:',a.x,b.x,a.y,b.y);
            return true;
        }
        else {
            return this.twoCorner(a, b);
        }
    };
    //左右直连 
    p.leftAndRight = function (a, b) {
        if ((a.x == b.x) && (a.y == b.y))
            return false; //如果点击的是同一个图案，直接返回false;
        var y_start = a.y < b.y ? a.y : b.y; //获取a,b中较小的y值
        var y_end = a.y < b.y ? b.y : a.y; //获取a,b中较大的值
        for (var i = y_start + 1; i < y_end; i++) {
            if (this.mapData[a.x][i] != 0) {
                return false;
            }
        }
        return true;
    };
    //垂直直线
    p.upAndDown = function (a, b) {
        if ((a.x == b.x) && (a.y == b.y))
            return false; //如果点击的是同一个图案，直接返回false;
        var x_start = a.x < b.x ? a.x : b.x; //获取a,b中较小的y值
        var x_end = a.x < b.x ? b.x : a.x; //获取a,b中较大的值
        //遍历a,b之间是否通路，如果一个不是就返回false;
        for (var i = x_start + 1; i < x_end; i++) {
            if (this.mapData[i][a.y] != 0) {
                return false;
            }
        }
        return true;
    };
    //一个拐角
    p.oneCorner = function (a, b) {
        var c = new egret.Point(b.x, a.y);
        var d = new egret.Point(a.x, b.y);
        //判断C点是否有元素                
        if (this.mapData[c.x][c.y] == 0) {
            var path1 = this.leftAndRight(b, c) && this.upAndDown(a, c);
            if (path1) {
                this.drawConnectLine(a, c, b, null);
                return path1;
            }
        }
        //判断D点是否有元素
        if (this.mapData[d.x][d.y] == 0) {
            var path2 = this.leftAndRight(a, d) && this.upAndDown(b, d);
            if (path2) {
                this.drawConnectLine(a, d, b, null);
            }
            return path2;
        }
        else {
            return false;
        }
    };
    //两个拐角
    p.twoCorner = function (a, b) {
        var ll = this.scan(a, b);
        var allMayLine = [];
        var levArr = [];
        var bestIndex = 0;
        var tmpLine;
        //console.log('检测二个拐点',ll);
        if (ll.length == 0) {
            return false;
        }
        //循环检测
        for (var i = 0; i < ll.length; i++) {
            tmpLine = ll[i];
            if (tmpLine.direct == 1) {
                if (this.leftAndRight(a, tmpLine.a) && this.leftAndRight(b, tmpLine.b)) {
                    allMayLine.push(tmpLine);
                }
            }
            else if (tmpLine.direct == 0) {
                if (this.upAndDown(a, tmpLine.a) && this.upAndDown(b, tmpLine.b)) {
                    allMayLine.push(tmpLine);
                }
            }
        }
        //在可行性路径中寻找最佳路径
        if (allMayLine.length > 0) {
            for (var j = 0; j < allMayLine.length; j++) {
                tmpLine = allMayLine[j];
                levArr.push(this.getLevel(a, tmpLine.a, tmpLine.b, b));
            }
            // console.log(levArr);
            for (var l = 0; l < levArr.length; l++) {
                if (levArr[l] < levArr[bestIndex]) {
                    bestIndex = l;
                }
            }
            console.log(levArr, bestIndex);
            tmpLine = allMayLine[bestIndex];
            this.drawConnectLine(a, tmpLine.a, tmpLine.b, b);
            return true;
        }
        return false;
    };
    //多条直线扫描
    p.scan = function (a, b) {
        var linkList = [];
        //纵向扫描 检测横线
        for (var i = 0; i < (this.ceilH + 2); i++) {
            if (this.mapData[i][a.y] == 0 && this.mapData[i][b.y] == 0 && this.leftAndRight(new egret.Point(i, a.y), new egret.Point(i, b.y))) {
                linkList.push(new Line(new egret.Point(i, a.y), new egret.Point(i, b.y), 0));
            }
        }
        //横向扫描  检测纵线
        for (var j = 0; j < (this.ceilW + 2); j++) {
            if (this.mapData[a.x][j] == 0 && this.mapData[b.x][j] == 0 && this.upAndDown(new egret.Point(a.x, j), new egret.Point(b.x, j))) {
                linkList.push(new Line(new egret.Point(a.x, j), new egret.Point(b.x, j), 1));
            }
        }
        return linkList;
    };
    //清空单元格 
    p.clearBlockUI = function () {
        var objL = Tools.getInstance().lastPattern;
        var objT = Tools.getInstance().thisPattern;
        this.mapData[objL.pos.x][objL.pos.y] = 0;
        this.mapData[objT.pos.x][objT.pos.y] = 0;
        this.dicObj[objL.pos.x + '_' + objL.pos.y] = null;
        this.dicObj[objT.pos.x + '_' + objT.pos.y] = null;
        this.removeChild(objL);
        this.removeChild(objT);
        Tools.getInstance().lastPattern = null;
        Tools.getInstance().thisPattern = null;
    };
    //绘制连接线
    p.drawConnectLine = function (a1, a2, b1, b2) {
        var cw = 100;
        this.connectLine.alpha = 1;
        this.connectLine.graphics.clear();
        this.connectLine.graphics.lineStyle(4, 0x000000);
        if (b2 != null) {
            this.connectLine.graphics.moveTo((b2.y - 1) * cw, (b2.x - 1) * cw);
            this.connectLine.graphics.lineTo((b1.y - 1) * cw, (b1.x - 1) * cw);
        }
        if (b1 != null) {
            this.connectLine.graphics.moveTo((b1.y - 1) * cw, (b1.x - 1) * cw);
            this.connectLine.graphics.lineTo((a2.y - 1) * cw, (a2.x - 1) * cw);
        }
        this.connectLine.graphics.moveTo((a2.y - 1) * cw, (a2.x - 1) * cw);
        this.connectLine.graphics.lineTo((a1.y - 1) * cw, (a1.x - 1) * cw);
        var twee = egret.Tween.get(this.connectLine);
        twee.to({ alpha: 0 }, 300);
        Tools.getInstance().objLen -= 2;
        if (Tools.getInstance().objLen == 0) {
            Tools.getInstance().dispatchEvent(new ToolEvent(ToolEvent.GAME_OVER));
            PopPanel.getInstance().tip('游戏结束，即将跳入结果页!', this.stage);
        }
    };
    //打乱二维数组，重排
    p.refreshMap = function (e) {
        var objH = {};
        var len = 0;
        var arr = [];
        for (var m in this.dicObj) {
            arr.push(this.dicObj[m]);
        }
        arr = this.randomArr(arr);
        this.dicObj = {};
        //根据不是空的diction重新布局
        for (var i = 0; i < arr.length; i++) {
            var p1 = Math.floor(i / this.ceilW);
            var p2 = Math.floor(i % this.ceilW);
            if (arr[i] != null) {
                (arr[i]).x = p2 * 100;
                (arr[i]).y = p1 * 100;
                (arr[i]).pos.x = p1 + 1;
                (arr[i]).pos.y = p2 + 1;
                this.dicObj[(p1 + 1) + '_' + (p2 + 1)] = (arr[i]);
                this.mapData[p1 + 1][p2 + 1] = 1;
            }
            else {
                this.dicObj[(p1 + 1) + '_' + (p2 + 1)] = null;
                this.mapData[p1 + 1][p2 + 1] = 0;
            }
        }
        //console.log(arr.length,this.dicObj);
    };
    //只有在二个拐角下 才比较获取每条路径级别
    p.getLevel = function (a1, a2, b1, b2) {
        var lev1 = (a1.x == a2.x) ? Math.abs(a1.y - a2.y) : Math.abs(a1.x - a2.x);
        var lev2 = (a2.x == b1.x) ? Math.abs(a2.y - b1.y) : Math.abs(a2.x - b1.x);
        var lev3 = (b2.x == b1.x) ? Math.abs(b2.y - b1.y) : Math.abs(b2.x - b1.x);
        return lev1 + lev2 + lev3;
    };
    return BlockPack;
})(egret.Sprite);
egret.registerClass(BlockPack,"BlockPack");
