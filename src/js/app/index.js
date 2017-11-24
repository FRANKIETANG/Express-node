import { Waterfall } from '../mod/waterfall.js'
import { Event } from '../mod/event'
import { NoteManager } from '../mod/node-manager'

import '../../less/index.less'

let waterfall = new Waterfall()
let notemanager = new NoteManager()
let event = new Event()

waterfall.init($('#content'))

notemanager.load()

$('.add-note').on('click', function () {
    notemanager.add()
})

event.on('waterfall', function () {
    waterfall.render()
})

setInterval(() => {
    event.fire('waterfall')
}, 60000)