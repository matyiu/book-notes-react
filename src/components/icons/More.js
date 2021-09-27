import React from "react";

const More = (props) => {
    const { className, width, height, color } = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} class={"bi bi-three-dots " + className} viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
    );
};

export default More;