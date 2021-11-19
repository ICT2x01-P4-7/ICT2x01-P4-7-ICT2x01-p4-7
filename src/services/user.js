const User = require("../models/User");
const bcrypt = require("bcrypt");

/** TO DO !!! */
async function getUser(PIN) {
  return User.find({ PIN }).exec(); // Just as a mongoose reminder, .exec() on find
  // returns a Promise instead of the standard callback.
}

async function checkAUserExist() {
  collections = [];
  exist = false;
  const foundCollections = await User.db.db
    .listCollections({ name: "users" })
    .toArray();
  foundCollections.forEach(function (e, i, a) {
    collections.push(e.name);
  });
  if (collections.includes("users")) {
    return true;
  }
  return false;
}

async function createUser(confirmPIN) {
  const exists = await checkAUserExist();
  if (exists) {
    throw new Error("A user already exists.");
  }
  const newUser = new User({
    PIN: bcrypt.hashSync(confirmPIN, 12),
  });
  await newUser.save((err) => {
    if (err) {
      console.log("Error from newUser.save", err);
      throw new Error("There was an error saving the user");
    }
  });
}

module.exports = { createUser, getUser };
