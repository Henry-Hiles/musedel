export class ExtendableTimeout {
    private timerId: ReturnType<typeof setTimeout>
    private timeStart: number
    private fn: () => void

    constructor(fn: () => void, time: number) {
        this.fn = fn
        this.timeStart = Date.now()
        this.timerId = setTimeout(fn, time)
    }

    extend(time: number): void {
        clearTimeout(this.timerId)

        const elapsed = Date.now() - this.timeStart
        const newTime = Math.max(0, time - elapsed)

        this.timerId = setTimeout(this.fn, newTime)
    }

    cancel(): void {
        clearTimeout(this.timerId)
    }
}
