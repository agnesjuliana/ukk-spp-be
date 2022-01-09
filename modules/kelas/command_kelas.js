const { error } = require("../../utils/wrapper");
const models = require('../../models/index.js')
const kelas = models.kelas

// query
const findOneKelas = async (param) => {
  try{
    return await kelas.findOne({where:param})
  }catch(err){
    return error(err, 'findOneKelas', 500)
  }
}

const findAllKelas = async (param) => {
  try{
    return await kelas.findAll()
  }catch(err){
    return error(err, 'findOneKelas', 500)
  }
}


// command
const insertOneKelas = async(data) => {
  try{
    return await kelas.create(data)
  }catch(err){
    console.log(err)
    return error(err, 'insertOneKelas', 500)
  }
}

const updateOneKelas = async (data, param) => {
  try{
    return await kelas.update(data, {where:param})
  }catch(err){
    console.log(err)
    return error(err, 'updateOneKelas', 500)
  }
}

const deleteOneKelas = async (param) => {
  try{
    return await kelas.destroy({where:param})
  }catch(err){
    console.log(err)
    return error(err, 'deleteOneKelas', 500)
  }
}

module.exports = {
  findOneKelas,
  findAllKelas,
  insertOneKelas,
  updateOneKelas,
  deleteOneKelas
}