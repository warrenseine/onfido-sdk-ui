import { ErrorProp } from '~types/routers'
import { h } from 'preact'
import { DocumentOverlay } from '../Overlay'
import style from './DocumentImagePreview.scss'
import { useToggleFullScreen } from '../FullScreen'
import ScreenLayout from '../Theme/ScreenLayout'
import Actions from '../Confirm/Actions'
import { CapturePayload } from '~types/redux'
import { CaptureMethods } from '~types/commons'
import { DocumentTypes, PoaTypes } from '~types/steps'
import Error from '../Error'
import { CONFIRM_PREVIEWS_LOCALES_MAPPING } from '~utils/localesMapping'
import { Instructions } from '../DocumentVideo/reusables'
import { useLocales } from '~locales'
import { useBlobToLossyBase64 } from '~utils/blob'
import Pannable from '../Pannable'
import { useState } from 'preact/compat'

type ConfirmProps = {
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
}

const getMessageKey = ({
  documentType,
  poaDocumentType,
  error,
  forceRetake,
}: {
  error?: ErrorProp
  poaDocumentType: PoaTypes
  forceRetake: boolean
  documentType: DocumentTypes
}) => {
  if (error?.type === 'error') {
    return CONFIRM_PREVIEWS_LOCALES_MAPPING[documentType || poaDocumentType]
  }

  if (forceRetake) {
    return 'doc_confirmation.body_image_poor'
  }

  if (error?.type === 'warning') {
    return 'doc_confirmation.body_image_medium'
  }

  return CONFIRM_PREVIEWS_LOCALES_MAPPING[documentType || poaDocumentType]
}
const DocumentImagePreview = ({
  capture,
  retakeAction,
  confirmAction,
  error,
  documentType,
  poaDocumentType,
  isUploading,
  forceRetake,
}: ConfirmProps) => {
  useToggleFullScreen()

  const { translate } = useLocales()
  const { base64 } = useBlobToLossyBase64(capture.blob)
  const [enlarge, setEnlarge] = useState(false)

  const title = translate(`doc_confirmation.title`)
  const imageAltTag = translate(`doc_confirmation.image_accessibility`)
  const message = translate(
    getMessageKey({
      documentType,
      poaDocumentType,
      error,
      forceRetake,
    })
  )

  const actions = (
    <Actions
      retakeAction={retakeAction}
      confirmAction={confirmAction}
      isUploading={isUploading}
      forceRetake={forceRetake}
      error={error}
    />
  )

  return !enlarge ? (
    <ScreenLayout actions={actions}>
      {/* Fullscreen image */}
      <div className={style.fullScreen}>
        <img className={style.image} src={base64} alt={imageAltTag} />
      </div>

      {/* Fullscreen overlay*/}
      <DocumentOverlay
        isOpaque={true}
        upperScreen={true}
        documentType={documentType}
      >
        <div className={style.instructions}>
          <h3 onClick={() => setEnlarge(true)}>Enlarge</h3>
          <Instructions title={title} subtitle={message} />
        </div>
      </DocumentOverlay>

      {error?.type ? (
        <Error error={error} role={'alert'} focusOnMount={false} />
      ) : undefined}
    </ScreenLayout>
  ) : (
    <Pannable className={style.fullScreen}>
      <img
        className={style.enlargedImage}
        src={base64}
        alt={imageAltTag}
        onClick={() => setEnlarge(false)}
      />
    </Pannable>
  )
}

export default DocumentImagePreview
