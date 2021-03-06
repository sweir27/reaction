import React from "react"
import styled from "styled-components"
import colors from "../../Assets/Colors"
import * as fonts from "../../Assets/Fonts"
import { block } from "../Helpers"
import { IconProps } from "../Icon"

export interface ButtonProps extends React.HTMLProps<Button> {
  state?: MultiButtonState
  block?: boolean
  icon?: React.ReactElement<IconProps>
}

export enum MultiButtonState {
  Default = "Default",
  Highlighted = "Highlighted",
}

class Button extends React.Component<ButtonProps, any> {
  public static defaultProps: ButtonProps

  render(): JSX.Element {
    // TODO Do we really need to pass an opaque object along or do we know which props should be passed along?
    const newProps: any = { ...this.props }
    delete newProps.state
    delete newProps.block
    delete newProps.icon

    return this.props.href ? (
      <a className={this.props.className} {...newProps}>
        {this.props.icon}
        <span>{this.props.children}</span>
      </a>
    ) : (
      <button className={this.props.className} {...newProps}>
        {this.props.icon}
        <span>{this.props.children}</span>
      </button>
    )
  }
}

export const StyledButton = styled(Button)`
  background: ${props => {
    if (props.state === MultiButtonState.Highlighted) return "black"
    return "white"
  }};
  color: ${props => {
    if (props.disabled) return "rgba(0,0,0,0.5)"
    if (props.state === MultiButtonState.Highlighted) return "white"
    return "black"
  }};
  border: ${props => {
    if (props.state !== MultiButtonState.Default) return "none"
    return `solid 1px ${colors.grayRegular}`
  }};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  font-size: 13px;
  line-height: 1;
  outline: 0;
  transition: background-color 0.25s, color 0.25s;
  margin: 10px;
  box-sizing: border-box;
  text-decoration: none;

  &:hover:not(:disabled) {
    color: white;
    cursor: pointer;
    background: ${colors.purpleRegular};
  }

  ${fonts.primary.style} ${block()};
`

StyledButton.defaultProps = {
  state: MultiButtonState.Default,
  block: false,
}

export default StyledButton
