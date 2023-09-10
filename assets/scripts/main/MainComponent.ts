import { _decorator, Component, Game, Prefab, UITransform } from 'cc';
import { DogMovement } from '../controller/DogMovement';
import { Bound } from '../tools/Bound';
import { CoinComponent } from '../component/CoinComponent';
import { CoinController } from '../controller/CoinController'
import { ScoreController } from '../controller/UI/ScoreController';
import { UIController } from '../controller/UI/UIController';
import { PlayerTouchControl } from '../controller/PlayerTouchControl';
import { GlobalEvent } from '../event/GlobalEvent';
import { GameOver } from '../controller/UI/GameOver';
import { PlayerData } from '../data/PlayerData';
const { ccclass, property } = _decorator;

@ccclass('MainComponent')
export class MainComponent extends Component {
    @property(UITransform)
    private transform: UITransform
    
    @property(Prefab)
    private coinPrefab: Prefab

    @property(UITransform)
    private coinContainer: UITransform

    @property
    private timeForSpawn: number = 2

    @property
    private minSpeed: number = 5

    @property
    private maxSpeed: number = 11

    // STATE
    private _dogMovement: DogMovement = null
    private _bound: Bound = null
    private _dogTransform: UITransform = null
    private _coinController: CoinController = null
    private _scoreController: ScoreController = null
    private _UIController: UIController = null
    private _touchControll: PlayerTouchControl = null
    private _gameOver: GameOver = null

    private _halfHeight: number

    // INIT
    protected onLoad(): void {
        const { node } = this

        this._dogMovement = new DogMovement(node)
        this._dogTransform = this._dogMovement.dogComponent.transform
        this._coinController = new CoinController(this.timeForSpawn, this.minSpeed, this.maxSpeed, this.coinPrefab, this.coinContainer)
        this._scoreController = new ScoreController(node)
        this._UIController = new UIController(node)
        this._touchControll = new PlayerTouchControl(node)
        this._gameOver = new GameOver(node)

        this._bound = new Bound(this.transform)

        this._halfHeight = this.transform.height / 2

        GlobalEvent.on("PAUSE", this.onPause, this)
        GlobalEvent.on("PLAY", this.onPlay, this)
        
        GlobalEvent.on("GAME_OVER", this.onGameOver, this)
        GlobalEvent.on("START_GAME", this.onStartGame, this)
    }  

    protected update(dt: number): void {
        if (this._UIController.isPause) return

        this._coinController.initCoin(dt)
        this._coinController.moveCoins(this._halfHeight, this._bound, this._dogTransform)

        this._dogMovement.move()
        this._bound.positionTracking(this._dogTransform)        
    }

    // PRIVATE
    private onPause(){
        this._dogMovement.onPause()
        this._touchControll.onPause()
    }

    private onPlay(){
        this._dogMovement.onPlay()
        this._touchControll.onPlay()
    }

    private onGameOver(){
        this._gameOver.showGameOver()
    }

    private onStartGame(){        
        PlayerData.resetScore()

        this._gameOver.hideStartGame()
        this._coinController.deleteAllCoins()
        this._dogMovement.resetPosition()
        this.onPlay()
    }
   
    // CLEAR
    protected onDestroy(): void {
        GlobalEvent.off("PAUSE", this.onPause, this)
        GlobalEvent.off("PLAY", this.onPlay, this)

        GlobalEvent.off("GAME_OVER", this.onGameOver, this)
        GlobalEvent.off("START_GAME", this.onStartGame, this)

        this._dogMovement.clear()
        this._coinController.clear()
        this._scoreController.clear()
        this._UIController.clear()
        this._touchControll.clear()
        this._gameOver.clear()

        this._bound = null
        this._dogTransform= null
    }
}