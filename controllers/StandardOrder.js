const StandardOrder = require("../models/StandardOrder");
const User = require("../models/User");
const Tailor = require("../models/Tailor");

const { checkOrderType, checkPaymentType } = require("../utils/Basic");

const createStandardOrder = async (req, res) => {
  try {
    var {
      user_id,
      total_amount,
      sub_total,
      order_type,
      payment_type,
      address,
    } = req.body;

    const user = await User.findById(user_id)
      .populate("cart.item")
      .then(async (onUserFound) => {
        console.log("on user found: ", onUserFound);

        const cartItems = onUserFound.cart;

        var orderUser = onUserFound;

        var orderTailor = cartItems[0].tailor;

        const orderItems = cartItems.map((cartItem) => {
          return {
            item: cartItem.item,
            quantity: cartItem.quantity,
          };
        });

        var constantOrderType = checkOrderType(order_type);
        var constantPaymentType = checkPaymentType(payment_type);

        var order = new StandardOrder({
          user: orderUser,
          tailor: orderTailor,
          items: orderItems,
          total_amount: total_amount,
          sub_total: sub_total,
          completed: false,
          order_type: constantOrderType,
          payment_type: constantPaymentType,
          address: address,
        });

        var savedOrder = await order
          .save()
          .then(async (onOrderSave) => {
            console.log("on order save: ", onOrderSave);

            onUserFound.cart = [];
            await onUserFound.save();

            res.json({
              message: "Order Created!",
              status: "200",
              order: onOrderSave,
            });
          })
          .catch((onOrderSaveError) => {
            console.log("on order save error: ", onOrderSaveError);
            res.json({
              message: "Something went wrong while creating order!",
              status: "400",
              error: onOrderSaveError,
            });
          });
      })
      .catch((onUserFoundError) => {
        console.log("on user found error: ", onUserFoundError);
        res.json({
          message: "User not found!",
          status: "404",
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

const updateStandardOrderStatus = async (req, res) => {
  try {
    var order_id = req.params.order_id;
    var { updatedStatus } = req.body;

    if (!order_id || order_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var order_status = checkOrderType(updatedStatus);

      console.log("order status from function: ", order_status);

      var filter = {
        _id: order_id,
      };

      var updatedData = {
        order_status: order_status,
      };

      var order = await StandardOrder.findByIdAndUpdate(filter, updatedData, {
        new: true,
      })
        .then((onOrderStatusUpdate) => {
          console.log("on order status update: ", onOrderStatusUpdate);

          res.json({
            message: `Order status changed to ${order_status}`,
            status: "200",
            updatedOrder: onOrderStatusUpdate,
            updatedStatus: onOrderStatusUpdate.order_status,
          });
        })
        .catch((onOrderStatusUpdateError) => {
          console.log(
            "on order status update error: ",
            onOrderStatusUpdateError
          );
          res.json({
            message:
              "Order not found or something went wrong while updating order status!",
            status: "400",
            error: onOrderStatusUpdateError,
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

const updateStandardOrderPaymentStatus = async (req, res) => {
  try {
    var order_id = req.params.order_id;
    var { updatedStatus } = req.body;

    if (!order_id || order_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var payment_status = checkPaymentType(updatedStatus);

      console.log("order payment status from function: ", payment_status);

      var filter = {
        _id: order_id,
      };

      var updatedData = {
        payment_status: payment_status,
      };

      var order = await StandardOrder.findByIdAndUpdate(filter, updatedData, {
        new: true,
      })
        .then((onOrderStatusUpdate) => {
          console.log("on order payment status update: ", onOrderStatusUpdate);

          res.json({
            message: `Order payment status changed to ${payment_status}`,
            status: "200",
            updatedOrder: onOrderStatusUpdate,
            updatedPaymentStatus: onOrderStatusUpdate.payment_status,
          });
        })
        .catch((onOrderStatusUpdateError) => {
          console.log(
            "on order payment status update error: ",
            onOrderStatusUpdateError
          );
          res.json({
            message:
              "Order not found or something went wrong while updating order payment status!",
            status: "400",
            error: onOrderStatusUpdateError,
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

const getStandardOrder = async (req, res) => {
  try {
    var order_id = req.params.order_id;

    if (!order_id || order_id === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var order = await StandardOrder.findById(order_id)
        .populate(["user", "tailor", "items.item"])
        .then((onOrderFound) => {
          console.log("on order found: ", onOrderFound);

          res.json({
            message: "Order found!",
            status: "200",
            order: onOrderFound,
          });
        })
        .catch((onOrderFoundError) => {
          console.log("on order found error: ", onOrderFoundError);
          res.json({
            message: "Order not found!",
            status: "404",
            error: onOrderFoundError,
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
  createStandardOrder,
  updateStandardOrderPaymentStatus,
  updateStandardOrderStatus,
  getStandardOrder,
};
