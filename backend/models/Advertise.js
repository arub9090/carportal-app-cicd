const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const advertiseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    description: { type: {}, minlength: 200, required: true },
    make: { type: String },
    model: { type: String },
    year: { type: String },
    trim: { type: String },
    bodytype: { type: String },
    color: { type: String },
    mileage: { type: String },
    vin: { type: String },
    condition: { type: String },
    fueleconomy: { type: String },
    safetyfeature: { type: String },
    price: { type: String },
    video: { type: String },
    postimage: { type: String },
    country: { type: String },
    city: { type: String },
    creator: { type: ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Userpost", advertiseSchema);
