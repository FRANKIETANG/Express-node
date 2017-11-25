import { Toast } from './toast'
import { Note } from './note'
import { Event } from './event'

let note = new Note()
let event = new Event()
let toast = new Toast()

export class NoteManager {

    load() {
        $.get('/api/notes').done(ret => {
            if (ret.status === 0) {
                console.log(ret.data)
                $.each(ret.data, (idx, article) => {
                    note.init({
                        id: article.id,
                        context: article.text
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