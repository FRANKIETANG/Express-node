const onceEvent = {};
const events = {};

export class Event {

    on(event, fn) {
        if (events[event]) {
            events[event].push(fn)
        } else {
            events[event] = [fn]
        }
    }

    once(event, fn) {
        if (onceEvent[event]) {
            onceEvent[event].push(fn)
        } else {
            onceEvent[event] = [fn]
        }
    }

    fire(event) {
        if (events[event]) {
            events[event].forEach((fn) => {
                fn()
            })
        }
        if (onceEvent[event]) {
            onceEvent[event].forEach((fn) => {
                fn()
            })
            onceEvent[event] = []
        }
    }

    off(event) {
        delete events[event]
    }

}