import { _decorator, Node } from 'cc';
import { ScoreComponent } from '../../component/UI/ScoreComponent';
import { GlobalEvent } from '../../event/GlobalEvent';
import { PlayerData } from '../../data/PlayerData';
const { ccclass } = _decorator;

@ccclass('ScoreController')
export class ScoreController  {
    // STATE
    private _scoreComponent: ScoreComponent

    // INIT
    public constructor(canvas: Node){
        this._scoreComponent = canvas.getComponentInChildren(ScoreComponent)        

        GlobalEvent.on('CHANGE_SCORE', this.changeScore, this)
    }

    // PRIVATE
    private changeScore(){
        this._scoreComponent.scoreLabel.string = PlayerData.score + ''
    }

    // CLEAR
    public clear(){
        GlobalEvent.off('CHANGE_SCORE', this.changeScore, this)
        this._scoreComponent = null
    }
}