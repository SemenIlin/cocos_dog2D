import { _decorator, EventKeyboard, Input, input, KeyCode, Node, Vec3 } from 'cc';
import { DogComponent } from '../component/DogComponent';
import { GlobalEvent } from '../event/GlobalEvent';
import { PlayerData } from '../data/PlayerData';
const { ccclass } = _decorator;

const MAX_SPEED = 40
const START_SPEED = 14
@ccclass('DogMovement')
export  class DogMovement {
    // STATE
    private _dogComponent: DogComponent
    private _startPosition: Vec3    

    public speed: number = START_SPEED
    
    // GETTER
    public get dogComponent(): DogComponent {
        return this._dogComponent
    }

    // INIT
    public constructor(canvas: Node) {
        this._dogComponent = canvas.getComponentInChildren(DogComponent) 
        this._startPosition = this._dogComponent.node.position.clone()    
        
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);       

        GlobalEvent.on("DIRECTION_CHANGED",this.changeDirection, this)
        GlobalEvent.on("SPEED_CHANGED", this.changeSpeed, this)
    }

    // INTERFACE
    public resetPosition(){
        PlayerData.clearDirection()
        
        this.speed = START_SPEED       
        this._dogComponent.node.position = this._startPosition
        this._dogComponent.playAnimation(0)
    }

    public move(){
        if (Object.keys(PlayerData.directionList).length == 0) return

        let currentPosition: Vec3 = this._dogComponent.node.position
        let direction = PlayerData.getDirection()

        switch(direction){
            case -1:
                currentPosition.x -= this.speed;
                this._dogComponent.node.position = currentPosition    
            
                break

            case 1:
                currentPosition.x += this.speed;
                this._dogComponent.node.position = currentPosition   
                
                break
        }
    }

    public onPause() {
        this._dogComponent.pauseAnimation()
        PlayerData.clearDirection()

        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    public onPlay() {
        this._dogComponent.resumeAnimation()

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    } 

    // PRIVATE
    private changeSpeed(){
        this.speed += 1; 
        this.speed = Math.min(this.speed, MAX_SPEED)
    }

    private changeDirection(){
        const direction = PlayerData.getDirection()
        this._dogComponent.playAnimation(direction)    
    }      

    private onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:                
                PlayerData.setDirection(-1)

                break

            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                PlayerData.setDirection(1)
                
                break
        }            
    }

    private onKeyUp (event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:                
               PlayerData.deleteDirection(-1)
               break

            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                PlayerData.deleteDirection(1)
                break
        }    
    }    

    // CLEAR
    public clear(){
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);

        GlobalEvent.off("DIRECTION_CHANGED",this.changeDirection, this)
        GlobalEvent.off("SPEED_CHANGED", this.changeSpeed, this)

        PlayerData.clearDirection()
        
        this._dogComponent = null
    }
}