import { _decorator, Component, UITransform } from 'cc';
import { DogMovement } from '../controller/DogMovement';
import { Bound } from '../tools/Bound';
const { ccclass, property } = _decorator;

@ccclass('MainComponent')
export class MainComponent extends Component {
    @property(UITransform)
    private transform: UITransform
    // STATE
    private _dogMovement: DogMovement = null
    private _bound: Bound = null
    private _dogTransform: UITransform = null

    // INIT
    protected onLoad(): void {
        const { node } = this

        this._dogMovement = new DogMovement(node)
        this._dogTransform = this._dogMovement.dogComponent.transform
        this._bound = new Bound(this.transform)
    }  

    protected update(dt: number): void {
        this._dogMovement.move()
        this._bound.positionTracking(this._dogTransform)
    }
   
    // CLEAR
    protected onDestroy(): void {
        this._dogMovement.clear()
    }
}