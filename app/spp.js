const { verifyToken } = require("../auth/jwt_auth_helper");
const modules = require("../modules/spp/module_spp");

const routes = async (server) => {
  server.put("/v1/spp/:id", verifyToken,  modules.updateSpp)
  server.delete("/v1/spp/:id", verifyToken,  modules.deleteSpp)
  server.get("/v1/spp/:id", verifyToken,  modules.findOSpp)
  server.get("/v1/spp", verifyToken,  modules.findASpp)
  server.post("/v1/spp", verifyToken,  modules.insertSpp)

}


module.exports = {routes}