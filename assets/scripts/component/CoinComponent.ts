import { _decorator, Component, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinComponent')
export class CoinComponent extends Component {
   @property(UITransform)
   readonly transform: UITransform

   public speed: number
}