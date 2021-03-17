import { h, FunctionComponent } from 'preact'
import { memo, useEffect, useRef, useState } from 'preact/compat'
import Webcam from 'react-webcam-onfido'

import { mimeType } from '~utils/blob'
import { screenshot } from '~utils/camera'
import { getInactiveError } from '~utils/inactiveError'
import { DOC_VIDEO_INSTRUCTIONS_MAPPING } from '~utils/localesMapping'
import VideoCapture from '../VideoCapture'
import VideoLayer from './VideoLayer'
import useCaptureStep from './useCaptureStep'

import { CaptureVariants } from '~types/docVideo'
import type { WithTrackingProps } from '~types/hocs'
import type { CapturePayload } from '~types/redux'
import type {
  HandleCaptureProp,
  HandleDocVideoCaptureProp,
  RenderFallbackProp,
} from '~types/routers'
import type { DocumentTypes } from '~types/steps'

const renamedCapture = (
  payload: CapturePayload,
  step: CaptureVariants
): CapturePayload => ({
  ...payload,
  filename: `document_${step}.${mimeType(payload.blob)}`,
})

const getInstructionLocaleKeys = (documentType: DocumentTypes) => {
  if (documentType === 'passport') {
    return DOC_VIDEO_INSTRUCTIONS_MAPPING.passport
  }

  return DOC_VIDEO_INSTRUCTIONS_MAPPING.card_ids
}

export type Props = {
  cameraClassName?: string
  documentType: DocumentTypes
  renderFallback: RenderFallbackProp
  onCapture: HandleDocVideoCaptureProp
} & WithTrackingProps

const DocumentVideo: FunctionComponent<Props> = ({
  cameraClassName,
  documentType,
  onCapture,
  renderFallback,
  trackScreen,
}) => {
  const {
    stepNumber,
    totalSteps,
    nextStep,
    restart: restartFlow,
  } = useCaptureStep(documentType)
  const [flowComplete, setFlowComplete] = useState(false)
  const [frontPayload, setFrontPayload] = useState<CapturePayload | undefined>(
    undefined
  )
  const [backPayload, setBackPayload] = useState<CapturePayload | undefined>(
    undefined
  )
  const [videoPayload, setVideoPayload] = useState<CapturePayload | undefined>(
    undefined
  )
  const webcamRef = useRef<Webcam>(null)

  useEffect(() => {
    if (!flowComplete) {
      return
    }

    if (documentType === 'passport') {
      onCapture({
        front: frontPayload,
        video: videoPayload,
      })
    } else {
      onCapture({
        front: frontPayload,
        video: videoPayload,
        back: backPayload,
      })
    }
  }, [flowComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  const onRecordingStart = () => {
    nextStep()

    screenshot(webcamRef.current, (blob, sdkMetadata) => {
      const frontCapture = renamedCapture(
        {
          blob,
          sdkMetadata,
        },
        'front'
      )

      setFrontPayload(frontCapture)
    })
  }

  const onVideoCapture: HandleCaptureProp = (payload) => {
    const videoCapture = renamedCapture(payload, 'video')
    setVideoPayload(videoCapture)

    if (documentType === 'passport') {
      return
    }

    screenshot(webcamRef.current, (blob, sdkMetadata) => {
      const backCapture = renamedCapture(
        {
          blob,
          sdkMetadata,
        },
        'back'
      )

      setBackPayload(backCapture)
    })
  }

  const instructionKeys = getInstructionLocaleKeys(documentType)

  const passedProps = {
    documentType,
    instructionKeys,
    onNext: nextStep,
    onSubmit: () => setFlowComplete(true),
    stepNumber,
    totalSteps,
  }

  return (
    <VideoCapture
      cameraClassName={cameraClassName}
      facing="environment"
      inactiveError={getInactiveError(true)}
      method="document"
      onRecordingStart={onRecordingStart}
      onRedo={restartFlow}
      onVideoCapture={onVideoCapture}
      renderFallback={renderFallback}
      renderVideoLayer={(props) => <VideoLayer {...props} {...passedProps} />}
      trackScreen={trackScreen}
      webcamRef={webcamRef}
    />
  )
}

export default memo(DocumentVideo)
