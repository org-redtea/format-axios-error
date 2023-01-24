import * as axiosError from '@redtea/format-axios-error';

axios.get('https://www.googleapis.com/give-404')
  .catch(error => console.log(JSON.stringify(axiosError.format(error), null, 2)))
