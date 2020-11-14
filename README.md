# format-axios-error

Pretty format [axios error](https://github.com/axios/axios#handling-errors). Build with [logform](https://github.com/winstonjs/logform) and can be used in browser and node js environments.

# Installation

Yarn

```bash
$ yarn add -E @redtea/format-axios-error
```

NPM

```bash
$ npm install -E @redtea/format-axios-error
```

# Usage

### NodeJS


```javascript
const axios = require('axios');
const {axiosError} = require('@redtea/format-axios-error');

const formatAxiosError = axiosError();

axios
  .get('https://google.com/give-404')
  .catch(error => {
    console.log(
      formatAxiosError
        .transform(error)
    )
  });
```
Example above will print
```
{
  config: {
    url: 'https://google.com/give-404',
    method: 'get',
    headers: {
      ...[headers]
    },
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1
  },
  isAxiosError: true,
  stack: [stack trace],
  response: {
    status: 404,
    data: [data],
    headers: {
      ...[headers]
    },
    statusText: 'Not Found'
  },
  level: 'error',
  message: 'Request failed with status code 404',
  [Symbol(level)]: 'error',
  [Symbol(message)]: 'Request failed with status code 404'
}
```
_Stack trace, response data and headers omitted in this example. To see full log message you can run code example locally_

### Winston

```javascript
const winston = require('winston');
const axios = require('axios');
const {axiosError} = require('@redtea/format-axios-error');
const {combine, json} = winston.format;	

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    axiosError(),
    json({ space: 2 })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

axios
  .get('https://google.com/give-404')
  .catch(error => logger.error(error))
```
Will print
```
{
  "config": {
    "url": "https://google.com/give-404",
    "method": "get",
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "User-Agent": "axios/0.21.0"
    },
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1
  },
  "isAxiosError": true,
  "level": "error",
  "stack": [stack],
  "response": {
    "status": 404,
    "data": [data],
    "headers": {
      ...[headers]
    },
    "statusText": "Not Found"
  },
  "message": "Request failed with status code 404"
}
```

### Browser

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>format-axios-error browser example</title>
  <script src="https://unpkg.com/axios" type="application/javascript"></script>
  <script src="https://unpkg.com/@redtea/format-axios-error" type="application/javascript"></script>
</head>
<body>
<script>
  const formatAxiosError = AxiosErrorFormat.axiosError();

  axios
    .get('https://www.googleapis.com/give-404')
    .catch(error => {
      console.log(
        formatAxiosError
          .transform(error)
      )
    })
</script>
</body>
</html>
```
