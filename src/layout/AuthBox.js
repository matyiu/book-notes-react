import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Heading3 } from '../components/elements/Headings'
import { darkTheme } from '../variables/colors'

export const AuthBox = ({ children }) => {
    return (
        <Wrapper>
            <AuthHeader>
                <BrandName to="/">Boonote</BrandName>
                <Heading3>Log In</Heading3>
            </AuthHeader>
            <AuthBody>{children}</AuthBody>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 375px;
    margin: auto;
`

const AuthHeader = styled.header`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 40px;
`

const AuthBody = styled.div`
    display: flex;
    flex-direction: column;
`

const BrandName = styled(Link)`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 24px;
    color: ${darkTheme.white.accent};

    &:hover {
        color: ${darkTheme.white.accent};
        text-decoration: none;
    }
`
