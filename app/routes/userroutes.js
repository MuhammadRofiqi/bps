const routes = require("express").Router();
const controller = require("../controllers/usercontrollers");
const auth = require("../middlewares/authorize");

routes.get("/info", auth, controller.getDetail);
routes.post("/register", controller.register);
routes.post("/login", controller.login);


module.exports = routes;