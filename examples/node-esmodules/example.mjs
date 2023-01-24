import axios from 'axios';
import { format } from '@redtea/format-axios-error';

axios.get('https://google.com/give404')
  .catch(error => console.log(format(error)))
