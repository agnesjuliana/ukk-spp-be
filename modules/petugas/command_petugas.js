const { error } = require("../../utils/wrapper");
const models = require('../../models/index.js')
const petugas = models.petugas

// query
const findOnePetugas = async (param) => {
  try{
    return await petugas.findOne({where:param})
  }catch(err){
    return error(err, 'findOnePetugas', 500)
  }
}

const findAllPetugas = async (param) => {
  try{
    return await petugas.findAll()
  }catch(err){
    return error(err, 'findOnePetugas', 500)
  }
}


// command
const insertOnePetugas = async(data) => {
  try{
    return await petugas.create(data)
  }catch(err){
    console.log(err)
    return error(err, 'insertOnePetugas', 500)
  }
}

const updateOnePetugas = async (data, param) => {
  try{
    return await petugas.update(data, {where:param})
  }catch(err){
    console.log(err)
    return error(err, 'updateOnePetugas', 500)
  }
}

const deleteOnePetugas = async (param) => {
  try{
    return await petugas.destroy({where:param})
  }catch(err){
    console.log(err)
    return error(err, 'deleteOnePetugas', 500)
  }
}

module.exports = {
  findOnePetugas,
  findAllPetugas,
  insertOnePetugas,
  updateOnePetugas,
  deleteOnePetugas
}