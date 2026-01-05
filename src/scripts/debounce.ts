export const debounce = <T extends (...args: any[]) => void>(
    fn: T
): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout> | undefined

    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => fn(...args), 500)
    }
}
