import styled from 'styled-components'
import { darkTheme } from '../../variables/colors'
import Link from './Link'

export const Primary = styled.button`
    padding: 14px 20px;
    background: ${darkTheme.accent};
    border: none;
    border-radius: 6px;
    color: ${darkTheme.black.accent};
    box-shadow: ${darkTheme.shadow.accent};
`

export const ButtonLink = styled.button`
    padding: 5px;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: inherit;
`

export const LinkBtn = styled(Link)`
    padding: 14px 20px;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: ${darkTheme.white.accent};
    box-shadow: none;
`
