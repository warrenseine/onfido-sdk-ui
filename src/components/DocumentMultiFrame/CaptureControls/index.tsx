import { h, FunctionComponent } from 'preact'
import { memo, useEffect } from 'preact/compat'

import { useLocales } from '~locales'
import { DOC_MULTI_FRAME_CAPTURE } from '~utils/constants'
import CameraButton from '../../Button/CameraButton'
import style from './style.scss'

import type { VideoOverlayProps } from '../../VideoCapture'

const CaptureControls: FunctionComponent<VideoOverlayProps> = ({
  disableInteraction,
  isRecording,
  onStart,
  onStop,
}) => {
  const { translate } = useLocales()

  useEffect(() => {
    if (isRecording) {
      setTimeout(onStop, DOC_MULTI_FRAME_CAPTURE.VIDEO_LENGTH)
    }
  }, [isRecording, onStop])

  return (
    <div className={style.controls}>
      {!disableInteraction && !isRecording && (
        <CameraButton
          ariaLabel={translate('selfie_capture.button_accessibility')}
          disableInteraction={disableInteraction}
          onClick={onStart}
          className={style.shutter}
        />
      )}

      {isRecording && (
        <span className={style.captureCountdown}>
          <span className={style.active} />
          <span className={style.background} />
        </span>
      )}
    </div>
  )
}

export default memo(CaptureControls)
