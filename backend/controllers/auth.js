const Register = require("../models/register");
const createHash = require("../middleware/createPasswordHash");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  const password = await createHash(req.body.password);
  const { first_name, last_name, email } = req.body;
  try {
    const User = new Register({ first_name, last_name, email, password });
    User.save()
      .then(() => {
        res.send("User registeration successfull");
      })
      .catch((err) => {
        res.status(500).send("Unexpected error occured!");
      });
  } catch (error) {
    res.status(500).send("Unexpected error occured!");
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
      //req.session.user = user;
      res
        .status(200)
        .send({ message: "Login successfull!", success: true, user: user });
    }
  } else {
    res.status(200).send({ message: "Wrong Email Provided!", success: false });
  }
};
