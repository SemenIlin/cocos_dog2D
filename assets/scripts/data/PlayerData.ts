import { _decorator, Node } from 'cc';
import { GlobalEvent } from '../event/GlobalEvent';
const { ccclass } = _decorator;

@ccclass('PlayerData')
export abstract class PlayerData {
    // PRIVATE
    private static _directionList: { [ key:number ] : number } = {}

    // GETTER
    public static get directionList(): Readonly<{ [ key:number ] : number }>{
        return this._directionList
    }

     // INTERFACE
    public static setDirection(direction: number): void {
        this._directionList[direction] = direction

        GlobalEvent.emit("DIRECTION_CHANGED")
    }

    public static clearDirection(){
        this._directionList = {}
    }
    
    public static getDirection(): number{
        let result = 0

        for (let key in this._directionList){
            result += this._directionList[key]
        }

        return result
    }

    public static deleteDirection(value: number){
        const direction = this._directionList[value]

        if (!direction) return

        delete this._directionList[value]

        GlobalEvent.emit("DIRECTION_CHANGED")
    }
}