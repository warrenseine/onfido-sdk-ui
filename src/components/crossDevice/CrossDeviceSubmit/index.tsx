import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { Button } from '@onfido/castor-react'
import classNames from 'classnames'
import ScreenLayout from 'components/Theme/ScreenLayout'
import { trackComponent } from '../../../Tracker'
import PageTitle from '../../PageTitle'
import { localised } from '~locales'
import theme from '../../Theme/style.scss'
import style from './style.scss'
import { WithLocalisedProps, WithTrackingProps } from '~types/hocs'
import { StepsRouterProps } from '~types/routers'
import { StepConfig } from '~types/steps'
import { CaptureState } from '~types/redux'

type CrossDeviceSubmitProps = {
  captures: CaptureState
  steps: StepConfig[]
  nextStep: StepsRouterProps['nextStep']
}

type Props = CrossDeviceSubmitProps & WithLocalisedProps & WithTrackingProps

type State = {
  isSubmitDisabled: boolean
}

class CrossDeviceSubmit extends Component<Props, State> {
  state = {
    isSubmitDisabled: false,
  }

  hasDocumentOrPoACaptureSteps = () => {
    // FIX: PoA is currently using the same copy as documents -> "Document"
    // PoA should use its own copy
    // Also, this assumes that document and poa steps are not used as part of the same flow
    return this.props.steps.some(
      (step) => step.type === 'document' || step.type === 'poa'
    )
  }

  hasMultipleDocuments = () => {
    const { steps } = this.props
    const documentSteps = steps.filter((step) => step.type === 'document')
    return documentSteps.length > 1
  }

  hasFaceCaptureStep = () => {
    return this.props.steps.some((step) => step.type === 'face')
  }

  getFaceCaptureVariant = () => {
    const { captures } = this.props
    const { face } = captures
    return face && face?.metadata ? face?.metadata?.variant : 'standard'
  }

  handleSubmitButtonClick = () => {
    this.setState({ isSubmitDisabled: true })
    this.props.nextStep()
  }

  render() {
    const { translate } = this.props
    const documentCopy = this.hasMultipleDocuments()
      ? 'cross_device_checklist.list_item_doc_multiple'
      : 'cross_device_checklist.list_item_doc_one'
    const faceCaptureVariant =
      this.getFaceCaptureVariant() === 'standard' ? 'selfie' : 'video'
    const selfieCopy =
      faceCaptureVariant === 'video'
        ? 'cross_device_checklist.list_item_video'
        : 'cross_device_checklist.list_item_selfie'

    const actions = (
      <Button
        type="button"
        variant="primary"
        className={classNames(theme['button-centered'], theme['button-lg'])}
        onClick={this.handleSubmitButtonClick}
        disabled={this.state.isSubmitDisabled}
        data-onfido-qa="cross-device-submit-btn"
      >
        {translate('cross_device_checklist.button_primary')}
      </Button>
    )

    return (
      <ScreenLayout pageId="CrossDeviceSubmit" actions={actions}>
        <PageTitle
          title={translate('cross_device_checklist.title')}
          subTitle={translate('cross_device_checklist.subtitle')}
        />
        <ul
          className={style.uploadList}
          aria-label={translate('cross_device_checklist.info')}
        >
          {this.hasDocumentOrPoACaptureSteps() && (
            <li className={style.uploadListItem}>
              <span className={`${theme.icon} ${style.icon}`} />
              <span
                className={classNames(
                  style.listText,
                  style.documentUploadedLabel
                )}
              >
                {translate(documentCopy)}
              </span>
            </li>
          )}
          {this.hasFaceCaptureStep() && (
            <li className={style.uploadListItem}>
              <span className={`${theme.icon} ${style.icon}`} />
              <span
                className={classNames(
                  style.listText,
                  style[`${faceCaptureVariant}UploadedLabel`]
                )}
              >
                {translate(selfieCopy)}
              </span>
            </li>
          )}
        </ul>
      </ScreenLayout>
    )
  }
}

const mapStateToProps = ({ captures }: { captures: CaptureState }) => ({
  captures,
})

export default connect(mapStateToProps)(
  // @ts-ignore
  trackComponent(localised(CrossDeviceSubmit), 'desktop_submit')
)
