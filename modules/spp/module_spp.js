const { response } = require('../../utils/wrapper.js')
const { findOneSpp, insertOneSpp, updateOneSpp, deleteOneSpp, findAllSpp } = require('./command_spp.js')

const insertSpp = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const payload = req.body

    const result = await insertOneSpp(payload)
    if (result.err) {
      return response(res, null, 'failed insert data', 500)
    }

    return response(res, null, 'Success insert data spp', 201)
  } catch (error) {
    return response(res, error, 'Failed insert data spp', 500)
  }
}

const updateSpp = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_spp: req.params.id }
    const payload = req.body


    const result = await updateOneSpp(payload, param)
    if (result.err) {
      return response(res, null, 'failed update data', 500)
    }

    return response(res, null, 'Data successfully updated', 200)

  } catch (error) {
    return response(res, error, 'update Spp failed', 500)
  }
}

const deleteSpp = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_spp: req.params.id }

    const result = await deleteOneSpp(param)
    if (result.err) {
      return response(res, null, 'failed delete data', 500)
    }

    return response(res, null, 'Data successfully deleted', 200)

    
  } catch (error) {
    return response(res, error, 'update Spp failed', 500)
  }
}

const findASpp = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const result = await findAllSpp()
    if (result.err) {
      return response(res, null, 'failed find all data Spp', 500)
    }

    return response(res, result, 'Data Found', 200)
    
  } catch (error) {
    return response(res, error, 'failed find all data Spp', 500)
  }
}

const findOSpp = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_spp: req.params.id }

    const result = await findOneSpp(param)
    if (result.err) {
      return response(res, null, 'failed find data Spp', 500)
    }

    return response(res, result, 'Data Found', 200)

    
  } catch (error) {
    return response(res, error, 'failed find data Spp', 500)
  }
}

module.exports = {
  insertSpp,
  updateSpp,
  deleteSpp,
  findASpp,
  findOSpp
}