const express = require('express')
const cors = require('cors')

const petugas = require('./petugas')
const spp = require('./spp')
const kelas = require('./kelas')
const siswa = require('./siswa')
const pembayaran = require('./pembayaran')

const { response } = require('../utils/wrapper')

class AppServer {
  constructor() {
    this.server = express()
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(express.urlencoded({ limit: "2mb", extended: false, }));

    petugas.routes(this.server)
    spp.routes(this.server)
    kelas.routes(this.server)
    siswa.routes(this.server)
    pembayaran.routes(this.server)


    this.server.get('/', (req, res) =>{
      return response(res, null, `SERVER READY`, 200)
    })
    
    this.server.use("*", (req, res) => {
      return response(res, null, `NOT FOUND`, 404)
    });
  }
}

module.exports = AppServer