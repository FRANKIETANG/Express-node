import { Toast } from '../mod/toast.js'
import { Waterfall } from '../mod/waterfall.js'

import '../../less/note.less'
import '../../less/index.less'

let toast = new Toast()
let waterfall = new Waterfall()

waterfall.init($('#content'))
toast.init('fffffffffffff')