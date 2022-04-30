This repository demonstrates how cookies are set in the browser by a server and how and when they are sent back to the server by the browser.

The repository includes two other Git repositories — cookie-source and cookie-sink — as submodules. Both repositories feature an Express server. The cookie-source server provides a `web_beacon.jpg` image which is accessed by the cookie-sink application. As a result, the cookie-source server sets several cross-site cookies, which are then sent back to the cookie-source server each time the home page is requested from the cookie-sink server.

These two repositories are deployed to Heroku. You can test them here:

  [cookie-source](https://cookie-source.herokuapp.com/)  
  [cookie-sink](https://cookie-sink.herokuapp.com/)

However, to see the data logged in the console, you can run the demo locally, using:
```bash
npm start
```
This will start the cookie-source server at https://localhost:5000 and the local-sink server at http://127.0.0.1:3000. You can then watch the output in the Console as you visit each site in your browser.

It might look something like this:

## First visit to http://127.0.0.1:3000/ (no cookies set yet)
```bash

======
Request for http://127.0.0.1:3000/
request.cookies: [Object: null prototype] {}
======

******
Request for
  https://localhost:5000/images/web_beacon.png
from
  http://127.0.0.1:3000/
at 20:47:49 on 2022-04-30
******
request.cookies: [Object: null prototype] {}
Sending cookies for: "/images/web_beacon.png"
cookieArray: [
  'key=STRICT: set at 20:47:49 on 2022-04-30; Path=/; SameSite=Strict',
  'property=LAX: set at 20:47:49 on 2022-04-30; Path=/; SameSite=Lax',
  'source=NONE: localhost set at 20:47:49 on 2022-04-30; Path=/; Secure; SameSite=None',
  'referer=NONE: http://127.0.0.1:3000/ set at 20:47:49 on 2022-04-30; Path=/; Secure; SameSite=None',
  '24-hours=NONE: from 20:47:49 on 2022-04-30 ; Path=/; Expires=Sun, 01 May 2022 17:47:49 GMT; Secure; SameSite=None',
  'secret=NONE + httpOnly set at 20:47:49 on 2022-04-30; Path=/; HttpOnly; Secure; SameSite=None'
]
******
```

## Subsequent visits to http://127.0.0.1:3000/
```bash
======
Request for http://127.0.0.1:3000/
request.cookies: [Object: null prototype] {}
======

******
Request for
  https://localhost:5000/images/web_beacon.png
from
  http://127.0.0.1:3000/
at 20:49:11 on 2022-04-30
******
request.cookies: {
  source: 'NONE: localhost set at 20:47:49 on 2022-04-30',
  referer: 'NONE: http://127.0.0.1:3000/ set at 20:47:49 on 2022-04-30',
  '24-hours': 'NONE: from 20:47:49 on 2022-04-30 ',
  secret: 'NONE + httpOnly set at 20:47:49 on 2022-04-30'
}
Sending cookies for: "/images/web_beacon.png"
cookieArray: [
  'key=STRICT: set at 20:49:11 on 2022-04-30; Path=/; SameSite=Strict',
  'property=LAX: set at 20:49:11 on 2022-04-30; Path=/; SameSite=Lax',
  'source=NONE: localhost set at 20:49:11 on 2022-04-30; Path=/; Secure; SameSite=None',
  'referer=NONE: http://127.0.0.1:3000/ set at 20:49:11 on 2022-04-30; Path=/; Secure; SameSite=None',
  '24-hours=NONE: from 20:49:11 on 2022-04-30 ; Path=/; Expires=Sun, 01 May 2022 17:49:11 GMT; Secure; SameSite=None',
  'secret=NONE + httpOnly set at 20:49:11 on 2022-04-30; Path=/; HttpOnly; Secure; SameSite=None'
]
******
```

> Note that the server at http://127.0.0.1:3000/ sets no cookies, but the third-party server both sets and receives cookies with the SameSite `none` policy when you visit http://127.0.0.1:3000/.


## First visit to https://localhost:5000/
```bash
******
Request for
  https://localhost:5000/
from
  http://127.0.0.1:3000/
at 20:51:04 on 2022-04-30
******
No cookies for "/"
******
Request for
  https://localhost:5000/images/web_beacon.png
from
  https://localhost:5000/
at 20:51:04 on 2022-04-30
******
request.cookies: [Object: null prototype] {}
Sending cookies for: "/images/web_beacon.png"
cookieArray: [
  'key=STRICT: set at 20:51:04 on 2022-04-30; Path=/; SameSite=Strict',
  'property=LAX: set at 20:51:04 on 2022-04-30; Path=/; SameSite=Lax',
  'source=NONE: localhost set at 20:51:04 on 2022-04-30; Path=/; Secure; SameSite=None',
  'referer=NONE: https://localhost:5000/ set at 20:51:04 on 2022-04-30; Path=/; Secure; SameSite=None',
  '24-hours=NONE: from 20:51:04 on 2022-04-30 ; Path=/; Expires=Sun, 01 May 2022 17:51:04 GMT; Secure; SameSite=None',
  'secret=NONE + httpOnly set at 20:51:04 on 2022-04-30; Path=/; HttpOnly; Secure; SameSite=None'
]
******
```
> Note that on this first visit, even though the referer is http://127.0.0.1:3000/, where cookies with the both the `lax` and `none` SameSite policies have been set, no cookies are sent from the browser to the server.

## Subsequent visits to https://localhost:5000/
```bash
******
Request for
  https://localhost:5000/
from
  http://127.0.0.1:3000/
at 20:55:22 on 2022-04-30
******
No cookies for "/"
******
Request for
  https://localhost:5000/images/web_beacon.png
from
  https://localhost:5000/
at 20:55:22 on 2022-04-30
******
request.cookies: {
  key: 'STRICT: set at 20:51:04 on 2022-04-30',
  property: 'LAX: set at 20:51:04 on 2022-04-30',
  source: 'NONE: localhost set at 20:51:04 on 2022-04-30',
  referer: 'NONE: https://localhost:5000/ set at 20:51:04 on 2022-04-30',
  '24-hours': 'NONE: from 20:51:04 on 2022-04-30 ',
  secret: 'NONE + httpOnly set at 20:51:04 on 2022-04-30'
}
Sending cookies for: "/images/web_beacon.png"
cookieArray: [
  'key=STRICT: set at 20:55:22 on 2022-04-30; Path=/; SameSite=Strict',
  'property=LAX: set at 20:55:22 on 2022-04-30; Path=/; SameSite=Lax',
  'source=NONE: localhost set at 20:55:22 on 2022-04-30; Path=/; Secure; SameSite=None',
  'referer=NONE: https://localhost:5000/ set at 20:55:22 on 2022-04-30; Path=/; Secure; SameSite=None',
  '24-hours=NONE: from 20:55:22 on 2022-04-30 ; Path=/; Expires=Sun, 01 May 2022 17:55:22 GMT; Secure; SameSite=None',
  'secret=NONE + httpOnly set at 20:55:22 on 2022-04-30; Path=/; HttpOnly; Secure; SameSite=None'
]
******
```

