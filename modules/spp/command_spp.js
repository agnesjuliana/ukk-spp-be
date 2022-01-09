const { error } = require("../../utils/wrapper");
const models = require('../../models/index.js')
const spp = models.spp

// query
const findOneSpp = async (param) => {
  try{
    return await spp.findOne({where:param})
  }catch(err){
    return error(err, 'findOneSpp', 500)
  }
}

const findAllSpp = async (param) => {
  try{
    return await spp.findAll()
  }catch(err){
    return error(err, 'findOneSpp', 500)
  }
}


// command
const insertOneSpp = async(data) => {
  try{
    return await spp.create(data)
  }catch(err){
    console.log(err)
    return error(err, 'insertOneSpp', 500)
  }
}

const updateOneSpp = async (data, param) => {
  try{
    return await spp.update(data, {where:param})
  }catch(err){
    console.log(err)
    return error(err, 'updateOneSpp', 500)
  }
}

const deleteOneSpp = async (param) => {
  try{
    return await spp.destroy({where:param})
  }catch(err){
    console.log(err)
    return error(err, 'deleteOneSpp', 500)
  }
}

module.exports = {
  findOneSpp,
  findAllSpp,
  insertOneSpp,
  updateOneSpp,
  deleteOneSpp
}