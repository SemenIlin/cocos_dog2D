import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

export interface PausePlayView {
    changeView():void
}

@ccclass('PausePlayComponent')
export class PausePlayComponent extends Component {
   @property(Sprite)
   readonly spriteButton: Sprite

   @property(SpriteFrame)
   readonly playFrame: SpriteFrame

   @property(SpriteFrame)
   readonly pauseFrame: SpriteFrame

   // STATE
   private _view: PausePlayView

   // INIT
   public init(view: PausePlayView){
    this._view = view
   }

   // EDITOR
   private onClick(){
    console.warn("COMPONENT")
    this._view.changeView()   
   }
}