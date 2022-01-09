const { error } = require("../../utils/wrapper");
const models = require('../../models/index.js')
const siswa = models.siswa

// query
const findOneSiswa = async (param) => {
  try{
    return await siswa.findOne({where:param, include:['kelas','spp']})
  }catch(err){
    return error(err, 'findOneSiswa', 500)
  }
}

const findAllSiswa = async (param) => {
  try{
    return await siswa.findAll({include:['kelas','spp']})
  }catch(err){
    return error(err, 'findOneSiswa', 500)
  }
}


// command
const insertOneSiswa = async(data) => {
  try{
    return await siswa.create(data)
  }catch(err){
    console.log(err)
    return error(err, 'insertOneSiswa', 500)
  }
}

const updateOneSiswa = async (data, param) => {
  try{
    return await siswa.update(data, {where:param})
  }catch(err){
    console.log(err)
    return error(err, 'updateOneSiswa', 500)
  }
}

const deleteOneSiswa = async (param) => {
  try{
    return await siswa.destroy({where:param})
  }catch(err){
    console.log(err)
    return error(err, 'deleteOneSiswa', 500)
  }
}

module.exports = {
  findOneSiswa,
  findAllSiswa,
  insertOneSiswa,
  updateOneSiswa,
  deleteOneSiswa
}