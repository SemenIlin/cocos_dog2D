import { _decorator, Node, UITransform, Vec3 } from 'cc';
const { ccclass} = _decorator;

@ccclass('Bound')
export class Bound {
    // STATE
    private _halfWidth: number = 0

    public constructor(border: UITransform){
        this._halfWidth = border.width / 2
    }

    public positionTracking(player: UITransform){
        const rightPoint = player.node.position.x + player.width / 2 
        if (rightPoint >= this._halfWidth ) {
            const {y, z} = player.node.position
            player.node.position =  new Vec3(this._halfWidth - player.width / 2, y, z)

            return
        }
        
        const leftPoint = player.node.position.x - player.width / 2
        if (leftPoint <= -this._halfWidth) {
            const {y, z} = player.node.position
            player.node.position =  new Vec3(player.width / 2 - this._halfWidth , y, z)

            return
        }
    }
}