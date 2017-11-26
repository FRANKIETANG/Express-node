import { Toast } from './toast'
import { Note } from './note'
import { Event } from './event'

export class NoteManager {

    load() {
        $.get('/api/notes').done(ret => {
            if (ret.status == 0) {
                console.log(ret.data)
                $.each(ret.data, (idx, article) => {
                    new Note().init({
                        id: article.id,
                        context: article.text
                    })
                })
                new Event().fire('waterfall')
            } else {
                // console.log('here')
                new Toast().init(ret.errorMsg)
            }
        }).fail(() => {
            new Toast().init('网络异常')
        })
    }

    add() {
        new Note().init()
    }
}