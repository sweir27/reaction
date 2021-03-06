import { storiesOf } from "@storybook/react"
import React from "react"

import colors from "../../Assets/Colors"
import Button from "../Buttons/Inverted"
import { Checkbox } from "../Checkbox"
import Icon from "../Icon"
import Input from "../Input"
import TextArea from "../TextArea"

storiesOf("Components/Input", module)
  .add("Inputs", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="First Name" />
      <Input placeholder="First Name" error />
      <Input placeholder="First Name" disabled />

      <div style={{ paddingTop: 10 }}>
        <Input
          placeholder="Search"
          leftView={<Icon name="search" color={colors.graySemibold} />}
        />
      </div>

      <div style={{ paddingTop: 10 }}>
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </div>
    </div>
  ))
  .add("Input with Label", () => (
    <div>
      <div style={{ padding: 5 }}>
        <Input placeholder="Enter your email address" label="Email" block />
      </div>
      <div style={{ padding: 5 }}>
        <Input
          type="password"
          placeholder="Enter your password"
          label="Password"
          block
        />
      </div>
    </div>
  ))
  .add("Text Areas", () => (
    <div>
      <TextArea placeholder="Your Message" />
      <TextArea placeholder="Your Message" error />
      <TextArea placeholder="Your Message" disabled />
    </div>
  ))
  .add("Check Boxes", () => (
    <div>
      <div style={{ padding: 10 }}>
        <Checkbox>Remember me</Checkbox>
      </div>
      <div style={{ padding: 10 }}>
        <Checkbox checked>Remember me</Checkbox>
      </div>
      <div style={{ padding: 10 }}>
        <Checkbox disabled>Remember me</Checkbox>
      </div>
      <div style={{ padding: 10 }}>
        <Checkbox checked disabled>
          Remember me
        </Checkbox>
      </div>
    </div>
  ))
  .add("Form", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="First Name" block />
      <TextArea placeholder="Your Message" block />
    </div>
  ))
  .add("Form w/ Button", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="Email" block />
      <Input type="password" placeholder="Password" block />
      <Button block>Submit</Button>
    </div>
  ))
