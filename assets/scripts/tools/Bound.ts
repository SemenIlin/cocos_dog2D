import { _decorator, Node, UITransform, Vec3 } from 'cc';
const { ccclass} = _decorator;

@ccclass('Bound')
export class Bound {
    // STATE
    private _halfWidth: number = 0
    
    // INIT
    public constructor(border: UITransform){
        this._halfWidth = border.width / 2
    }

    // INTERFACE
    public positionTracking(player: UITransform){
        const rightPoint = player.node.position.x + player.width / 2 
        if (rightPoint >= this._halfWidth ) {
            const { y, z } = player.node.position
            player.node.position =  new Vec3(this._halfWidth - player.width / 2, y, z)

            return
        }
        
        const leftPoint = player.node.position.x - player.width / 2
        if (leftPoint <= -this._halfWidth) {
            const { y, z } = player.node.position
            player.node.position =  new Vec3(player.width / 2 - this._halfWidth , y, z)

            return
        }
    }

    public isCheckTouch(playerTransform: UITransform, objTransform: UITransform):boolean {
        const { width, height } = playerTransform
        const { width: objWidth, height: obgHeight } = objTransform

        const halfWidth = width / 2
        const halfHeight = height / 2

        const halfObjWidth = objWidth / 2
        const halfObjHeight = obgHeight / 2
        
        const leftPoint = playerTransform.node.position.x - halfWidth
        const rightPoint = playerTransform.node.position.x + halfWidth
        const topPoint = playerTransform.node.position.y + halfHeight  
        const bottomPoint = playerTransform.node.position.y - halfHeight 

        const obgLeftPoint = objTransform.node.position.x - halfObjWidth
        const obgRightPoint = objTransform.node.position.x + halfObjWidth
        const objTopPoint = objTransform.node.position.y + halfObjHeight   
        const objBottomPoint = objTransform.node.position.y - halfObjHeight 

        if (obgRightPoint >= leftPoint && obgRightPoint <= rightPoint &&
            objBottomPoint >= bottomPoint && objBottomPoint <= topPoint ||
            obgLeftPoint >= leftPoint && obgLeftPoint <= rightPoint &&
            objTopPoint <= topPoint && objTopPoint >= bottomPoint ){
                return true
        }        
        
        return false
    }
}