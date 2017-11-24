import { Toast } from './toast'
import { Note } from './note'
import { Event } from './event'

let note = new Note()
let event = new Event()
let toast = new Toast()

export class NoteManager {

    load() {
        $.get('/').done(ret => {
            if (ret.status === 0) {
                $.each(ret.data, (idx, article) => {
                    note.init({
                        id: article.id,
                        content: article.text
                    })
                })
                event.fire('waterfall')
            } else {
                // console.log('here')
                toast.init(ret.errorMsg)
            }
        }).fail(() => {
            toast.init('网络异常')
        })
    }

    add() {
        note.init()
    }
}