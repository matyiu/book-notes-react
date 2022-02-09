import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { darkTheme } from '../../variables/colors'
import Avatar from './Avatar'
import { Dropwdown } from './Dropdown'
import { Heading2 } from './Headings'

const UserProfileBtn = (props) => {
    const { username, profilePic } = props

    return (
        <UserProfileBtnContainer>
            <UserProfileHeading>{username}</UserProfileHeading>
            <Avatar src={profilePic} />
        </UserProfileBtnContainer>
    )
}

const UserProfile = (props) => {
    const { user } = props

    const userProfileBtn = (
        <UserProfileBtn
            username={'username'}
            profilePic={'https://via.placeholder.com/150'}
        />
    )

    return (
        <Dropwdown input={userProfileBtn}>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Log Out</Link>
        </Dropwdown>
    )
}

const UserProfileBtnContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
`

const UserProfileHeading = styled(Heading2)`
    margin: 0;
    margin-right: 20px;
    font-weight: 400;
    transition: all 0.25s ease-in-out;

    &:hover {
        color: ${darkTheme.accent};
    }
`

export default UserProfile
