import { h, Component, ComponentType } from 'preact'
import { isDesktop } from '~utils'

import { ApiParsedError } from '~types/api'
import type {
  StepComponentDocumentProps,
  StepComponentFaceProps,
} from '~types/routers'

type CaptureComponentProps =
  | StepComponentDocumentProps
  | (StepComponentFaceProps & { forceCrossDevice: never })

const buildError = (message: string): ApiParsedError => {
  console.warn(message)

  return {
    response: {
      message,
    },
    status: 499, // For placeholder purpose only
  }
}

const withCrossDeviceWhenNoCamera = <P extends CaptureComponentProps>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> =>
  class WithCrossDeviceWhenNoCamera extends Component<P> {
    componentDidMount() {
      this.attemptForwardToCrossDevice()
    }

    componentDidUpdate(prevProps: P) {
      const propsWeCareAbout: Array<keyof P> = [
        'mobileFlow',
        'hasCamera',
        'allowCrossDeviceFlow',
        'forceCrossDevice',
      ]
      const propsHaveChanged = propsWeCareAbout.some(
        (propKey) => prevProps[propKey] !== this.props[propKey]
      )

      if (propsHaveChanged && this.props.allowCrossDeviceFlow) {
        this.attemptForwardToCrossDevice()
      }
    }

    attemptForwardToCrossDevice = () => {
      const {
        changeFlowTo,
        componentsList,
        forceCrossDevice,
        hasCamera,
        requestedVariant,
        step,
        triggerOnError,
      } = this.props

      const currentStep = componentsList[step]
      const docVideoRequested =
        requestedVariant === 'video' && currentStep.step.type === 'document'
      const cameraRequiredButNoneDetected =
        !hasCamera &&
        (requestedVariant === 'video' || currentStep.step.type === 'face')

      if (cameraRequiredButNoneDetected) {
        triggerOnError(
          buildError(
            'Camera required: Either device has no camera or browser is unable to detect camera'
          )
        )
      }

      if (
        cameraRequiredButNoneDetected ||
        forceCrossDevice ||
        // @TODO: remove this test when we fully support docVideo variant for both desktop & mobile web
        docVideoRequested
      ) {
        if (this.props.mobileFlow) {
          triggerOnError(
            buildError('Already on cross device flow but no camera detected')
          )
          return
        }

        if (this.props.mobileFlow && !this.props.uploadFallback) {
          triggerOnError(
            buildError(
              'Unable to complete the flow: upload fallback not allowed'
            )
          )
          return
        }

        if (!isDesktop) {
          // The cross device option should not be available when the user is already using a mobile device
          return
        }

        const step = 0
        const excludeStepFromHistory = true
        changeFlowTo('crossDeviceSteps', step, excludeStepFromHistory)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

export default withCrossDeviceWhenNoCamera