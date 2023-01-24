import axios from 'axios';
import { format } from '@redtea/format-axios-error';

axios.get('https://www.googleapis.com/give-404')
  .catch(error => console.log(JSON.stringify(format(error), null, 2)))
