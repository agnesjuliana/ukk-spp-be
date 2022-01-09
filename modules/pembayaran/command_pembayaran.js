const { error } = require("../../utils/wrapper");
const models = require('../../models/index.js')
const pembayaran = models.pembayaran

// query
const findOnePembayaran = async (param) => {
  try{
    return await pembayaran.findOne({where:param, include:['petugas','siswa',{
      model: models.siswa,
      as: "siswa",
      include: ["spp"]
  }]})
  }catch(err){
    return error(err, 'findOnePembayaran', 500)
  }
}

const findAllPembayaran = async () => {
  try{
    return await pembayaran.findAll({include:['petugas','siswa',{
      model: models.siswa,
      as: "siswa",
      include: ["spp"]
  }]})
  }catch(err){
    return error(err, 'findOnePembayaran', 500)
  }
}

const findPembayaranByParam = async (param) => {
  try{
    return await pembayaran.findAll({where:param, include:['petugas','siswa',{
      model: models.siswa,
      as: "siswa",
      include: ["spp"]
  }]})
  }catch(err){
    return error(err, 'findPembayaranByParam', 500)
  }
}



// command
const insertOnePembayaran = async(data) => {
  try{
    return await pembayaran.create(data)
  }catch(err){
    console.log(err)
    return error(err, 'insertOnePembayaran', 500)
  }
}

const updateOnePembayaran = async (data, param) => {
  try{
    return await pembayaran.update(data, {where:param})
  }catch(err){
    console.log(err)
    return error(err, 'updateOnePembayaran', 500)
  }
}

const deleteOnePembayaran = async (param) => {
  try{
    return await pembayaran.destroy({where:param})
  }catch(err){
    console.log(err)
    return error(err, 'deleteOnePembayaran', 500)
  }
}

module.exports = {
  findOnePembayaran,
  findAllPembayaran,
  findPembayaranByParam,
  insertOnePembayaran,
  updateOnePembayaran,
  deleteOnePembayaran
}