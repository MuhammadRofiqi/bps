const routes = require("express").Router();


routes.use("/v1/user", require("./userroutes"));

module.exports = routes;