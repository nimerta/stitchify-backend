const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { error, log } = require("console");

const signUpUser = async (req, res) => {
  try {
    var { email, password, gender, address, phone_no, image, full_name } =
      req.body;

    if (
      !email ||
      email === "" ||
      !password ||
      password === "" ||
      !gender ||
      gender === "" ||
      !address ||
      address === "" ||
      !phone_no ||
      phone_no === "" ||
      !full_name ||
      full_name === ""
    ) {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log(err);
          } else {
            const user = new User({
              email_address: email,
              full_name: full_name,
              password: hash,
              phone_no: phone_no,
              gender: gender,
              address: address,
            });
            let savedUser = await user
              .save()
              .then((resp) => {
                console.log(resp);
                res.status(201).json({
                  status: "201",
                  message: "New user registered!",
                  savedUser: resp,
                });
              })

              .catch((error) => {
                console.log(error);
                var responseData = {
                  status: "422",
                  errors: error,
                };
                res.status(422).json(responseData);
              });

            console.log(hash);
          }
        });
      });
    }
  } catch (error) {
    res.json({
      message: "Internal server error!",
      status: "500",
      error,
    });
  }
};

const signInUser = async (req, res) => {
  try {
    var { email, password } = req.body;

    if (!email || email === "" || !password || password === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log(err);
          } else {
            var singleUser = await User.find({
              email_address: email,
            });

            try {
              if (singleUser && singleUser.length === 0) {
                var responseData = {
                  message:
                    "Invalid username or password! No user found for given email address and password.",
                  status: "404",
                  singleUser: singleUser[0],
                };

                res.status(404).json(responseData);
              } else {
                bcrypt.compare(
                  password,
                  singleUser[0].password,
                  function (err, result) {
                    if (result) {
                      var responseData = {
                        status: "200",
                        message: "Login Successful!",
                        email_address: singleUser[0].email_address,
                        singleUser: singleUser[0],
                      };
                      res.json(responseData);
                    } else {
                      console.log("error: ", err);
                      var responseData = {
                        message:
                          "Invalid username or password! No user found for given email address and password.",
                        status: "404",
                      };

                      res.status(404).json(responseData);
                      //   res.send(err);
                    }
                  }
                );
              }
            } catch (error) {
              res.status(500).json(error);
              console.log(error);
            }
          }
        });
      });
    }
  } catch (error) {
    res.json({
      message: "Internal server error!",
      status: "500",
      error,
    });
  }
};

module.exports = {
  signUpUser,
  signInUser,
};
