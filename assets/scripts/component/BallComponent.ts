import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BallComponent')
export class BallComponent extends Component {   
    @property(UITransform)
    readonly transform: UITransform 
}