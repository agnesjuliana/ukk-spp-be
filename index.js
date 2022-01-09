const AppServer = require('./app/server')
const appServer = new AppServer()
const port = 5000

appServer.server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// // const express = require('express')
// // const app = express()
// const port = 5000

// appServer.server.listen(port, () => console.log(`Example app listening on port ${port}!`))
