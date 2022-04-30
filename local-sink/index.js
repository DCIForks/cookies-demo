/**
 * Local-Sink is a simple Express server which delivers a page
 * containing an image from a site at https://localhost:5000
 * that sets cross-site cookies.
 *
 * This server does not set any cookies itself, so `document.cookie`
 * will always be an empty object.
 *
 * Testing Locally
 * ———————————————
 * You can serve the page locally using
 *
 *   npm start # from the local-sink directory
 * OR
 *   npm run start:local # from the parent directory
 *
 * Viewing Cookies
 * ———————————————
 * When you visit the page, use the Developer Tools Inspector to
 * view the cookies that have been set for third-party domains:
 *
 * Chrome: Dev Tools > Application > Storage > Cookies
 * Firefox: Dev Tools > Storage > Cookies
 */

require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const DEFAULT_PORT = "3000"
const PORT = process.env.PORT || DEFAULT_PORT

app.listen(PORT, () => {
  console.log(
    `Ctrl-click to visit local site at http://127.0.0.1:${PORT}`
  )
})

// Log all cookies set by this server. This server sets no cookies,
// so the output should be an empty object.
const showCookies = (request, response, next) => {
  const url = request.originalUrl;
  const protocol = request.protocol;
  const host = request.headers.host;

  console.log(`======
Request for ${protocol}://${host}${url}`);

  console.log("request.cookies:", request.cookies);
  console.log("======\n")
  next()
}

app.use(cookieParser())
app.get("*", showCookies)

// Deliver the requested page, if it exists in the public
// directory
app.use(express.static('public'))

// Send a 404 (Not Found) response for all other routes
app.all("*", (request, response) => {
  response.sendStatus(404)
})