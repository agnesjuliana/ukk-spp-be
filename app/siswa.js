const { verifyToken } = require("../auth/jwt_auth_helper");
const modules = require("../modules/siswa/module_siswa");

const routes = async (server) => {
  server.put("/v1/siswa/:id", verifyToken,  modules.updateSiswa)
  server.delete("/v1/siswa/:id", verifyToken,  modules.deleteSiswa)
  server.get("/v1/siswa/:id", verifyToken,  modules.findOSiswa)
  server.get("/v1/siswa", verifyToken,  modules.findASiswa)
  server.post("/v1/siswa", verifyToken,  modules.insertSiswa)

}


module.exports = {routes}