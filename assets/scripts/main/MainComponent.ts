import { _decorator, Component, Prefab, UITransform } from 'cc';
import { DogMovement } from '../controller/DogMovement';
import { Bound } from '../tools/Bound';
import { CoinComponent } from '../component/CoinComponent';
import { CoinController } from '../controller/CoinController';
const { ccclass, property } = _decorator;

@ccclass('MainComponent')
export class MainComponent extends Component {
    @property(UITransform)
    private transform: UITransform
    
    @property(Prefab)
    private coinPrefab: Prefab

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
    private _halfHeight: number

    // INIT
    protected onLoad(): void {
        const { node } = this

        this._dogMovement = new DogMovement(node)
        this._dogTransform = this._dogMovement.dogComponent.transform
        this._coinController = new CoinController(this.timeForSpawn, this.minSpeed, this.maxSpeed, this.coinPrefab, this.transform)
        
        this._bound = new Bound(this.transform)

        this._halfHeight = this.transform.height / 2
    }  

    protected update(dt: number): void {
        this._coinController.initCoin(dt)
        this._coinController.moveCoins(this._halfHeight, this._bound, this._dogTransform)

        this._dogMovement.move()
        this._bound.positionTracking(this._dogTransform)        
    }
   
    // CLEAR
    protected onDestroy(): void {
        this._dogMovement.clear()
        this._bound = null
        this._dogTransform= null
        this._coinController.clear()
    }
}