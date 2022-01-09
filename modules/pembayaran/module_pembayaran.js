const { response } = require('../../utils/wrapper.js')
const { findOnePembayaran, insertOnePembayaran, updateOnePembayaran, deleteOnePembayaran, findAllPembayaran, findPembayaranByParam } = require('./command_pembayaran.js')
const { unpaidMonth } = require('./utils_pembayaran.js')

const insertPembayaran = async (req, res) => {
  try {
    // verify auth 
    const { role, id } = req.user
    if (role != 'admin' && role != 'petugas') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const payload = req.body
    payload.id_petugas = id
    payload.tgl_bayar = new Date()


    const exist = await findOnePembayaran({ nisn: payload.nisn, tahun_spp: payload.tahun_spp, bulan_spp: payload.bulan_spp })
    if (exist) {
      return response(res, null, 'already payed', 409)
    }

    const result = await insertOnePembayaran(payload)
    if (result.err) {
      return response(res, null, 'failed insert data', 500)
    }

    return response(res, result, 'Success insert data Pembayaran', 201)
  } catch (error) {
    return response(res, error, 'Failed insert data Pembayaran', 500)
  }
}

const updatePembayaran = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin' && role != 'petugas') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_pembayaran: req.params.id }
    const payload = req.body

    const exist = await findOnePembayaran({ nisn: payload.nisn, tahun_spp: payload.tahun_spp, bulan_spp: payload.bulan_spp })
    if (exist) {
      return response(res, null, 'already payed', 409)
    }


    const result = await updateOnePembayaran(payload, param)
    if (result.err) {
      return response(res, null, 'failed update data', 500)
    }

    return response(res, null, 'Data successfully updated', 200)

  } catch (error) {
    return response(res, error, 'update Pembayaran failed', 500)
  }
}

const deletePembayaran = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin' && role != 'petugas') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_pembayaran: req.params.id }

    const result = await deleteOnePembayaran(param)
    if (result.err) {
      return response(res, null, 'failed delete data', 500)
    }

    return response(res, null, 'Data successfully deleted', 200)


  } catch (error) {
    return response(res, error, 'update Pembayaran failed', 500)
  }
}

const findAPembayaran = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin' && role != 'petugas') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const result = await findAllPembayaran()
    if (result.err) {
      return response(res, null, 'failed find all data Pembayaran', 500)
    }

    return response(res, result, 'Data Found', 200)

  } catch (error) {
    return response(res, error, 'failed find all data Pembayaran', 500)
  }
}

const findOPembayaran = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin' && role != 'petugas') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_pembayaran: req.params.id }

    const result = await findOnePembayaran(param)
    if (result.err) {
      return response(res, null, 'failed find data Pembayaran', 500)
    }

    return response(res, result, 'Data Found', 200)


  } catch (error) {
    return response(res, error, 'failed find data Pembayaran', 500)
  }
}

const findPembayaranByP = async (req, res) => {
  try {
    const param = req.body

    const result = await findPembayaranByParam(param)
    if (result.err) {
      return response(res, null, 'history not found', 404)
    }

    return response(res, result, 'Data Found', 200)


  } catch (error) {
    return response(res, error, 'failed find data Pembayaran', 500)
  }
}

const getBulan = async (req, res) => {
  try {
    const param = req.body

    const listBulan = [
      { id: 1, bulan: "Juli", tahun: param.tahun_spp[0], paid: false },
      { id: 2, bulan: "Agustus", tahun: param.tahun_spp[0], paid: false },
      { id: 3, bulan: "September", tahun: param.tahun_spp[0], paid: false },
      { id: 4, bulan: "Oktober", tahun: param.tahun_spp[0], paid: false },
      { id: 5, bulan: "November", tahun: param.tahun_spp[0], paid: false },
      { id: 6, bulan: "Desember", tahun: param.tahun_spp[0], paid: false },
      { id: 7, bulan: "Januari", tahun: param.tahun_spp[1], paid: false },
      { id: 8, bulan: "Februari", tahun: param.tahun_spp[1], paid: false },
      { id: 9, bulan: "Maret", tahun: param.tahun_spp[1], paid: false },
      { id: 10, bulan: "April", tahun: param.tahun_spp[1], paid: false },
      { id: 11, bulan: "Mei", tahun: param.tahun_spp[1], paid: false },
      { id: 12, bulan: "Juni", tahun: param.tahun_spp[1], paid: false },
    ]


    const result = await findPembayaranByParam(param)
    if (result.err) {
      return response(res, null, 'history not found', 404)
    }


    result.map((item, i) => {
      const data = {
        id: item.bulan_spp,
        tahun: item.tahun_spp
      }

      if (data.id <= 6 && data.tahun == param.tahun_spp[1]) {
        listBulan[data.id + 5].paid = true
      }

      if (data.id > 6 && data.tahun == param.tahun_spp[0]) {
        listBulan[data.id - 7].paid = true
      }
    })

    listBulan.map((item) => {
      if (item.paid == true) {
        let i = listBulan.map(function (item) { return item; }).indexOf(item)
        listBulan.splice(i, 1);
      }
    })

    return response(res, listBulan, 'Data Found', 200)


  } catch (error) {
    return response(res, error, 'failed find data Pembayaran', 500)
  }
}

const getTunggakan = async (req, res) => {
  try {
    const param = req.body

    const result = await findPembayaranByParam(param)
    if (result.err) {
      return response(res, null, 'history not found', 404)
    }

    const listBulan = unpaidMonth(param, result)

    const nominal = result[0].siswa.spp.nominal

    let date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let tunggakan = 0
    listBulan.map((item, i) => {
      if (item.id == month && item.tahun == year) {
        listBulan.length = i +1
        tunggakan = (i+1) * nominal
      }
    })

    return response(res, tunggakan, 'Data Found', 200)


  } catch (error) {
    return response(res, error, 'failed find data Pembayaran', 500)
  }
}

module.exports = {
  insertPembayaran,
  updatePembayaran,
  deletePembayaran,
  findAPembayaran,
  findOPembayaran,
  findPembayaranByP,
  getBulan,
  getTunggakan
}