/**自定义事件类
 *
 * @author 
 *
 */
class ToolEvent extends egret.Event{

    //游戏开始
    public static GAME_START: string = 'gamestart';
    //游戏结束
    public static GAME_OVER: string = 'gameover';
    //游戏图案点击
    public static GAME_TAB_PATTERN: string = 'gametabpattern';
    //游戏刷新布局
    public static GAME_REFRESH: string = 'gamerefresh';
    
    public data: any;
	public constructor(e) {
        super(e);
	}
}
