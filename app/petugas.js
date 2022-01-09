const { verifyToken } = require("../auth/jwt_auth_helper");
const modules = require("../modules/petugas/module_petugas");

const routes = async (server) => {
  server.post("/v1/petugas/login",  modules.login)
  server.post("/v1/petugas/register", verifyToken,  modules.register)
  server.put("/v1/petugas/:id", verifyToken,  modules.updatePetugas)
  server.delete("/v1/petugas/:id", verifyToken,  modules.deletePetugas)
  server.get("/v1/petugas/:id", verifyToken,  modules.findOPetugas)
  server.get("/v1/petugas", verifyToken,  modules.findAPetugas)
}


module.exports = {routes}