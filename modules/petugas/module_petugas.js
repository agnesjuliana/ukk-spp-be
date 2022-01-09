const aes = require('aes256')
const { response } = require('../../utils/wrapper.js')
const { findOnePetugas, insertOnePetugas, updateOnePetugas, deleteOnePetugas, findAllPetugas } = require('./command_petugas.js')
const { generateToken } = require('../../auth/jwt_auth_helper.js')
const AES_KEY = "secretaes"


const login = async (req, res) => {
  try {
    const payload = req.body

    const findUser = await findOnePetugas({ username: payload.username })
    if (!findUser) {
      return response(res, null, 'user not found', 404)
    }

    const user = findUser.dataValues
    const decrypt = aes.decrypt(AES_KEY, user.password)

    if (payload.password != decrypt) {
      return response(res, null, 'invalid password', 400)
    }

    const payloadJWT = {
      id: user.id_petugas,
      username: user.username,
      role: user.level
    }

    const jwtToken = await generateToken(payloadJWT)

    const customPayload = {
      username: user.username,
      token: jwtToken
    }

    return response(res, customPayload, 'Login Success', 200)

  } catch (error) {
    return response(res, error, 'login failed', 500)
  }
}

const register = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const payload = req.body
    const encrypt = aes.encrypt(AES_KEY, payload.password)
    payload.password = encrypt

    const exist = await findOnePetugas({ username: payload.username })
    if (exist) {
      return response(res, null, 'username already exist', 409)
    }

    const result = await insertOnePetugas(payload)
    if (result.err) {
      return response(res, null, 'failed insert data', 500)
    }

    const customPayload = {
      username: payload.username,
      nama: payload.nama_petugas
    }

    return response(res, customPayload, 'Registration Success', 201)
  } catch (error) {
    return response(res, error, 'register failed', 500)
  }
}

const updatePetugas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_petugas: req.params.id }
    const payload = req.body
    const encrypt = aes.encrypt(AES_KEY, payload.password)
    payload.password = encrypt


    const result = await updateOnePetugas(payload, param)
    if (result.err) {
      return response(res, null, 'failed update data', 500)
    }

    return response(res, null, 'Data successfully updated', 200)

  } catch (error) {
    return response(res, error, 'update petugas failed', 500)
  }
}

const deletePetugas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_petugas: req.params.id }

    const result = await deleteOnePetugas(param)
    if (result.err) {
      return response(res, null, 'failed delete data', 500)
    }

    return response(res, null, 'Data successfully deleted', 200)

    
  } catch (error) {
    return response(res, error, 'update petugas failed', 500)
  }
}

const findAPetugas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const result = await findAllPetugas()
    if (result.err) {
      return response(res, null, 'failed find all data petugas', 500)
    }

    return response(res, result, 'Data Found', 200)
    
  } catch (error) {
    return response(res, error, 'failed find all data petugas', 500)
  }
}

const findOPetugas = async (req, res) => {
  try {
    // verify auth 
    const { role } = req.user
    if (role != 'admin') {
      return response(res, null, `you don't have privilege`, 403)
    }

    const param = { id_petugas: req.params.id }

    const result = await findOnePetugas(param)
    if (result.err) {
      return response(res, null, 'failed find data petugas', 500)
    }

    return response(res, result, 'Data Found', 200)

    
  } catch (error) {
    return response(res, error, 'failed find data petugas', 500)
  }
}



module.exports = {
  login,
  register,
  updatePetugas,
  deletePetugas,
  findAPetugas,
  findOPetugas
}