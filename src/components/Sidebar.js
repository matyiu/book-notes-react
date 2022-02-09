import React from 'react'
import styled from 'styled-components'
import { darkTheme } from '../variables/colors'
import Link from './elements/Link'
import Accordion from './elements/Accordion'

const Sidebar = (props) => {
    return (
        <SidebarContainer>
            <div>
                <Link fontSize="22" to="/">
                    All Notes
                </Link>
                <Link fontSize="22" href="#">
                    Favorites
                </Link>
                <Accordion title="State" fontSize="22">
                    <Link fontSize="18" href="#">
                        Planned
                    </Link>
                    <Link fontSize="18" href="#">
                        In progress
                    </Link>
                    <Link fontSize="18" href="#">
                        Completed
                    </Link>
                </Accordion>
                <Accordion title="Categories" fontSize="22">
                    <Link fontSize="18" href="#">
                        Fantasy
                    </Link>
                    <Link fontSize="18" href="#">
                        Biography
                    </Link>
                    <Link fontSize="18" href="#">
                        Medieval
                    </Link>
                </Accordion>
                <Link fontSize="22" href="#">
                    Archived
                </Link>
            </div>
        </SidebarContainer>
    )
}

const SidebarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    min-width: 240px;
    height: 76%;
    padding: 40px 15px;
    border-right: 2px solid ${darkTheme.white.separator};

    div > a {
        display: block;
        margin-bottom: 30px;
    }

    div > div {
        margin-bottom: 30px;
    }
`

export { Sidebar }
