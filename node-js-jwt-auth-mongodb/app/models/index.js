const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db = {};


db.mongoose = mongoose;
db.url = dbConfig.url;

db.users = require("./user.model")(mongoose, mongoosePaginate);
db.clients = require("./client.model")(mongoose, mongoosePaginate);
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;