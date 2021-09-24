import styled from "styled-components"
import { darkTheme } from "../../variables/colors";
import { fonts } from "../../variables/fonts";

const Link = styled.a`
    color: ${({ color }) => color ? color : darkTheme.white.text};
    text-decoration: none;
    font-size: ${({ fontSize }) => fontSize ? fontSize : fonts.p.size}px;
    transition: color 0.25s ease-in-out;

    &:hover {
        color: ${darkTheme.white.accent};
        text-decoration: none;
    }
`;

export default Link;