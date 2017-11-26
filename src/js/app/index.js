import { Waterfall } from '../mod/waterfall.js'
import { Event } from '../mod/event'
import { NoteManager } from '../mod/node-manager'

import '../../less/index.less'

let waterfall = new Waterfall()

waterfall.init($('#content'))

new NoteManager().load()

$('.add-note').on('click', function () {
    new NoteManager().add()
})

new Event().on('waterfall', function () {
    waterfall.render()
})

setInterval(() => {
    new Event().fire('waterfall')
}, 60000)