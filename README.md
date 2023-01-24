# @redtea/format-axios-error

This is a small library that provides a function to format an [axios error object]((https://github.com/axios/axios#handling-errors)) for logging purposes. It strips any unnecessary information from the error object, making it more readable and easy to understand when reviewing logs.

Can be used with [logform](https://github.com/winstonjs/logform) and [winston](https://github.com/winstonjs/winston).

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

More usage examples can be found in `examples` directory.

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
_In the example, response data and headers  are omitted. Run the code snipped locally to see full log output._


### How to use with winston and logform

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
