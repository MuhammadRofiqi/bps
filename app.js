require("dotenv").config();
const express = require("express");
const boom = require("express-boom");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(boom());
app.use(require("./app/routes"));



app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}.`));