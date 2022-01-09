const { response } = require('../../utils/wrapper.js')
const { findOneSiswa, insertOneSiswa, updateOneSiswa, deleteOneSiswa, findAllSiswa } = require('./command_siswa.js')

const insertSiswa = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const payload = req.body

    const exist = await findOneSiswa({ nisn: payload.nisn })
    if (exist) {
      return response(res, null, 'nisn already exist', 409)
    }

    const result = await insertOneSiswa(payload)
    if (result.err) {
      return response(res, null, 'failed insert data', 500)
    }

    return response(res, null, 'Success insert data Siswa', 201)
  } catch (error) {
    return response(res, error, 'Failed insert data Siswa', 500)
  }
}

const updateSiswa = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { nisn: req.params.id }
    const payload = req.body


    const result = await updateOneSiswa(payload, param)
    if (result.err) {
      return response(res, null, 'failed update data', 500)
    }

    return response(res, null, 'Data successfully updated', 200)

  } catch (error) {
    return response(res, error, 'update Siswa failed', 500)
  }
}

const deleteSiswa = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { nisn: req.params.id }

    const result = await deleteOneSiswa(param)
    if (result.err) {
      return response(res, null, 'failed delete data', 500)
    }

    return response(res, null, 'Data successfully deleted', 200)

    
  } catch (error) {
    return response(res, error, 'update Siswa failed', 500)
  }
}

const findASiswa = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const result = await findAllSiswa()
    if (result.err) {
      return response(res, null, 'failed find all data Siswa', 500)
    }

    return response(res, result, 'Data Found', 200)
    
  } catch (error) {
    return response(res, error, 'failed find all data Siswa', 500)
  }
}

const findOSiswa = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { nisn: req.params.id }

    const result = await findOneSiswa(param)
    if (result.err) {
      return response(res, null, 'failed find data Siswa', 500)
    }

    return response(res, result, 'Data Found', 200)

    
  } catch (error) {
    return response(res, error, 'failed find data Siswa', 500)
  }
}

module.exports = {
  insertSiswa,
  updateSiswa,
  deleteSiswa,
  findASiswa,
  findOSiswa
}