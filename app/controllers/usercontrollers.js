const db = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = require("../validations/auth/registerval");



module.exports = class UserController {
  static async getDetail(req, res) {
    try {
      const user = await db("users AS u")
      .leftJoin("stores AS s", "s.id", "u.store_id")
      .select("u.id AS id_user", "u.name", "u.email", "u.avatar", "u.created_at", "u.updated_at", "s.id AS id_store", "s.name AS name_store", "s.address", "s.avatar AS store_avatar", "s.created_at AS createdAt", "s.updated_at AS updatedAt")
      .where({ "u.id": req.user.id })
      .first();
      // return console.log(user);

      const avatar_user  = await minio.presignedUrl("GET", "tokopedia-bucket", user.avatar);

      return res.json({
        success: true,
        message: "data user successfully retrieved",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: avatar_user,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      })
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }

  static async register(req, res) {
    try {
      // check and retrieve request
      const { value, error } = register.validate(req.body);
      if (error) {
        return res.boom.badData(error.message);
      }

      // check availabality user
      const user = await db("users").where({ email: value.email }).first();
      if (user) {
        return res.boom.badRequest("email already registered");
      }

      const id = require("crypto").randomUUID();

      await db.transaction(async function(trx) {
        await db("users")
          .insert({
            id,
            name: value.name,
            email: value.email,
            password: bcrypt.hashSync(value.password, 10)
          })
          .transacting(trx);
      });

      return res.status(201).json({
        success: true,
        message: "user successfully registered"
      });
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }

  static async login(req, res) {
    try {
      // check error and retrieve request
      const { error, value } = login.validate(req.body);
      if (error) {
        return res.boom.badData(error.message);
      }

      // check user
      const user = await db("users").where({ email: value.email }).first();
      if (!user) {
        return res.boom.unauthorized("wrong email, please check again !!");
      }
      
      // check password
      if (!bcrypt.compareSync(value.password, user.password)) {
        return res.boom.unauthorized("wrong password, please check again !!");
      }

      const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED_TIME });

      return res.json({
        success: true,
        message: "user successfully logged in",
        token: "Bearer ".concat(token)
      });
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }


};