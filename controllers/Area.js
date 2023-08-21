const Area = require("../models/Area");

const createArea = async (req, res) => {
  try {
    var { name } = req.body;

    if (!name || name === "") {
      return res.json({
        message: "Required fields are empty!",
        status: "400",
      });
    } else {
      var area = new Area({
        name,
      });
      var savedArea = await area.save();

      res.json({
        message: "New area created",
        status: "200",
        area: savedArea,
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

const getAllAreas = async (req, res) => {
  try {
    const allAreas = await Area.find({
      is_active: true,
    });

    if (!allAreas || allAreas.length <= 0) {
      res.json({
        message: "No areas are available!",
        status: "404,",
      });
    } else {
      res.json({
        message: "Area found!",
        status: "200",
        allAreas: allAreas,
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
  createArea,
  getAllAreas,
};
