import {format}from './node_modules/@redtea/format-axios-error/index.browser.mjs';

axios.get('https://www.googleapis.com/give-404')
  .catch(error => console.log(JSON.stringify(format(error), null, 2)))
