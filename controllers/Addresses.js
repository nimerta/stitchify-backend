const Address = require("../models/Address");

const addNewAddress = async (req, res) => {
  try {
    const {
      user_id,
      area,
      main_address,
      apartment_or_street,
      city,
      country,
      state,
      zip_code,
    } = req.body;

    const formatted_address = `${area}, ${apartment_or_street}, ${city}, ${country}, ${state}, ${zip_code}`;

    const newAddress = new Address({
      user: user_id,
      area,
      main_address,
      apartment_or_street,
      city,
      country,
      state,
      zip_code,
      formatted_address,
    });

    const savedAddress = await newAddress
      .save()
      .then((onAddressSave) => {
        console.log("on address save: ", onAddressSave);
        res.json({
          message: "Address added successfully",
          status: "200",
          address: onAddressSave,
        });
      })
      .catch((onAddressSaveError) => {
        console.log("on address save error: ", onAddressSaveError);
        res.json({
          message: "Something went wrong while adding new address!",
          status: "400",
          error: onAddressSaveError,
        });
      });
  } catch (error) {
    res.json({
      message: "Internal server error!",
      status: "500",
      error,
    });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const { user_id } = req.params;

    const addresses = await Address.find({ user: user_id });
    if (addresses.length <= 0) {
      res.json({
        message: "No addresses found!",
        status: "404",
        success: false,
      });
    } else {
      res.json({
        message: "Addresses retrieved successfully",
        status: "200",
        success: true,
        addresses,
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

const activateAddress = async (req, res) => {
  try {
    const { user_id, address_id } = req.body;

    if (!user_id || user_id === "" || !address_id || address_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      // Deactivate all addresses of the user except the one being activated
      var deactivatedAddress = await Address.updateMany(
        { user: userId, _id: { $ne: addressId } },
        { $set: { is_active: false } }
      )
        .then(async (onAddressesDeactivated) => {
          console.log("on addresses deactivated: ", onAddressesDeactivated);

          // Activate the specified address
          var activatedAddress = await Address.findByIdAndUpdate(
            addressId,
            { $set: { is_active: true } },
            { new: true }
          )
            .then((onAddressActivated) => {
              console.log("on address activated: ", onAddressActivated);

              res.json({
                message: "Address activated successfully",
                status: "200",
                activated_address: onAddressActivated,
              });
            })
            .catch((onAddressActivatedError) => {
              console.log(
                "on address activated error: ",
                onAddressActivatedError
              );

              res.json({
                message:
                  "Something went wrong while deactivating other addresses!",
                status: "400",
                error: onAddressActivatedError,
              });
            });
        })
        .catch((onAddressesDeactivatedError) => {
          console.log(
            "on addresses deactivated error: ",
            onAddressesDeactivatedError
          );
          res.json({
            message: "Something went wrong while deactivating other addresses!",
            status: "400",
            error: onAddressesDeactivatedError,
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

const updateAddress = async (req, res) => {
  try {
    var address_id = req.params.address_id;

    if (!address_id || address_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      const {
        area,
        main_address,
        apartment_or_street,
        city,
        country,
        state,
        zip_code,
      } = req.body;

      const formatted_address = `${area}, ${apartment_or_street}, ${city}, ${country}, ${state}, ${zip_code}`;

      var filter = {
        _id: address_id,
      };

      var updatedData = {
        area,
        main_address,
        apartment_or_street,
        city,
        country,
        state,
        zip_code,
        formatted_address,
      };

      const updatedAddress = await Address.findByIdAndUpdate(
        filter,
        updatedData,
        { new: true }
      )
        .then((onAddressUpdate) => {
          console.log("on address update: ", onAddressUpdate);

          res.json({
            message: "Address updated successfully",
            status: "200",
            updatedAddress: onAddressUpdate,
          });
        })
        .catch((onAddressUpdateError) => {
          console.log("on address update error: ", onAddressUpdateError);
          res.json({
            message: "Something went wrong while updating address!",
            status: "400",
            error: onAddressUpdateError,
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

const deleteAddress = async (req, res) => {
  try {
    var address_id = req.params.address_id;

    if (!address_id || address_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      const deletedAddress = await Address.findByIdAndDelete(address_id)
        .then((onDelete) => {
          console.log("on address delete: ", onDelete);
          res.json({
            message: "Address Deleted Successfully",
            status: "200",
            deletedAddress: onDelete,
          });
        })
        .catch((onDeleteError) => {
          console.log(
            "something went wrong while deleting address: ",
            onDeleteError
          );
          res.json({
            message: "Something went wrong while deleting address.",
            status: "400",
            error: onDeleteError,
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
  addNewAddress,
  getUserAddresses,
  activateAddress,
  updateAddress,
  deleteAddress,
};
