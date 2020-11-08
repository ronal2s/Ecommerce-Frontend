import React from "react";

interface IProps {
    url: string,
    width?: number | string,
    height?: number | string,
    style?: any
}

function Image(props: IProps) {
    return (
        <img src={props.url} width={props.width} height={props.height} style={props.style} />
    )
}

export default Image;