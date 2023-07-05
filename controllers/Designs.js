const Tailor = require("../models/Tailor");
const Design = require("../models/Design");

const cloudConfig = require("../config/Cloudinary");
const cloudinary = require("cloudinary").v2;

const uploadDesign = async (req, res) => {
  try {
    var { title, tailor_id, price, design_for, description, imageBase64 } =
      req.body;

    console.log("hello g");

    if (
      !title ||
      !tailor_id ||
      !price ||
      !design_for ||
      !description ||
      !imageBase64
    ) {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      cloudinary.config({
        cloud_name: "dx12lksyh",
        api_key: "439633657375547",
        api_secret: "TUvRPyv8ByHAAr87E32vWklf7XQ",
      });

      cloudinary.uploader
        .upload(`data:image/png;base64,${imageBase64}`, {
          folder: "designs",
        })
        .then(async (onImageUpload) => {
          console.log("image url: ", onImageUpload.secure_url);
          console.log("public id: ", onImageUpload.public_id);

          var design = new Design({
            title: title,
            description: description,
            design_for: design_for,
            price: price,
            tailor: tailor_id,
            image: {
              url: onImageUpload.secure_url,
              public_id: onImageUpload.public_id,
            },
          });

          var savedDesign = await design
            .save()
            .then(async (onDesignSave) => {
              console.log("on design save: ", onDesignSave);

              res.json({
                message: "Image Uploaded!",
                status: "200",
                savedDesign: onDesignSave,
              });
            })
            .catch(async (onDesignSaveError) => {
              console.log("on design save error: ", onDesignSaveError);
              res.json({
                message: "Something went wrong while uploading your design!",
                status: "400",
                error: onDesignSaveError,
              });
            });
        })
        .catch(async (onUploadErrorCloudinary) => {
          console.log("on upload error cloudinary: ", onUploadErrorCloudinary);
          res.json({
            onUploadErrorCloudinary,
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
  uploadDesign,
};
