import React from "react";
import styled from "styled-components";
import { darkTheme } from "../../variables/colors";
import { fonts } from "../../variables/fonts";

const Input = styled.input`
    background-color: ${({ colors }) => (colors && colors.background) ? colors.background : darkTheme.primary.input};
    box-shadow: ${({ colors }) => (colors && colors.shadow) ? colors.shadow : darkTheme.shadow.default};
    border: none;
    border-radius: 6px;
    color: ${({ colors }) => (colors && colors.text) ? colors.text : darkTheme.white.text};
    font-size: ${fonts.p.size}px;
    line-height: 20px;
    padding: 14px 15px;
    font-family: "Roboto Condensed", sans-serif;

    &::placeholder {
        color: ${({ colors }) => (colors && colors.placeholder) ? colors.placeholder : darkTheme.white.placeholder};
        font-size: ${fonts.p.size}px;
        line-height: 20px;
        font-family: "Roboto Condensed", sans-serif;
    }
`;

const InputText = styled(Input).attrs({
    type: 'text',
})``;

const InputTextIcon = (props) => {
    const { icon, colors, ...restProps } = props;

    return (
        <InputTextIconContainer>
            {icon}
            <InputText {...restProps} colors={colors ?? {}} />
        </InputTextIconContainer>
    );
}

const InputTextIconContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    .input-icon {
        position: absolute;
        left: 15px;
    }

    ${InputText} {
        padding-left: 45px;
    }
`;

const InputTextButton = (props) => {
    const { icon, colors, ...restProps } = props;

    return (
        <InputTextButtonContainer>
            <InputTextButtonIcon colors={colors} >
                {icon}
            </InputTextButtonIcon>
            <InputText {...restProps} colors={colors} />
        </InputTextButtonContainer>
    );
}

const InputTextButtonContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    ${InputText} {
        padding-left: 48px;
    }
`;

const InputTextButtonIcon = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 100%;
    border-radius: 6px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: ${({ colors }) => colors.background ? colors.background : darkTheme.primary.input};
    border-right: 1px solid ${({ colors }) => colors.separator ? colors.separator : darkTheme.white.separator};
    cursor: pointer;
`;

export {
    InputText,
    InputTextIcon,
    InputTextButton
};