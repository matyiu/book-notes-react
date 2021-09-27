import React from 'react';
import styled from 'styled-components';
import { Container, Row } from './grid/grid';
import { darkTheme } from './../variables/colors';
import UserProfile from './elements/UserProfile';
import { Link } from 'react-router-dom';

const ContainerNavbar = styled(Container)`
    height: 100%;
    display: flex;
    align-items: center;
`;

const RowNavbar = styled(Row)`
    justify-content: space-between;
    align-items: center;
    margin: 0;
`;

const BrandName = styled(Link)`
    font-family: "Roboto Condensed", sans-serif;
    font-size: 24px;
    color: ${darkTheme.white.accent};

    &:hover {
        color: ${darkTheme.white.accent};
        text-decoration: none;
    }
`;

const Navbar = ({ className }) => {
    return (
        <div className={className}>
            <ContainerNavbar>
                <RowNavbar>
                    <BrandName to="/">Boonote</BrandName>
                    <UserProfile user={null} />
                </RowNavbar>
            </ContainerNavbar>
        </div>
    );
};

const StyledNavbar = styled(Navbar)`
    background: ${darkTheme.background};
    height: 74px;
`;

export { StyledNavbar as Navbar };