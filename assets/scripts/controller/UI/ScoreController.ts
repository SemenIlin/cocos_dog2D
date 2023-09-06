import { _decorator, Node } from 'cc';
import { ScoreComponent } from '../../component/UI/ScoreComponent';
import { GlobalEvent } from '../../event/GlobalEvent';
const { ccclass } = _decorator;

@ccclass('ScoreController')
export class ScoreController  {
    // STATE
    private _scoreComponent: ScoreComponent
    private _score: number

    // INIT
    public constructor(canvas: Node){
        this._scoreComponent = canvas.getComponentInChildren(ScoreComponent)
        this._score = 0

        GlobalEvent.on('CHANGE_SCORE', this.changeScore, this)
    }

    // PRIVATE
    private changeScore(value: number){
        this._score += value
        this._scoreComponent.scoreLabel.string = this._score + ''
    }

    // CLEAR
    public clear(){
        GlobalEvent.off('CHANGE_SCORE', this.changeScore, this)
        this._scoreComponent = null
    }
}