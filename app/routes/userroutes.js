const routes = require("express").Router();
const controller = require("../controllers/usercontrollers");

routes.post("/register", controller.register);


module.exports = routes;