import { _decorator, Component } from 'cc';
import { DogMovement } from '../controller/DogMovement';
const { ccclass } = _decorator;

@ccclass('MainComponent')
export class MainComponent extends Component {
    // STATE
    private _dogMovement: DogMovement = null

    // INIT
    protected onLoad(): void {
        const { node } = this
        this._dogMovement = new DogMovement(node)
    }  

    protected update(dt: number): void {
        this._dogMovement.move()
    }
   
    // CLEAR
    protected onDestroy(): void {
        this._dogMovement.clear()
    }
}