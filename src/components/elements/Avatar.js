import styled from "styled-components";

export default styled.img`
    width: ${({ size }) => size ? size : 54}px;
    height: ${({ size }) => size ? size : 54}px;
    border-radius: ${({ size }) => size ? size / 2 : 54 / 2}px;
`;