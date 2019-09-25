import EventEmitter from "./event-emitter"

export default class Listenable extends EventEmitter {
  ".status": string = "changed" // Current data status

  stateWillTerminate() {
    // TO OVERRIDE
  }
  setState(value?: any, value2?: any) {
    EventEmitter.setState.apply(this, arguments)
    if (this[".events"] && this[".events"][0]) {
      this[".status"] = "changed"
    }
  }
  isTerminateState() {
    return this[".status"] === "released"
  }
  terminateState() {
    this.stateWillTerminate()
    this[".status"] = "released"
    this.dispatchEvent("terminate")
  }
  addEventListener(typeOrCallback: string | Function, callback?: Function) { }
  removeEventListener(typeOrCallback: string | Function, callback?: Function) { }
  dispatchEvent(type: string, data?: any) { }
  executeEvent(type: string, data?: any): Promise<any> | null { return null }
}

Listenable.prototype.addEventListener = EventEmitter.addEventListener
Listenable.prototype.removeEventListener = EventEmitter.removeEventListener
Listenable.prototype.dispatchEvent = EventEmitter.dispatchEvent
Listenable.prototype.executeEvent = EventEmitter.executeEvent
