import styled from 'styled-components'
import { darkTheme } from '../../variables/colors'
import { fonts } from '../../variables/fonts'

export const Heading2 = styled.h2`
    font-size: ${fonts.h2.size}px;
    line-height: ${fonts.h2.lineHeight}px;
    color: ${darkTheme.white.accent};
`

export const Heading3 = styled.h3`
    font-size: 19px;
    line-height: 30px;
    color: ${darkTheme.white.accent};
`
