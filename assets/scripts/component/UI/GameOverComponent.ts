import { _decorator, Component, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverComponent')
export class GameOverComponent extends Component {
    @property(Animation)
    readonly gameOverAnimation: Animation

    @property(Animation)
    readonly tapAnimation: Animation
}