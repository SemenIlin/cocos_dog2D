import { _decorator, Component, Animation, Vec3, UITransform, AnimationClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DogComponent')
export class DogComponent extends Component {
    @property(Animation)
    private dogAnimation: Animation

    @property(UITransform)
    public transform: UITransform

    private _currentScale = new Vec3(1, 1, 1)  

    public playAnimation(state: number){
        switch(state){
            case 1:
            case -1:
                this.flip(state)
                this.dogAnimation.play("run")
                break

            default:
                this.flipMirror()
                this.dogAnimation.play("idle")
        }         
    }

    public pauseAnimation(){
        this.dogAnimation.pause()
    }

    public resumeAnimation(){
        this.dogAnimation.resume()
    }

    private flip(direction: number){
        this._currentScale.x = direction        
        this.node.scale = this._currentScale
    }

    private flipMirror(){
        this._currentScale.x *= -1 
        this.node.scale = this._currentScale
    }
}