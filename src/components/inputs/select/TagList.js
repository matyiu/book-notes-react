import React from 'react'

export const TagList = (props) => {
    const { tags } = props

    const tagList = tags.map((tag) => (
        <li className="pill">
            {tag}
            <span className="pill-close">
                <i className="fas fa-times"></i>
            </span>
        </li>
    ))

    return (
        <div className="select-list-wrapper">
            <ul>{tagList}</ul>
        </div>
    )
}
