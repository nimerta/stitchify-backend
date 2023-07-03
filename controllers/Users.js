const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Measurement = require("../models/Measurement");
const Design = require("../models/Design");
const Tailor = require("../models/Tailor");

const { isTailorIdAvailable } = require("../utils/Basic");

// const signUpUser = async (req, res) => {
//   try {
//     var { email, password, gender, address, phone_no, image, full_name } =
//       req.body;

//     if (
//       !email ||
//       email === "" ||
//       !password ||
//       password === "" ||
//       !gender ||
//       gender === "" ||
//       !address ||
//       address === "" ||
//       !phone_no ||
//       phone_no === "" ||
//       !full_name ||
//       full_name === ""
//     ) {
//       res.json({
//         message: "Required fields are empty!",
//         status: "400",
//       });
//     } else {
//       bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(password, salt, async function (err, hash) {
//           // Store hash in your password DB.
//           if (err) {
//             console.log(err);
//           } else {
//             const user = new User({
//               email_address: email,
//               full_name: full_name,
//               password: hash,
//               phone_no: phone_no,
//               gender: gender,
//               address: address,
//               cart: [],
//             });
//             let savedUser = await user
//               .save()
//               .then((resp) => {
//                 console.log(resp);
//                 res.status(201).json({
//                   status: "201",
//                   message: "New user registered!",
//                   savedUser: resp,
//                 });
//               })

//               .catch((error) => {
//                 console.log(error);
//                 var responseData = {
//                   status: "422",
//                   errors: error,
//                 };
//                 res.status(422).json(responseData);
//               });

//             console.log(hash);
//           }
//         });
//       });
//     }
//   } catch (error) {
//     res.json({
//       message: "Internal server error!",
//       status: "500",
//       error,
//     });
//   }
// };

const signUpUser = async (req, res) => {
  try {
    const { email, password, gender, address, phone_no, image, full_name } =
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
      // Check if the user with the same email address already exists
      const existingUser = await User.findOne({ email_address: email });
      if (existingUser) {
        res.json({
          message: "User with this email address already exists!",
          status: "409",
        });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
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
                cart: [],
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

const submitMeasurement = async (req, res) => {
  try {
    var user_id = req.params.user_id;

    var {
      bust,
      waist,
      shoulder,
      sleeve_length,
      shirt_length,
      shirt_bottom,
      hip,
      trouser_length,
      trouser_waist,
      trouser_hip,
      trouser_rise,
      inseam,
      thigh,
      leg_opening,
    } = req.body;

    console.log(
      "data: ",
      bust,
      waist,
      shoulder,
      sleeve_length,
      shirt_length,
      shirt_bottom,
      hip,
      trouser_length,
      trouser_waist,
      trouser_hip,
      trouser_rise,
      inseam,
      thigh,
      leg_opening
    );
    if (
      !bust ||
      !waist ||
      !shoulder ||
      !sleeve_length ||
      !shirt_length ||
      !shirt_bottom ||
      !hip ||
      !trouser_length ||
      !trouser_waist ||
      !trouser_hip ||
      !trouser_rise ||
      !inseam ||
      !thigh ||
      !leg_opening
    ) {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var measurement = new Measurement({
        bust,
        waist,
        shoulder,
        sleeve_length,
        shirt_length,
        shirt_bottom,
        hip,
        trouser_length,
        trouser_waist,
        trouser_hip,
        trouser_rise,
        inseam,
        thigh,
        leg_opening,
      });

      var savedMeasurement = await measurement
        .save()
        .then(async (measurementObj) => {
          console.log("saved measurement>>>>>>>>  ", measurementObj);

          var filter = {
            _id: user_id,
          };

          var updateData = {
            measurement: measurementObj._id,
          };

          var user = await User.findByIdAndUpdate(filter, updateData, {
            new: true,
          })
            .then(async (onMeasurementSubmit) => {
              console.log("on measurement submit: ", onMeasurementSubmit);
              res.json({
                message: "Measurement Submitted!",
                status: "200",
                updatedUser: onMeasurementSubmit,
                measurement: measurementObj,
              });
            })
            .catch(async (onMeasurementSubmitError) => {
              console.log(
                "on measurement submit error: ",
                onMeasurementSubmitError
              );
              res.json({
                message:
                  "Something went wrong while submitting your measurement!",
                status: "400",
                error: onMeasurementSubmitError,
              });
            });
        })
        .catch(async (measurementNotSaveError) => {
          console.log("measurement not save error: ", measurementNotSaveError);
          res.json({
            message: "Something went wrong while submitting your measurement!",
            status: "400",
            error: measurementNotSaveError,
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

const getMeasurement = async (req, res) => {
  try {
    var user_id = req.params.user_id;

    if (!user_id || user_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var user = await User.findById(user_id, { measurement: 1 })
        .populate("measurement")
        .then(async (onMeasurementFound) => {
          console.log("on measurement found:  ", onMeasurementFound);
          res.json({
            message: "Measurement found!",
            status: "200",
            measurement: onMeasurementFound.measurement,
          });
        })
        .catch(async (onMeasurementNotFound) => {
          console.log("on measurement not found: ", onMeasurementNotFound);
          res.json({
            message: "You have not submitted your measurement yet!",
            status: "404",
            error: onMeasurementNotFound,
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

const updateUserById = async (req, res) => {
  try {
    var { email_address, full_name, phone_no, address, gender } = req.body;

    var filter = { _id: req.params.id };
    var update = {
      email_address,
      full_name,
      phone_no,
      address,
      gender,
    };

    var searchedUser = await User.findByIdAndUpdate(filter, update, {
      new: true,
      rawResult: true,
    })
      .then(function (result) {
        console.log(result.value);
        if (result.value === null) {
          var responseData = {
            status: "404",
            message: "No user found with provided id",
          };
          res.status(404).json(responseData);
        } else {
          if (result.lastErrorObject.updatedExisting === true) {
            var responseData = {
              status: "200",
              message: "user details updated successfully!",
              updatedDocument: result.value,
            };
            res.status(200).json(responseData);
          } else {
            var responseData = {
              status: "202",
              message: "user details not updated yet!",
              token: token,
            };
            res.status(202).json(responseData);
          }
        }
      })
      .catch(function (err) {
        var responseData = {
          error: err,
          message: "Error Occurred!",
          status: "400",
        };
        res.status(400).json(responseData);
      });
  } catch (error) {
    res.status(500).json({
      error: error,
      status: "500",
      message: "Internal server error!",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    var userId = req.params.id;
    var filter = { _id: userId };

    var searchedUser = await User.findOneAndDelete(filter, {
      rawResult: true,
    })
      .then(function (result) {
        if (result.value === null) {
          res.status(404).json({
            status: "404",
            message: "No user found with provided id",
          });
        } else {
          if (result.lastErrorObject.n >= 1) {
            res.status(200).json({
              status: "200",
              message: "User deleted successfully",
            });
          }
        }
      })
      .catch(function (err) {
        var responseData = {
          error: err,
          status: "500",
          message: "Internal Server Error!",
        };
        res.status(500).json(responseData);
      });
  } catch (error) {
    res.send(error);
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    var user_id = req.params.user_id;

    var { image } = req.body;

    if (!user_id || user_id === "") {
      res.json({
        message: "Required field are empty!",
        status: "400",
      });
    } else {
      var user = await User.findById(user_id)
        .then(async (onUserFound) => {
          console.log("on user found: ", onUserFound);

          cloudinary.uploader
            .upload(`data:image/jpeg;base64,${image}`, {
              folder: "user-profiles",
            })
            .then(async (onImageUploadCloudinary) => {
              console.log(
                "on image upload cloudinary: ",
                onImageUploadCloudinary
              );

              var public_id = onImageUploadCloudinary.public_idl;
              var imageUrl = onImageUploadCloudinary.secure_url;

              var filter = {
                _id: onUserFound._id,
              };

              var updateData = {
                image: {
                  url: imageUrl,
                  public_id: public_id,
                },
              };

              var updated = await User.findByIdAndUpdate(filter, updateData, {
                new: true,
              })
                .then(async (onUserProfileUpdate) => {
                  console.log("on user profile update: ", onUserProfileUpdate);
                  res.json({
                    message: "User Profile Uploaded!",
                    status: "200",
                    updatedUser: onUserProfileUpdate,
                    profileNew: onUserProfileUpdate.profile_image,
                  });
                })
                .catch(async (onUserProfileUpdateError) => {
                  console.log(
                    "on user profile update error: ",
                    onUserProfileUpdateError
                  );
                  res.json({
                    message:
                      "Something went wrong while updating profile image!",
                    status: "400",
                    error: onUserProfileUpdateError,
                  });
                });
            })
            .catch(async (onImageUploadCloudinaryError) => {
              console.log(
                "on image upload cloudinary error: ",
                onImageUploadCloudinaryError
              );
              res.json({
                message:
                  "Something went wrong while uploading profile picture!",
                status: "400",
                error: onImageUploadCloudinaryError,
              });
            });
        })
        .catch(async (onUserFoundError) => {
          console.log("on user found error: ", onUserFoundError);
          res.json({
            message: "User Not Found!",
            status: "404",
          });
        });
    }
  } catch (error) {
    var responseData = {
      error: error,
      status: "500",
      message: "Internal Server Error!",
    };

    res.json(responseData);
  }
};

const addDesignToCart = async (req, res) => {
  try {
    var { design_id, quantity, user_id } = req.body;
    console.log("user id: ", user_id);

    if (!user_id || user_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var user = await User.findById(user_id)
        .then(async (onUserFound) => {
          console.log("on donor found: ", onUserFound);

          var userCart = onUserFound.cart;

          var item = await Design.findById(design_id)
            .then(async (onDesignFound) => {
              console.log("on item found: ", onDesignFound);

              var conflictFound = isTailorIdAvailable(
                userCart,
                onDesignFound.tailor
              );

              console.log("conflict found: ", conflictFound);

              if (conflictFound) {
                res.json({
                  message: "Can not add items from multiple tailors!",
                  status: "400",
                });
              } else {
                userCart.push({
                  item: design_id,
                  quantity,
                  tailor: onDesignFound.tailor,
                });

                await onUserFound
                  .save()
                  .then((onItemAdded) => {
                    res.json({
                      message: "Design added to the cart!",
                      status: "200",
                      success: true,
                      addedDesign: onItemAdded,
                    });
                  })
                  .catch((onItemAddedError) => {
                    res.json({
                      message:
                        "Something went wrong while adding design added to the cart!",
                      status: "200",
                      success: false,
                    });
                  });

                // var filter = {
                //   _id: onDesignFound._id,
                // };

                // var updatedData = {
                //   quantity: onDesignFound.quantity - 1,
                // };

                // var updatedItem = await Design.findByIdAndUpdate(
                //   filter,
                //   updatedData,
                //   {
                //     new: true,
                //   }
                // )
                //   .then((onItemUpdate) => {
                //     console.log("on item update: ", onItemUpdate);
                //     res.json({
                //       message: "Item added to the cart!",
                //       status: "200",
                //     });
                //   })
                //   .catch((onItemUpdateError) => {
                //     console.log("on item update error: ", onItemUpdateError);
                //     res.json({
                //       message:
                //         "Something went wrong while adding item to the cart!",
                //       status: "400",
                //       error: onItemUpdateError,
                //     });
                //   });
              }
            })
            .catch((onDesignFoundError) => {
              console.log("on item found error: ", onDesignFoundError);
              res.json({
                message: "Item not found!",
                status: "404",
                error: onDesignFoundError,
              });
            });
        })
        .catch((onUserFoundError) => {
          console.log("on donor found error: ", onUserFoundError);
          res.json({
            message: "Donor not found!",
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

const removeDesignFromCart = async (req, res) => {
  try {
    var { design_id, user_id } = req.body;
    console.log("user id: ", user_id);

    if (!user_id || user_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var user = await User.findById(user_id)
        .then(async (onUserFound) => {
          console.log("on user found: ", onUserFound);

          var userCart = onUserFound.cart;

          var itemIndex = userCart.findIndex(
            (item) => item.item.toString() === design_id
          );

          if (itemIndex === -1) {
            res.json({
              message: "Item not found in the cart!",
              status: "404",
            });
          } else {
            var design = await Design.findById(design_id)
              .then(async (onDesignFound) => {
                console.log("on item found: ", onDesignFound);

                userCart.splice(itemIndex, 1);

                await onUserFound
                  .save()
                  .then((onDesignRemoved) => {
                    console.log("on design removed: ", onDesignRemoved);
                    res.json({
                      message: "Design removed from the cart!",
                      status: "200",
                      success: true,
                    });
                  })
                  .catch((onDesignRemovedError) => {
                    console.log(
                      "on design removed error: ",
                      onDesignRemovedError
                    );
                    res.json({
                      message:
                        "Something went wrong while removing design from the cart!",
                      status: "400",
                      error: onDesignRemovedError,
                      success: false,
                    });
                  });

                // var filter = {
                //   _id: onDesignFound._id,
                // };

                // var updatedData = {
                //   quantity: onDesignFound.quantity + 1,
                // };

                // var updatedItem = await Item.findByIdAndUpdate(
                //   filter,
                //   updatedData,
                //   {
                //     new: true,
                //   }
                // )
                //   .then((onItemUpdate) => {
                //     console.log("on item update: ", onItemUpdate);
                //     res.json({
                //       message: "Item removed from the cart!",
                //       status: "200",
                //     });
                //   })
                //   .catch((onItemUpdateError) => {
                //     console.log("on item update error: ", onItemUpdateError);
                //     res.json({
                //       message:
                //         "Something went wrong while removing item from the cart!",
                //       status: "400",
                //       error: onItemUpdateError,
                //     });
                //   });
              })
              .catch((onDesignFoundError) => {
                console.log("on design found error: ", onDesignFoundError);
                res.json({
                  message: "Design not found!",
                  status: "404",
                  error: onDesignFoundError,
                });
              });
          }
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
  signUpUser,
  signInUser,
  submitMeasurement,
  getMeasurement,
  updateProfilePicture,
  deleteUserById,
  updateUserById,
  addDesignToCart,
  removeDesignFromCart,
};
