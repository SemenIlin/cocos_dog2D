import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ControlComponent')
export class ControlComponent extends Component {
    @property(Node)
    readonly left: Node

    @property(Node)
    readonly right: Node
}