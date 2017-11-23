export class Event {
    constructor() {
        this.onceEvent = {}
        this.events = {}
    }

    on(event, fn) {
        if (this.events[event]) {
            this.events[event].push(fn)
        } else {
            this.events[event] = [fn]
        }
    }

    once(event, fn) {
        if (this.onceEvent[event]) {
            this.onceEvent[event].push(fn)
        } else {
            this.onceEvent[event] = [fn]
        }
    }

    fire(event) {
        if (this.events[event]) {
            this.events[event].forEach((fn) => {
                fn()
            })
        }
        if (this.onceEvent[event]) {
            this.onceEvent[event].forEach((fn) => {
                fn()
            })
            this.onceEvent[event] = []
        }
    }

    off(event) {
        delete this.events[event]
    }

}