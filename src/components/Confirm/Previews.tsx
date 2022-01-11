import classNames from 'classnames'
import { h } from 'preact'
import { localised } from '~locales'
import { CaptureMethods } from '~types/commons'
import { WithLocalisedProps } from '~types/hocs'
import { CapturePayload } from '~types/redux'
import { ErrorProp } from '~types/routers'
import { DocumentTypes, PoaTypes, RequestedVariant } from '~types/steps'
import { CONFIRM_PREVIEWS_LOCALES_MAPPING } from '~utils/localesMapping'
import CaptureViewer from '../CaptureViewer'
import Error from '../Error'
import PageTitle from '../PageTitle'
import ScreenLayout from '../Theme/ScreenLayout'
import theme from '../Theme/style.scss'
import Actions from './Actions'
import style from './style.scss'

const getMessageKey = ({
  capture,
  documentType,
  poaDocumentType,
  error,
  forceRetake,
  method,
}: {
  error?: ErrorProp
  capture: CapturePayload
  poaDocumentType: PoaTypes
  forceRetake: boolean
  documentType: DocumentTypes
  method: CaptureMethods
}) => {
  if (method === 'face') {
    return capture.variant === 'video' ? '' : 'selfie_confirmation.subtitle'
  }

  // In case of real error encountered but there's a `forceRetake` flag activated
  if (error && error.type === 'error') {
    return CONFIRM_PREVIEWS_LOCALES_MAPPING[documentType || poaDocumentType]
  }

  if (forceRetake) {
    return 'doc_confirmation.body_image_poor'
  }

  if (error && error.type === 'warning') {
    return 'doc_confirmation.body_image_medium'
  }

  return CONFIRM_PREVIEWS_LOCALES_MAPPING[documentType || poaDocumentType]
}

const getNamespace = (
  method: CaptureMethods,
  variant: RequestedVariant | undefined
) => {
  if (method === 'face') {
    if (variant === 'video') {
      return 'video_confirmation'
    }

    return 'selfie_confirmation'
  }

  return 'doc_confirmation'
}

type PreviewsProps = {
  isFullScreen: boolean
  capture: CapturePayload
  retakeAction: () => void
  confirmAction: () => void
  isUploading: boolean
  error?: ErrorProp
  method: CaptureMethods
  documentType: DocumentTypes
  poaDocumentType: PoaTypes
  forceRetake: boolean
  onVideoError: () => void
} & WithLocalisedProps

const Previews = localised(
  ({
    capture,
    retakeAction,
    confirmAction,
    error,
    method,
    documentType,
    poaDocumentType,
    translate,
    isFullScreen,
    isUploading,
    forceRetake,
    onVideoError,
  }: PreviewsProps) => {
    const methodNamespace = getNamespace(method, capture.variant)
    /**
     * Possible locale keys for `title`:
     *  - doc_confirmation.title
     *  - selfie_confirmation.title
     *  - video_confirmation.title
     */
    const title = translate(`${methodNamespace}.title`)

    /**
     * Possible locale keys for `imageAltTag`:
     *  - doc_confirmation.image_accessibility
     *  - selfie_confirmation.image_accessibility
     */
    const imageAltTag = translate(`${methodNamespace}.image_accessibility`)
    const videoAriaLabel = translate('video_confirmation.video_accessibility')
    const message = translate(
      getMessageKey({
        capture,
        documentType,
        poaDocumentType,
        error,
        forceRetake,
        method,
      })
    )
    const actions = (
      <Actions
        {...{
          retakeAction,
          confirmAction,
          isUploading,
          error,
          forceRetake,
        }}
      />
    )

    return (
      <ScreenLayout actions={!isFullScreen ? actions : undefined}>
        <div
          className={classNames(
            style.previewsContainer,
            theme.fullHeightContainer,
            {
              [style.previewsContainerIsFullScreen]: isFullScreen,
            }
          )}
        >
          {isFullScreen ? null : error && error.type ? (
            <Error
              {...{
                error,
                withArrow: true,
                role: 'alert',
                focusOnMount: false,
              }}
            />
          ) : (
            <PageTitle
              title={title}
              smaller
              className={style.title}
              shouldAutoFocus={methodNamespace !== 'doc_confirmation'}
            />
          )}
          <CaptureViewer
            {...{
              capture,
              method,
              isFullScreen,
              imageAltTag,
              videoAriaLabel,
              onVideoError,
            }}
          />
          {!isFullScreen && <p className={style.message}>{message}</p>}
        </div>
      </ScreenLayout>
    )
  }
)

export default Previews
