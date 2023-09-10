import { _decorator, Node } from 'cc';
import { GameOverComponent } from '../../component/UI/GameOverComponent';
import { GlobalEvent } from '../../event/GlobalEvent';
const { ccclass } = _decorator;

@ccclass('GameOver')
export class GameOver {
    // STATE
    private _gameOverComponent: GameOverComponent

    // INIT
    public constructor(canvas: Node){
        this._gameOverComponent = canvas.getComponentInChildren(GameOverComponent)
        this._gameOverComponent.node.active = false

    }

    // INTERFACE
    public showGameOver(){
        this._gameOverComponent.node.active = true

        this._gameOverComponent.tapAnimation.play()
        this._gameOverComponent.gameOverAnimation.play()
    }

    public hideStartGame(){        
        this._gameOverComponent.tapAnimation.stop()
        this._gameOverComponent.gameOverAnimation.stop()

        this._gameOverComponent.node.active = false
    }

    // CLEAR
    public clear(){
        this._gameOverComponent = null
    }    
}