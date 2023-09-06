import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreComponent')
export class ScoreComponent extends Component {
   @property(Label)
   readonly scoreLabel: Label
}