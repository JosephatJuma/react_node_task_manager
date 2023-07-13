const Register = require("../models/register");
const createHash = require("../middleware/createPasswordHash");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const password = await createHash(req.body.password);
  const { name, email } = req.body;
  try {
    const userExists = await Register.find({ email: email });
    if (userExists.length > 0) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const newUser = new Register({ name, email, password });
    await newUser.save();
    res.status(200).send({
      message: "User registration successful",
      success: true,
      user: newUser,
    });
  } catch (error) {
    res
      .status(200)
      .send({ message: "Unexpected error occurred!", success: false });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Register.findOne({ email: email });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      res.status(200).send({ message: "Wrong Password!", success: false });
    } else {
      res
        .status(200)
        .send({ message: "Login successfull!", success: true, user: user });
    }
  } else {
    res.status(200).send({ message: "Wrong Email Provided!", success: false });
  }
};
