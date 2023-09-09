import { _decorator, EventKeyboard, EventTouch, Input, input, KeyCode, Node, SystemEvent, Vec3 } from 'cc';
import { DogComponent } from '../component/DogComponent';
import { GlobalEvent } from '../event/GlobalEvent';
import { PlayerData } from '../data/PlayerData';
const { ccclass } = _decorator;

@ccclass('DogMovement')
export  class DogMovement {
    // STATE
    private _dogComponent: DogComponent    

    public speed: number = 10
    
    // GETTER
    public get dogComponent(): DogComponent {
        return this._dogComponent
    }

    // INIT
    public constructor(canvas: Node) {
        this._dogComponent = canvas.getComponentInChildren(DogComponent)     
        
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        GlobalEvent.on("PAUSE", this.onPause, this)
        GlobalEvent.on("PLAY", this.onPlay, this)

        GlobalEvent.on("DIRECTION_CHANGED",this.changeDirection, this)
    }

    // INTERFACE
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

    // PRIVATE

    private changeDirection(){
        const direction = PlayerData.getDirection()
        this._dogComponent.playAnimation(direction)    
    }

    private onPause() {
        this._dogComponent.pauseAnimation()
        PlayerData.clearDirection()

        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onPlay() {
        this._dogComponent.resumeAnimation()

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
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

        GlobalEvent.off("PAUSE", this.onPause, this)
        GlobalEvent.off("PLAY", this.onPlay, this)
        GlobalEvent.off("DIRECTION_CHANGED",this.changeDirection, this)
        PlayerData.clearDirection()
        
        this._dogComponent = null
    }
}