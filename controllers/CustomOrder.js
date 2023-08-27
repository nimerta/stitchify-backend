const CustomerOrder = require("../models/CustomOrder");
const Offer = require("../models/Offer");
const Tailor = require("../models/Tailor");

const cloudConfig = require("../config/Cloudinary");
const cloudinary = require("cloudinary").v2;

const { checkOrderType, checkPaymentType } = require("../utils/Basic");
const { orderTypes, paymentTypes } = require("../constants/StatusTypes");

const createCustomOrder = async (req, res) => {
  try {
    const {
      user_id,
      images,
      offer_amount,
      address,
      fabric,
      category,
      instructions,
      order_type,
      payment_method,
      order_area,
    } = req.body;

    let uploadedImages = [];

    cloudinary.config({
      cloud_name: "dx12lksyh",
      api_key: "439633657375547",
      api_secret: "TUvRPyv8ByHAAr87E32vWklf7XQ",
    });

    for (let image of images) {
      var uploadedResult = await cloudinary.uploader.upload(image);

      console.log("uploadedResult: ", uploadedResult);

      let imageObj = {
        url: uploadedResult.secure_url,
        public_id: uploadedResult.public_id,
      };

      uploadedImages.push(imageObj);
    }

    const customOrder = new CustomerOrder({
      user: user_id,
      tailor: null,
      images: uploadedImages,
      completed: false,
      order_status: orderTypes.PLACED,
      total_amount: offer_amount,
      payment_status: paymentTypes.NOT_PAID,
      payment_method: payment_method,
      order_type: order_type,
      address: address,
      offers: [],
      accepted_offer: null,
      fabric: fabric,
      category: category,
      instructions: instructions,
      order_area: order_area,
    });

    const savedCustomOrder = await customOrder
      .save()
      .then(async (onOrderCreate) => {
        console.log("on order create: ", onOrderCreate);

        const matchingTailors = await Tailor.find({ main_area: order_area });

        const updatePromises = matchingTailors.map(async (tailor) => {
          tailor?.custom_orders?.push(onOrderCreate._id);

          return tailor.save();
        });

        await Promise.all(updatePromises);

        res.json({
          message: "Custom Order Created!",
          status: "200",
          createdOrder: onOrderCreate,
        });
      })
      .catch((onOrderCreateError) => {
        console.log("on order create error: ", onOrderCreateError);
        res.json({
          message: "Something went wrong while creating custom order.",
          status: "400",
          error: onOrderCreateError,
        });
      });
  } catch (error) {
    res.json({
      message: "Internal Server Error!",
      status: "500",
      error,
    });
  }
};

const getCustomOrder = async (req, res) => {
  try {
    const customOrderId = req.params.order_id;

    if (!customOrderId || customOrderId === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      const customOrder = await CustomerOrder.findById(customOrderId).populate({
        path: "offers",

        populate: {
          path: "tailor",
          select: "full_name",
        },
      });

      if (!customOrder) {
        console.log("order not found: ", customOrder);
        res.json({
          message: "Custom order not found with provided id!",
          status: "404",
        });
      } else {
        res.json({
          message: "Custom order found with provided id!",
          status: "200",
          customOrder: customOrder,
        });
      }
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error!",
      status: "500",
      error,
    });
  }
};

const getAllUserCustomOrders = async (req, res) => {
  try {
    const userId = req.params.user_id;

    if (!userId || userId === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      const customOrdersOfUser = await CustomerOrder.find({
        user: userId,
      });

      if (!customOrdersOfUser || customOrdersOfUser.length <= 0) {
        console.log("orders not found: ", customOrdersOfUser);
        res.json({
          message: "You have not placed any custom order yet!",
          status: "404",
        });
      } else {
        res.json({
          message: "Custom orders found for you!",
          status: "200",
          allCustomOrders: customOrdersOfUser,
        });
      }
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error!",
      status: "500",
      error,
    });
  }
};

const createOrderOffer = async (req, res) => {
  try {
    const { amount, tailor_id, custom_order_id } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .send({ message: "Amount must be a number greater than zero!" });
    } else {
      const tailor = await Tailor.findById(tailor_id);

      if (!tailor) {
        res.json({
          message: "Tailor not found with provided id.",
          status: "404",
        });
      }

      const customOrder = await CustomerOrder.findById(custom_order_id);

      if (!customOrder) {
        res.json({
          message: "Custom order not found with provided id.",
          status: "404",
        });
      }

      const offer = new Offer({
        tailor: tailor._id,
        amount: amount,
        is_accepted: false,
        offer_status: "placed",
      });

      const savedOffer = await offer.save();

      const filter = {
        _id: customOrder._id,
      };

      const updatedData = {
        $push: {
          offers: savedOffer._id,
        },
      };

      const updatedOrder = await CustomerOrder.findByIdAndUpdate(
        filter,
        updatedData,
        {
          new: true,
        }
      );

      res.json({
        message: "Offer sent to the user!",
        status: "200",
        offer: savedOffer,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error!",
      status: "500",
      error,
    });
  }
};

module.exports = {
  createCustomOrder,
  getCustomOrder,
  getAllUserCustomOrders,
  createOrderOffer,
};
