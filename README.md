# format-axios-error

Pretty format [axios error](https://github.com/axios/axios#handling-errors). Can be used with [logform](https://github.com/winstonjs/logform) and [winston](https://github.com/winstonjs/winston).

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

After formatting you will get another instance of axios error. Formatter will strip values of function type, request object and other data that not useful in logs.

### NodeJS

```javascript
const axios = require('axios');
const {format} = require('@redtea/format-axios-error');

axios
  .get('https://google.com/give-404')
  .catch(error => {
    console.log(
      JSON.stringify(format(error), null, 2)
    )
  });
```
will print
```
{
  "name": "Error",
  "isAxiosError": true,
  "config": {
    "url": "https://google.com/give-404",
    "method": "get",
    "headers": [headers],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1
  },
  "response": {
    "data": [data],
    "status": 404,
    "statusText": "Not Found",
    "headers": [headers]
  }
}

```
_Response data and headers omitted in this example. To see full log message you can run code example locally_


### Winston

This example show how provide formatter for winston, but you can use the same module for logform.

```javascript
const winston = require('winston');
const axios = require('axios');
const {axiosError} = require('@redtea/format-axios-error/logform');
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
will print
```
{
  "config": {
    "url": "https://google.com/give-404",
    "method": "get",
    "headers": [headers],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1
  },
  "isAxiosError": true,
  "level": "error",
  "response": {
    "status": 404,
    "data": [data],
    "headers": [headers],
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
  axios
    .get('https://www.googleapis.com/give-404')
    .catch(error => {
      console.log(
        JSON.stringify(
          AxiosErrorFormat.format(error),
          null,
          2
        )
      )
    })
</script>
</body>
</html>
```
