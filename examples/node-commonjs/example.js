const axios = require('axios');
const { format } = require('@redtea/format-axios-error');

axios.get('https://google.com/give404')
  .catch(error => console.log(format(error)))
