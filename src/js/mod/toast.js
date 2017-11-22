import "../../less/toast.less"

export class Toast {

    init(msg, time) {
        this.msg = msg
        this.dismissTime = time || 1000
        this.createToast()
        this.showTosat()
    }

    createToast() {
        const tpl = `<div class="toast">${this.msg}</div>`
        this.$toast = $(tpl)
        $('body').append(this.$toast)
    }

    showTosat() {
        this.$toast.fadeIn(300, () => {
            setTimeout(() => {
                this.$toast.fadeOut(300, () => {
                    this.$toast.remove()
                })
            }, this.dismissTime)
        })
    }

}