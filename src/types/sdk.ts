import { SupportedLanguages, LocaleConfig } from './locales'
import { StepConfig, StepTypes } from './steps'

type DocumentResponse = {
  id: string
  side: string
  type: string
}

type FaceResponse = {
  id: string
  variant: string
}

export type SdkResponse = {
  document_front: DocumentResponse
  document_back?: DocumentResponse
  face: FaceResponse
}

export type SdkError = {
  type: 'exception' | 'expired_token'
  message: string
}

export type ServerRegions = 'US' | 'EU' | 'CA'

interface FunctionalConfigurations {
  disableAnalytics?: boolean
  mobileFlow?: boolean
  roomId?: string
  tearDown?: boolean
  useMemoryHistory?: boolean
}

export interface SdkOptions extends FunctionalConfigurations {
  // Callbacks
  onComplete?: (data: SdkResponse) => void
  onError?: (error: SdkError) => void
  onModalRequestClose?: () => void

  // Customization
  token?: string
  useModal?: boolean
  isModalOpen?: boolean
  shouldCloseOnOverlayClick?: boolean
  containerId?: string
  containerEl?: HTMLElement | null
  language?: SupportedLanguages | LocaleConfig
  region?: ServerRegions
  smsNumberCountryCode?: string
  userDetails?: {
    smsNumber?: string
  }
  steps?: Array<StepTypes | StepConfig>
  enterpriseFeatures?: {
    hideOnfidoLogo?: boolean
    cobrand?: { text: string }
    requestMode?: SdkRequestsModes
    onUserSubmitCBs?: {
      onDocumentSubmit?: (data: SdkResponse) => void
      onSelfieSubmit?: (data: SdkResponse) => void
      onVideoSubmit?: (data: SdkResponse) => void
    }
  }
}

export type SdkHandle = {
  options: SdkOptions
  setOptions(options: SdkOptions): void
  tearDown(): void
}

/* Standard is our currently process,
   Proxy would make the SDK wait to get a response from the callback,
   Decouple would automatically continue to next step after calling callback */
export type SdkRequestsModes = 'STANDARD' | 'PROXY' | 'DECOUPLE';

export type SdkInitMethod = (options: SdkOptions) => SdkHandle
