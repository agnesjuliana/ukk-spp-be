const { response } = require('../../utils/wrapper.js')
const { findOneKelas, insertOneKelas, updateOneKelas, deleteOneKelas, findAllKelas } = require('./command_kelas.js')

const insertKelas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const payload = req.body

    const result = await insertOneKelas(payload)
    if (result.err) {
      return response(res, null, 'failed insert data', 500)
    }

    return response(res, null, 'Success insert data Kelas', 201)
  } catch (error) {
    return response(res, error, 'Failed insert data Kelas', 500)
  }
}

const updateKelas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_kelas: req.params.id }
    const payload = req.body


    const result = await updateOneKelas(payload, param)
    if (result.err) {
      return response(res, null, 'failed update data', 500)
    }

    return response(res, null, 'Data successfully updated', 200)

  } catch (error) {
    return response(res, error, 'update Kelas failed', 500)
  }
}

const deleteKelas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_kelas: req.params.id }

    const result = await deleteOneKelas(param)
    if (result.err) {
      return response(res, null, 'failed delete data', 500)
    }

    return response(res, null, 'Data successfully deleted', 200)

    
  } catch (error) {
    return response(res, error, 'update Kelas failed', 500)
  }
}

const findAKelas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const result = await findAllKelas()
    if (result.err) {
      return response(res, null, 'failed find all data Kelas', 500)
    }

    return response(res, result, 'Data Found', 200)
    
  } catch (error) {
    return response(res, error, 'failed find all data Kelas', 500)
  }
}

const findOKelas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_kelas: req.params.id }

    const result = await findOneKelas(param)
    if (result.err) {
      return response(res, null, 'failed find data Kelas', 500)
    }

    return response(res, result, 'Data Found', 200)

    
  } catch (error) {
    return response(res, error, 'failed find data Kelas', 500)
  }
}

module.exports = {
  insertKelas,
  updateKelas,
  deleteKelas,
  findAKelas,
  findOKelas
}