const getToken = (onSuccess) => {
  const url = 'https://token-factory.onfido.com/sdk_token'
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.setRequestHeader(
    'Authorization',
    `BASIC ${process.env.SDK_TOKEN_FACTORY_SECRET}`
  )
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText)
      onSuccess(data.message)
    }
  }
  request.send()
}

import Onfido from './onfido.min.js'

window.onload = function () {
  console.log('Hello World!')
  getToken((token) => {
    console.log('JWT:', token)
    Onfido.init({
      useModal: false,
      token,
      onComplete: function (data) {
        // callback for when everything is complete
        console.log('Everything is complete', data)
      },
      steps: [
        {
          type: 'welcome',
          options: {
            title: 'Open your new bank account',
          },
        },
        'document',
        'face',
        'complete',
      ],
    })
  })
}
