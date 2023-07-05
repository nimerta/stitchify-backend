const Design = require("../models/Design");
const Tailor = require("../models/Tailor");

const getDesignsForType = async (req, res) => {
  try {
    var design_for = req.params.design_for;

    if (!design_for || design_for === "") {
      res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var designs = await Design.find({
        design_for: design_for,
      })

        .then(async (onDesignsFound) => {
          console.log("on designs found: ", onDesignsFound);

          res.json({
            message: `Designs found for ${design_for}`,
            status: "200",
            designs: onDesignsFound,
          });
        })
        .catch(async (onDesignsFoundError) => {
          console.log("on designs found error: ", onDesignsFoundError);
          res.json({
            message: "Something went wrong while getting designs!",
            status: "400",
            error: onDesignsFoundError,
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

const getDesignsForYou = async (req, res) => {
  try {
    var designForYou = await Design.find({})
      .limit(20)
      .populate("tailor")
      .then(async (onDesignsFound) => {
        console.log("on designs found: ", onDesignsFound);

        for (let i = onDesignsFound.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [onDesignsFound[i], onDesignsFound[j]] = [
            onDesignsFound[j],
            onDesignsFound[i],
          ];
        }

        res.json({
          message: "Designs found for you!",
          status: "200",
          designForYou: onDesignsFound,
        });
      })
      .catch(async (onDesignsFoundError) => {
        console.log("on designs found error: ", onDesignsFoundError);
        res.json({
          message: "Something went wrong while getting designs for you!",
          status: "400",
          error: onDesignsFoundError,
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

module.exports = {
  getDesignsForType,
  getDesignsForYou,
};
