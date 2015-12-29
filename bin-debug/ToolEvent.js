/**自定义事件类
 *
 * @author
 *
 */
var ToolEvent = (function (_super) {
    __extends(ToolEvent, _super);
    function ToolEvent(e) {
        _super.call(this, e);
    }
    var d = __define,c=ToolEvent;p=c.prototype;
    //游戏开始
    ToolEvent.GAME_START = 'gamestart';
    //游戏结束
    ToolEvent.GAME_OVER = 'gameover';
    //游戏图案点击
    ToolEvent.GAME_TAB_PATTERN = 'gametabpattern';
    //游戏刷新布局
    ToolEvent.GAME_REFRESH = 'gamerefresh';
    return ToolEvent;
})(egret.Event);
egret.registerClass(ToolEvent,"ToolEvent");
