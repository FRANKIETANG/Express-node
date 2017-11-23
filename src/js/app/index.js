import { Waterfall } from '../mod/waterfall.js'
import { Event } from '../mod/event'
import { NoteManger } from '../mod/node-manger'

import '../../less/index.less'

let waterfall = new Waterfall()
let notemanger = new NoteManger()
let event = new Event()

waterfall.init($('#content'))

notemanger.load()

$('add-note').on('click', function () {
    notemanger.add()
})

event.on('waterfall', function () {
    waterfall.render()
})

setInterval(() => {
    event.fire('waterfall')
}, 60000)