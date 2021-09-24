import React from "react";
import styled from "styled-components";
import { darkTheme } from "../variables/colors";
import Link from "./elements/Link";

const Sidebar = (props) => {
    return (
        <SidebarContainer>
            <div>
                <Link fontSize="22" href="#">All Notes</Link>
                <Link fontSize="22" href="#">Favorites</Link>
                <Link fontSize="22" href="#">State</Link>
                <Link fontSize="22" href="#">Categories</Link>
                <Link fontSize="22" href="#">Archived</Link>
            </div>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    min-width: 240px;
    height: 76%;
    padding: 40px 15px;
    border-right: 2px solid ${darkTheme.white.separator};

    ${Link} {
        display: block;
        margin-bottom: 30px;
    }
`;

export {
    Sidebar
};