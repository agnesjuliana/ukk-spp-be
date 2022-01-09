const { verifyToken } = require("../auth/jwt_auth_helper");
const modules = require("../modules/kelas/module_kelas");

const routes = async (server) => {
  server.put("/v1/kelas/:id", verifyToken,  modules.updateKelas)
  server.delete("/v1/kelas/:id", verifyToken,  modules.deleteKelas)
  server.get("/v1/kelas/:id", verifyToken,  modules.findOKelas)
  server.get("/v1/kelas", verifyToken,  modules.findAKelas)
  server.post("/v1/kelas", verifyToken,  modules.insertKelas)

}


module.exports = {routes}