const { verifyToken } = require("../auth/jwt_auth_helper");
const modules = require("../modules/pembayaran/module_pembayaran");

const routes = async (server) => {
  server.put("/v1/pembayaran/:id", verifyToken,  modules.updatePembayaran)
  server.delete("/v1/pembayaran/:id", verifyToken,  modules.deletePembayaran)
  server.get("/v1/pembayaran/:id", verifyToken,  modules.findOPembayaran)
  server.get("/v1/pembayaran", verifyToken,  modules.findAPembayaran)
  server.post("/v1/pembayaran/getBulan", verifyToken,  modules.getBulan)
  server.post("/v1/pembayaran/getTunggakan", verifyToken,  modules.getTunggakan)
  server.post("/v1/pembayaran/byParam", verifyToken,  modules.findPembayaranByP)
  server.post("/v1/pembayaran", verifyToken,  modules.insertPembayaran)

}


module.exports = {routes}