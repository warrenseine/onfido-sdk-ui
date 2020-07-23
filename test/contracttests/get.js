import axios from 'axios';
const { get } = require('axios')

module.exports = function () {
    
    return axios.get('http://localhost:2222/sdk_token', {
        headers: {
          'content-type': 'application/json',
          'Referer': 'onfido.surge.sh',
          'authorization': 'BASIC ONLY_TO_BE_USED_BY_ONFIDO'
        }
      })
      
}
