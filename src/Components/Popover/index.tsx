import React, { cloneElement } from "react"
import styled from "styled-components"

import * as fonts from "../../Assets/Fonts"
import { PopoverArrowPositionProps, PopoverProps } from "./types"

export class Popover extends React.Component<PopoverProps> {
  private readonly Arrows = {
    top: <PopoverTopArrow />,
    right: <PopoverRightArrow />,
    bottom: <PopoverBottomArrow />,
    left: <PopoverLeftArrow />,
  }

  render() {
    const {
      placement,
      arrowOffsetLeft,
      arrowOffsetTop,
      ref,
      ...props
    } = this.props

    return (
      <PopoverContainer {...props}>
        {cloneElement(this.Arrows[placement], {
          arrowOffsetLeft,
          arrowOffsetTop,
        })}

        <PopoverInner>{this.props.children}</PopoverInner>
      </PopoverContainer>
    )
  }
}

const PopoverContainer = styled.div`
  position: relative;
  padding: 5px;
  display: inline-block;
`

const PopoverArrow = styled.div.attrs<PopoverArrowPositionProps>({})`
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
`

const PopoverTopArrow = PopoverArrow.extend`
  bottom: 0;
  left: ${({ arrowOffsetLeft }) => arrowOffsetLeft || "50%"};
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
`

const PopoverRightArrow = PopoverArrow.extend`
  top: ${({ arrowOffsetTop }) => arrowOffsetTop || "50%"};
  left: 0;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-right-color: #000;
`

const PopoverBottomArrow = PopoverArrow.extend`
  top: 0;
  left: ${({ arrowOffsetLeft }) => arrowOffsetLeft || "50%"};
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
`

const PopoverLeftArrow = PopoverArrow.extend`
  top: ${({ arrowOffsetTop }) => arrowOffsetTop || "50%"};
  right: 0;
  margin-top: -5px;
  border-width: 5px 0 5px 5px;
  border-left-color: #000;
`

const PopoverInner = styled.div`
  padding: 8px 10px;
  color: #fff;
  text-align: center;
  background-color: #000;
  ${fonts.secondary.style};
`
