const debounce = (fn, timeout = 1000) => {
    let timer

    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, timeout)
    }
}

export default debounce
