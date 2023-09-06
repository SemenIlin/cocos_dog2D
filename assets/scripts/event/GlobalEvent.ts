import { EventTarget, _decorator } from 'cc'
import { GlobalEventName } from './GlobalEventName'
const { ccclass } = _decorator

@ccclass('GlobalEvent')
export abstract class GlobalEvent {
  // STATE
  private static _event = new EventTarget()

  // INTERFACE
  public static on(event: keyof typeof GlobalEventName, callback: (...any: any[]) => void, thisArg?: any, once?: boolean) {
    this._event.on(event, callback, thisArg, once)
  }

  public static once(event: keyof typeof GlobalEventName, callback: (...any: any[]) => void, thisArg?: any) {
    this._event.once(event, callback, thisArg)
  }

  public static off(event: keyof typeof GlobalEventName, callback?: (...any: any[]) => void, thisArg?: any): void {
    this._event.off(event, callback, thisArg)
  }

  public static emit(event: keyof typeof GlobalEventName, arg0?: any, arg1?: any) {
    this._event.emit(event, arg0, arg1)
  }
}
