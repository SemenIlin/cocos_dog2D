import { _decorator, Node } from 'cc';
import { PausePlayComponent, PausePlayView } from '../../component/UI/PausePlayComponent';
import { GlobalEvent } from '../../event/GlobalEvent';
const { ccclass } = _decorator;

@ccclass('UIController')
export class UIController implements PausePlayView {
    // PRIVATE
    private _pausePlayButtonComponent: PausePlayComponent
    private _isPause: boolean

    // GETTER
    public get isPause(): boolean {
        return this._isPause
    }

    // INIT
    public constructor(canvas: Node){
        this._pausePlayButtonComponent = canvas.getComponentInChildren(PausePlayComponent)
        this._pausePlayButtonComponent.init(this)

        this._isPause = false
    }

    // INTERFACE
    public changeView(){
        console.warn("CONTROLLER")
        this._isPause = ! this._isPause

        const { playFrame, pauseFrame } = this._pausePlayButtonComponent

        if (this._isPause){
            this._pausePlayButtonComponent.spriteButton.spriteFrame = playFrame
            GlobalEvent.emit("PAUSE")
        } else{
            this._pausePlayButtonComponent.spriteButton.spriteFrame = pauseFrame
            GlobalEvent.emit("PLAY")
        }       
    }

    // CLEAR
    public clear(){
        this._pausePlayButtonComponent = null
        this._isPause = false
    }

}