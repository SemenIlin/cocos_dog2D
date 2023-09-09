import { _decorator,  EventTouch,  Node, Vec3 } from 'cc';
import { ControlComponent } from '../component/ControlComponent';
import { PlayerData } from '../data/PlayerData';
const { ccclass } = _decorator;

@ccclass('PlayerTouchControl')
export class PlayerTouchControl {
    // STATE
    private _controlComponent: ControlComponent

    private _selectedRight: Vec3 = new Vec3(-1.1, 1.1, 1)
    private _defaultRight: Vec3 = new Vec3(-1, 1, 1)
    private _selectedLeft: Vec3 = new Vec3(1.1, 1.1, 1)

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

    // INTERFACE
    public onPlay(){
        this._controlComponent.left.on(Node.EventType.TOUCH_START, this.onTouchDownLeft , this)
        this._controlComponent.left.on(Node.EventType.TOUCH_END, this.onTouchUpLeft , this)
        this._controlComponent.left.on(Node.EventType.TOUCH_CANCEL, this.onTouchUpLeft , this)

        this._controlComponent.right.on(Node.EventType.TOUCH_START, this.onTouchDownRight , this)
        this._controlComponent.right.on(Node.EventType.TOUCH_END, this.onTouchUpRight , this)
        this._controlComponent.right.on(Node.EventType.TOUCH_CANCEL, this.onTouchUpRight , this)
    }

    public onPause(){
        this._controlComponent.left.off(Node.EventType.TOUCH_START, this.onTouchDownLeft , this)
        this._controlComponent.left.off(Node.EventType.TOUCH_END, this.onTouchUpLeft , this)
        this._controlComponent.left.off(Node.EventType.TOUCH_CANCEL, this.onTouchUpLeft , this)

        this._controlComponent.right.off(Node.EventType.TOUCH_START, this.onTouchDownRight , this)
        this._controlComponent.right.off(Node.EventType.TOUCH_END, this.onTouchUpRight , this)
        this._controlComponent.right.off(Node.EventType.TOUCH_CANCEL, this.onTouchUpRight , this)
    }

    // PRIVATE
    private onTouchDownLeft(event: EventTouch){
        this._controlComponent.left.scale = this._selectedLeft
        console.warn("DOWN -1")
        PlayerData.setDirection(-1)       
    }

    private onTouchUpLeft (event: EventTouch){
        this._controlComponent.left.scale = Vec3.ONE
        console.warn("UP -1")
        PlayerData.deleteDirection(-1)           
    }

    private onTouchDownRight(event: EventTouch){
        this._controlComponent.right.scale = this._selectedRight
        console.warn("DOWN 1")
        PlayerData.setDirection(1)       
    }

    private onTouchUpRight (event: EventTouch){
        this._controlComponent.right.scale = this._defaultRight
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