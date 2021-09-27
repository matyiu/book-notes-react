import styled from "styled-components";
import { darkTheme } from "../../variables/colors";
import { fonts } from "../../variables/fonts";

export const Heading2 = styled.h2`
    font-size: ${fonts.h2.size}px;
    line-height: ${fonts.h2.lineHeight}px;
    color: ${darkTheme.white.accent};
`;