const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  connect: process.env.DATABASE,
};
