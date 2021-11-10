const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  PIN: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema);

module.exports = User;
