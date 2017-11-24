import '../../less/note.less'
import { Toast } from './toast'
import { Event } from './event'

let toast = new Toast()
let event = new Event()

export class Note {
    constructor() {
        this.colors = [
            ['#ea9b35', '#efb04e'],
            ['#dd598b', '#e672a2'],
            ['#eee34b', '#f2eb67'],
            ['#c24226', '#d15a39'],
            ['#c1c341', '#d0d25c'],
            ['#3f78c3', '#5591d2']
        ]

        this.defaultOps = {
            id: '',
            $ct: $('#content').length > 0 ? $('#content') : $('body'),
            context: 'input here'
        }
    }

    init(opts) {
        this.opts = opts
        this.timer = null
        this.initOpts(opts)
        this.createNote()
        this.setStyle()
        this.bindEvent()
    }

    initOpts(opts) {
        this.opts = $.extend({}, this.defaultOps, opts || {})
        if (this.opts.id) {
            this.id = this.opts.id;
        }
    }

    createNote() {
        let tpl = `
            <div class="note">
                <div class="note-head">
                    <span class="delete fa fa-ban"></span>
                </div>
                <div class="note-ct" contenteditable="true"></div>
            </div>
        `
        this.$note = $(tpl)
        this.$note.find('.note-ct').html(this.opts.context)
        this.opts.$ct.append(this.$note)
        if (!this.id) this.$note.animate({
            top: ((Math.random() + 1) * $(window).height()) * 0.3,
            left: ((Math.random() + 1) * $(window).height()) * 0.3,
        }, 100)
    }

    setStyle() {
        let color = this.colors[Math.floor(Math.random() * 6)]
        this.$note.find('.note-head').css('background-color', color[0])
        this.$note.find('.note-ct').css('background-color', color[1])
    }

    setLayout() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            event.fire('waterfall')
        }, 100)
    }

    bindEvent() {
        let $note = this.$note,
            $noteHead = $note.find('.note-head'),
            $noteCt = $note.find('.note-ct'),
            $delete = $note.find('.delete')

        $delete.on('click', () => {
            this.delete()
        })

        $noteCt.on('focus', () => {
            if ($noteCt.html() == 'input here') $noteCt.html('')
            $noteCt.data('before', $noteCt.html())
        }).on('blur paste', () => {
            if ($noteCt.data('before') !== $noteCt.html()) {
                $noteCt.data('before', $noteCt.html())
                this.setLayout()
                if (this.id) {
                    this.edit($noteCt.html())
                } else {
                    this.add($noteCt.html())
                }
            }
        })

        $noteHead.on('mousedown', function (e) {
            let evtX = e.pageX - $note.offset().left,
                evtY = e.pageY - $note.offset().top
            $note.addClass('draggable').data('evtPos', { x: evtX, y: evtY })
        }).on('mouseup', function () {
            $note.removeClass('draggable').removeData('pos')
        })

        $('body').on('mousemove', function (e) {
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY - $('.draggable').data('evtPos').y,
                left: e.pageX - $('.draggable').data('evtPos').x
            })
        })
    }

    add(msg) {
        $.post('/', {
            note: msg
        }).done((ret) => {
            if (ret.status === 0) {
                toast.init('add success')
            } else {
                this.$note.remove()
                event.fire('waterfall')
                toast.init(ret.errorMsg)
            }
        })
    }

    delete() {
        $.post('/', {
            id: this.id
        }).done((ret) => {
            if (ret.status === 0) {
                toast.init('delete success')
                this.$note.remove()
                event.fire('waterfall')
            } else {
                toast.init(ret.errorMsg)
            }
        })
    }
}