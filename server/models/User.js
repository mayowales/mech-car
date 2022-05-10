const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // lastName: String,
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["driver", "mechanic"],
    default: "driver",
  },
  streetName: String,
  streetNumber: String,
  postCode: Number,
  city: String,
});
const User = mongoose.model("User", userSchema);
module.exports = User;
