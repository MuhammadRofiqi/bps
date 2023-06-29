const routes = require("express").Router();
const controller = require("../controllers/usercontrollers");

routes.get("/info", controller.getDetail);
routes.post("/register", controller.register);
routes.post("/login", controller.login);


module.exports = routes;