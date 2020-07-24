import { h, Component } from 'preact'
import classNames from 'classnames'
import { sendScreen } from '../../Tracker'
import { wrapArray } from '~utils/array'
import NavigationBar from '../NavigationBar'
import theme from '../Theme/style.scss'
import { withFullScreenState } from '../FullScreen'

class StepsRouter extends Component {
  state = {
    theme: 'day'
  }

  componentDidMount = () => {
    this.changeTheme();
  }

  changeStyleTheme = () => {
    const theme = this.state.theme === 'day' ? 'night' : 'day';
    this.setState({ theme }, () => {
      this.changeTheme();
    })
  }

  changeTheme = () => {
    const link = document.createElement('link')
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = `/castor/${this.state.theme}.css`;
    link.media = 'all';
    document.head.appendChild(link);
  }

  resetSdkFocus = () => this.container.focus()

  trackScreen = (screenNameHierarchy, properties = {}) => {
    const { step } = this.currentComponent()
    sendScreen(
      [step.type, ...wrapArray(screenNameHierarchy)],
      {...properties, ...step.options})
  }

  currentComponent = () => this.props.componentsList[this.props.step]

  render = () => {
    const {
      back,
      disableNavigation,
      isFullScreen,
      hideOnfidoLogo,
      cobrand,
      options: { mobileFlow, ...globalUserOptions },
      ...otherProps
    } = this.props
    const componentBlob = this.currentComponent()
    const CurrentComponent = componentBlob.component
    const options = componentBlob.step.options
    const stepId = `onfido-step${this.props.step}`  // to trigger update in NavigationBar on step change
    // This prevents the logo, cobrand UI elements from appearing late
    const hideLogoLogic = mobileFlow ?
      hideOnfidoLogo :
      globalUserOptions.enterpriseFeatures?.hideOnfidoLogo && hideOnfidoLogo
    const cobrandLogic = mobileFlow ?
      cobrand :
      globalUserOptions.enterpriseFeatures?.cobrand && cobrand
    return (
      //TODO: Wrap CurrentComponent in themeWrap HOC
      <div
        className={classNames(theme.step, {
          [theme.fullScreenStep]: isFullScreen,
          [theme.noLogo]: hideLogoLogic,
          [theme.cobrandLogo]: cobrandLogic,
          [theme.defaultLogo]: !hideOnfidoLogo && !cobrand
        })}
        tabIndex={-1}
        ref={node => this.container = node}>
        <NavigationBar
          id={stepId}
          back={back}
          changeStyleTheme={this.changeStyleTheme}
          disabled={disableNavigation}
          className={theme.navigationBar} />
        <div
          className={classNames(theme.content, theme[this.state.theme], {
            [theme.fullScreenContentWrapper]: isFullScreen,
            [theme.scrollableContent]: !isFullScreen
          })}
        >
          <CurrentComponent {...{...options, ...globalUserOptions, ...otherProps, back}}
            trackScreen={this.trackScreen}
            resetSdkFocus={this.resetSdkFocus} />
        </div>
        {!hideLogoLogic && cobrandLogic ?
          <div className={classNames({ [theme.cobrandFooter]: cobrandLogic })}>
            <div className={theme.cobrandLabel} aria-hidden="true">
              <div className={theme.cobrandText}>{cobrandLogic.text}</div>
              <div className={theme.poweredBy}>powered by</div>
            </div>
            <div className={theme.logo} />
          </div>
          :
          <div className={theme.footer} />}
      </div>
    )
  }
}

export default withFullScreenState(StepsRouter)
