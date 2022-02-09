import React from 'react'

const Caret = (props) => {
    const { variant, ...restProps } = props

    const icon =
        variant == 'down' ? <Down {...restProps} /> : <Up {...restProps} />

    return icon
}

const Down = (props) => {
    const { color, width, height } = props

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={color}
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
        >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
    )
}

const Up = (props) => {
    const { color, width, height } = props

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={color}
            class="bi bi-caret-up-fill"
            viewBox="0 0 16 16"
        >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
    )
}

export default Caret
