import { _decorator } from 'cc';
import { GlobalEvent } from '../event/GlobalEvent';
const { ccclass } = _decorator;

const SCORE_FOR_CHANGE_SPEED = 50

@ccclass('PlayerData')
export abstract class PlayerData {
    // PRIVATE
    private static _directionList: { [ key:number ] : number } = {}
    private static _score: number = 0
    private static _scoreForSpeed = 0
    private static _canGamePlay = true

    // GETTER
    public static get directionList(): Readonly<{ [ key:number ] : number }>{
        return this._directionList
    }

    public static get score(): Readonly<number>{
        return this._score
    }

    public static get canGamePlay(): Readonly<boolean>{
        return this._canGamePlay
    }

    // INTERFACE
    public static resetScore(){
        this._score = 0
        this._scoreForSpeed = 0

        GlobalEvent.emit('CHANGE_SCORE')
    }

    public static setGameOver(){
        this._canGamePlay = false

        GlobalEvent.emit('GAME_OVER')
    }

    public static setStartGame(){
        this._canGamePlay = true

        GlobalEvent.emit("START_GAME")
    }

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

    public static changeScore(value: number){
        this._score += value
        this._scoreForSpeed += value

        GlobalEvent.emit('CHANGE_SCORE')

        if (this._scoreForSpeed >= SCORE_FOR_CHANGE_SPEED){
            this._scoreForSpeed = 0

            GlobalEvent.emit("SPEED_CHANGED")
        }
    }
}