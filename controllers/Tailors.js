const bcrypt = require("bcryptjs");

const Tailor = require("../models/Tailor");
const Design = require("../models/Design");

const tailorSignIn = async (req, res) => {
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
            var singleUser = await Tailor.find({
              email_address: email,
            }).populate({
              path: "custom_orders",

              populate: [
                {
                  path: "user",
                },
                {
                  path: "order_area",
                },
                {
                  path: "address",
                },
              ],
            });

            try {
              if (singleUser && singleUser.length === 0) {
                var responseData = {
                  message:
                    "Invalid username or password! No user found for given email address and password.",
                  status: "404",
                  singleTailor: singleUser[0],
                };

                res.json(responseData);
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
                        singleTailor: singleUser[0],
                      };
                      res.json(responseData);
                    } else {
                      console.log("error: ", err);
                      var responseData = {
                        message:
                          "Invalid username or password! No user found for given email address and password.",
                        status: "404",
                      };

                      res.json(responseData);
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

const tailorSignUp = async (req, res) => {
  try {
    var {
      email,
      password,
      gender,
      address,
      phone_no,
      image,
      full_name,
      main_area,
      city,
    } = req.body;

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
            const tailor = new Tailor({
              email_address: email,
              full_name: full_name,
              password: hash,
              phone_no: phone_no,
              gender: gender,
              address: address,
              main_area: main_area,
              city: city,
            });
            let savedTailor = await tailor
              .save()
              .then((resp) => {
                console.log(resp);
                res.json({
                  status: "201",
                  message: "New tailor registered!",
                  savedTailor: resp,
                });
              })

              .catch((error) => {
                console.log(error);
                var responseData = {
                  status: "422",
                  errors: error,
                };
                res.json(responseData);
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

const getTailorDesigns = async (req, res) => {
  try {
    var tailor_id = req.params.tailor_id;

    if (!tailor_id || tailor_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var designsOfTailor = await Design.find({
        tailor: tailor_id,
      })
        .then(async (onTailorDesignsFound) => {
          console.log("on tailor designs found: ", onTailorDesignsFound);

          res.json({
            message: "Tailor designs found!",
            status: "200",
            tailorDesigns: onTailorDesignsFound,
          });
        })
        .catch(async (onTailorDesignsFoundError) => {
          console.log(
            "on tailor designs found error: ",
            onTailorDesignsFoundError
          );
          res.json({
            message: "Something went wrong while getting your designs!",
            status: "400",
            error: onTailorDesignsFoundError,
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

const getTailor = async (req, res) => {
  try {
    var tailor_id = req.params.tailor_id;

    if (!tailor_id || tailor_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var user = await Tailor.findById(tailor_id)
        .then((onUserFound) => {
          console.log("on user found: ", onUserFound);

          res.json({
            message: "User found!",
            status: "200",
            user: onUserFound,
          });
        })
        .catch((onUserFoundError) => {
          console.log("on user found error: ", onUserFoundError);
          res.json({
            message: "User not found!",
            status: "404",
            error: onUserFoundError,
          });
        });
    }
  } catch (error) {
    res.json({
      status: "500",
      message: "Internal Server Error",
      error,
    });
  }
};
module.exports = {
  tailorSignIn,
  tailorSignUp,
  getTailorDesigns,
  getTailor,
};
