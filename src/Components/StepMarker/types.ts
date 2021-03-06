import { ReactNode } from "react"

export interface StepProps {
  label: string
  isActive: boolean
  isComplete: boolean
}

export interface RenderProps {
  nextStep: () => void
  previousStep: () => void
  gotoStep: (index: number) => void
  stepState: State
}

export interface Props {
  children?: (renderProps: RenderProps) => ReactNode
  steps: StepProps[]
}

export interface State {
  currentStep: number
  steps: StepProps[]
}
