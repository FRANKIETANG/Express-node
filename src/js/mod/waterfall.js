export class Waterfall {

    init(el) {
        this.$el = el
        this.$items = null
        this.itemWidth = 0
        this.colNum = 0
        this.colSumHeight = []
        this.render()
        this.resize()
    }

    render() {
        this.$items = this.$el.children()
        console.log(this.$items)
        this.itemWidth = this.$items.outerWidth(true)
        this.colNum = parseInt($(window).width() / this.itemWidth)
        console.log(this.colNum)
        for (let i = 0; i < this.colNum; i++) {
            this.colSumHeight[i] = 0
        }
        this.$items.each((i, e) => {
            console.log(e)
            let minVal = Math.min.apply(null, this.colSumHeight)
            let minIndex = this.colSumHeight.indexOf(minVal)
            $(e).css({
                top: this.colSumHeight[minIndex],
                left: this.itemWidth * minIndex
            })
            this.colSumHeight[minIndex] += $(e).outerHeight(true)
        })
    }

    resize() {
        $(window).on('resize', () => {
            this.render()
        })
    }

}