const { orderTypes, paymentTypes } = require("../constants/StatusTypes");

function isTailorIdAvailable(arr, tailorId) {
  for (let i = 0; i < arr.length; i++) {
    console.log("tailor function: ", arr[i].tailor.toString(), tailorId);

    if (arr[i].tailor.toString() !== tailorId.toString()) {
      console.log("here");
      return true; // Tailor ID found
    }
  }
  return false; // Tailor ID not found
}

function checkOrderType(inputString) {
  for (const key in orderTypes) {
    if (orderTypes[key].toLowerCase() === inputString.toLowerCase()) {
      return orderTypes[key];
    }
  }

  return inputString;
}

function checkPaymentType(inputString) {
  for (const key in paymentTypes) {
    if (paymentTypes[key].toLowerCase() === inputString.toLowerCase()) {
      return paymentTypes[key];
    }
  }

  return inputString;
}

module.exports = {
  isTailorIdAvailable,
  checkOrderType,
  checkPaymentType,
};
