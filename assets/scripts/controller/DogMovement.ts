import { _decorator, EventKeyboard, Input, input, KeyCode, Node, Vec3 } from 'cc';
import { DogComponent } from '../component/DogComponent';
import { Bound } from '../tools/Bound';
const { ccclass } = _decorator;

@ccclass('DogMovement')
export  class DogMovement {
    // STATE
    private _dogComponent: DogComponent
    private _directionList: { [key:number] : number } = {}

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
    }

    // PUBLIC
    public move(){
        if (Object.keys( this._directionList).length == 0) return

        let currentPosition: Vec3 = this._dogComponent.node.position
        let direction = this.getDirection()

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

    private getDirection(): number{
        let result = 0

        for (let key in this._directionList){
            result += this._directionList[key]
        }

        return result
    }

    // PRIVATE
    private onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:                
                this._directionList[-1] = -1

                break

            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this._directionList[1] = 1
                
                break
        }
        
        const direction = this.getDirection()
        this._dogComponent.playAnimation(direction)
        
    }

    private onKeyUp (event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:                
               delete this._directionList[-1]
               break

            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                delete this._directionList[1]
                break
        }       
        
        const direction = this.getDirection()
        this._dogComponent.playAnimation(direction)
    }

    // CLEAR
    public clear(){
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);

        this._directionList = {}
        this._dogComponent = null
    }
}