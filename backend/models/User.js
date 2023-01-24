const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    photo: {
      type: String,
      default: "/avatar.png",
    },
    role: {
      type: [String],
      default: ["RegularUser"],
      enum: ["RegularUser", "Admin"],
    },
    passwordResetTempCode: {
      type: String,
      default: "",
    },
    advertisePosts: [{ type: ObjectId, ref: "Userpost" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
