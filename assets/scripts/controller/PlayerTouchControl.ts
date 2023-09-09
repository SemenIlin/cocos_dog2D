import { _decorator,  EventTouch,  Node } from 'cc';
import { ControlComponent } from '../component/ControlComponent';
import { PlayerData } from '../data/PlayerData';
const { ccclass } = _decorator;

@ccclass('PlayerTouchControl')
export class PlayerTouchControl {
    // STATE
    private _controlComponent: ControlComponent

    // INIT
    public constructor(canvas: Node){
        this._controlComponent = canvas.getComponentInChildren(ControlComponent)

        this._controlComponent.left.on(Node.EventType.TOUCH_START, this.onTouchDownLeft , this)
        this._controlComponent.left.on(Node.EventType.TOUCH_END, this.onTouchUpLeft , this)
        this._controlComponent.left.on(Node.EventType.TOUCH_CANCEL, this.onTouchUpLeft , this)

        this._controlComponent.right.on(Node.EventType.TOUCH_START, this.onTouchDownRight , this)
        this._controlComponent.right.on(Node.EventType.TOUCH_END, this.onTouchUpRight , this)
        this._controlComponent.right.on(Node.EventType.TOUCH_CANCEL, this.onTouchUpRight , this)
    }

    // PRIVATE
    private onTouchDownLeft(event: EventTouch){
        console.warn("DOWN -1")
        PlayerData.setDirection(-1)       
    }

    private onTouchUpLeft (event: EventTouch){
        console.warn("UP -1")
        PlayerData.deleteDirection(-1)           
    }

    private onTouchDownRight(event: EventTouch){
        console.warn("DOWN 1")
        PlayerData.setDirection(1)       
    }

    private onTouchUpRight (event: EventTouch){
        console.warn("UP 1")
        PlayerData.deleteDirection(1)           
    }

    // CLEAR
    public clear(){
        this._controlComponent.left.off(Node.EventType.TOUCH_START, this.onTouchDownLeft , this)
        this._controlComponent.left.off(Node.EventType.TOUCH_END, this.onTouchUpLeft , this)
        this._controlComponent.left.off(Node.EventType.TOUCH_CANCEL, this.onTouchUpLeft , this)

        this._controlComponent.right.off(Node.EventType.TOUCH_START, this.onTouchDownRight , this)
        this._controlComponent.right.off(Node.EventType.TOUCH_END, this.onTouchUpRight , this)
        this._controlComponent.right.off(Node.EventType.TOUCH_CANCEL, this.onTouchUpRight , this)
    }
}