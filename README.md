# format-axios-error

Format [axios error](https://github.com/axios/axios#handling-errors) for logs. Support for [logform](https://github.com/winstonjs/logform) and [winston](https://github.com/winstonjs/winston).

# Motivation

An axios error contains a lot of information that is not useful in logs. `format-axios-error` is created to solve that problem. It takes original axios error instance and create new one cutting redundant data.

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

There are three ways how to use:

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
_Response data and headers in this example are omitted. To see full log message run the code snipped locally_


### Winston and logform

The following example shows how to use the library with [winston](https://github.com/winstonjs/winston) logger and [logform](https://github.com/winstonjs/logform).

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
