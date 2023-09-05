import { _decorator, Component, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DogComponent')
export class DogComponent extends Component {
    @property(Animation)
    readonly dogAnimation: Animation
}