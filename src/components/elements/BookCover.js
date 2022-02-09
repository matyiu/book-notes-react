import React from 'react'
import styled from 'styled-components'
import { darkTheme } from '../../variables/colors'
import Image from './Image'

const BookCoverContainer = styled.div`
    width: 100%;
    bakcground-color: ${darkTheme.primary.input};
`

export default (props) => {
    const { src } = props

    return (
        <BookCoverContainer>
            <Image src={src} />
        </BookCoverContainer>
    )
}
