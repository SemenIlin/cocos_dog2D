import { _decorator, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { CoinComponent } from '../component/CoinComponent';
import { Bound } from '../tools/Bound';
import { GlobalEvent } from '../event/GlobalEvent';
const { ccclass } = _decorator;

const DELTA_HEIGHT = 120

@ccclass('CoinController')
export class CoinController {
    // STATE
    private _timeForSpawn: number
    private _minSpeed: number
    private _maxSpeed: number

    private _coinPrefab: Prefab
    private _coinContainerTransform: UITransform

    private _coinList: { [key: string]: CoinComponent } = {}
    private _currentTime: number = 0
    private _halfHeight: number
    
    // INIT
    public constructor (
        timeForSpawn: number, 
        minSpeed: number, 
        maxSpeed: number, 
        coinPrefab: Prefab,
        coinContainerTransform: UITransform){
        this._timeForSpawn = timeForSpawn
        this._minSpeed = minSpeed
        this._maxSpeed = maxSpeed
        this._coinPrefab = coinPrefab
        this._coinContainerTransform = coinContainerTransform

        this._halfHeight = coinContainerTransform.height / 2
    }

    // INTERFACE
    public moveCoins(halfHeight: number, bound: Bound, dogTransform: UITransform){
        for (const key in this._coinList){
            const coin = this._coinList[key]

            let temperaryPosition: Vec3 = coin.node.position
            temperaryPosition.y -= coin.speed
            coin.node.position = temperaryPosition

            if (coin.node.position.y <= -halfHeight - DELTA_HEIGHT){
                this.deleteCoin(coin.node)

                GlobalEvent.emit('CHANGE_SCORE', Math.floor(-coin.speed))
            }

            if(bound.isCheckTouch(dogTransform,coin.transform)){
                this.deleteCoin(coin.node)

                GlobalEvent.emit('CHANGE_SCORE', Math.floor(coin.speed))
            }
        }
    }

    public initCoin(dt: number){
        this._currentTime += dt

        if (this._currentTime >= this._timeForSpawn){
            this.createCoin()
            console.warn("CREATE")
            this._currentTime = 0
        }
    }

    public deleteCoin(coin: Node){
        coin.removeFromParent()

        delete this._coinList[coin.uuid]
        
        coin.destroy()
    }

    // PRIVATE
    private createCoin(){
        const coin = instantiate(this._coinPrefab)
        const coinComponent = coin.getComponent(CoinComponent)

        coinComponent.speed = this.coinSpeed
        this._coinList[coin.uuid] = coinComponent

        this._coinContainerTransform.node.addChild(coin)
        const newPosition = new Vec3(
            this._coinContainerTransform.width * (Math.random() - 0.5), 
            this._halfHeight + DELTA_HEIGHT, 0)
        coin.position = newPosition        
    }

    private get coinSpeed(): number {
        const delta = (this._maxSpeed - this._minSpeed) * Math.random() 

        return this._minSpeed + delta
    }

    // CLEAR
    public clear(){
        this._coinList = {}
        this._currentTime = 0
    }
}