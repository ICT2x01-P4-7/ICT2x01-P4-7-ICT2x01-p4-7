const { Schema, model } = require("mongoose");
const { validatePIN } = require("./validate");

const UserSchema = new Schema(
  {
    PIN: {
      type: String,
      required: true,
      validate: [{ validator: validatePIN, msg: "Invalid PIN" }],
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports = User;
